import { describe, it, expect } from 'vitest'
import {
  checkoutSessionSchema,
  createCheckoutInputSchema,
  planLimitsSchema,
  planSchema,
  subscriptionSchema,
  usageSummarySchema,
} from '../src/billing.js'

/**
 * Billing is the one contract where a wrong shape costs money in both
 * directions: an unlimited plan read as zero locks a paying customer out, and a
 * limit read as unlimited gives the product away.
 */

const UUID = '3f1b2c4d-5e6f-4a7b-8c9d-0e1f2a3b4c5d'

const limits = {
  maxUsers: 10,
  maxTransactions: 200_000,
  maxOrganizations: 3,
  aiMonthlyAllowanceCents: 3_000,
  allowAIOverage: true,
  canUseBYOK: true,
  canUseLocalAI: false,
  canChooseDataRegion: false,
  canUseSSO: false,
  canExportAuditLog: true,
  canWhiteLabel: false,
  auditLogRetentionMonths: 24,
}

describe('planLimitsSchema', () => {
  it('spells unlimited as null, and keeps it null', () => {
    /*
     * The whole reason the field is nullable rather than a sentinel.
     *
     * `-1` for unlimited eventually gets compared as a number by code that did
     * not know, and unlimited silently becomes zero — the enterprise customer
     * who cannot add a user. Null cannot be compared by accident.
     */
    const parsed = planLimitsSchema.parse({
      ...limits,
      maxUsers: null,
      maxTransactions: null,
      maxOrganizations: null,
      aiMonthlyAllowanceCents: null,
      auditLogRetentionMonths: null,
    })

    expect(parsed.maxUsers).toBeNull()
    expect(parsed.aiMonthlyAllowanceCents).toBeNull()
  })

  it('refuses a limit of zero', () => {
    // Zero is not a plan, it is a plan nobody can use — and it is what a
    // sentinel-to-null migration produces when it goes wrong.
    expect(() => planLimitsSchema.parse({ ...limits, maxUsers: 0 })).toThrow()
  })

  it('refuses a negative allowance', () => {
    expect(() => planLimitsSchema.parse({ ...limits, aiMonthlyAllowanceCents: -100 })).toThrow()
  })

  it('carries the security features as flags on every tier', () => {
    // They are not sold: GDPR Art. 32 requires adequate measures for all
    // processing, so a tier without them would be documented non-compliance.
    // Having them in the shape is what lets a test assert it, tier by tier.
    const parsed = planLimitsSchema.parse(limits)
    expect(parsed.canExportAuditLog).toBe(true)
  })

  it('requires the overage flag rather than inferring it from the allowance', () => {
    // An allowance that runs out is not the same fact as one that keeps going
    // and gets charged. Inferring the second from the first invoices somebody.
    const withoutFlag: Record<string, unknown> = { ...limits }
    delete withoutFlag.allowAIOverage
    expect(() => planLimitsSchema.parse(withoutFlag)).toThrow()
  })
})

describe('planSchema', () => {
  const plan = {
    tier: 'GROWTH' as const,
    name: 'Growth',
    monthlyPriceCents: 14_900,
    yearlyPriceCents: 149_000,
    currency: 'EUR',
    limits,
  }

  it('prices in whole cents', () => {
    // Floating-point prices are how a €149.00 plan bills €148.99999999.
    expect(() => planSchema.parse({ ...plan, monthlyPriceCents: 14_900.5 })).toThrow()
  })

  it('allows a price of zero, because Enterprise is negotiated', () => {
    // Zero here does not mean free: what an Enterprise customer pays comes from
    // their subscription record, which carries what was actually agreed.
    expect(
      planSchema.parse({ ...plan, tier: 'ENTERPRISE', monthlyPriceCents: 0, yearlyPriceCents: 0 })
        .monthlyPriceCents,
    ).toBe(0)
  })

  it('refuses a currency that is not ISO-4217', () => {
    expect(() => planSchema.parse({ ...plan, currency: 'EUROS' })).toThrow()
  })

  it('refuses a tier the catalogue does not have', () => {
    expect(() => planSchema.parse({ ...plan, tier: 'PRO' })).toThrow()
  })
})

describe('subscriptionSchema', () => {
  const subscription = {
    id: UUID,
    organizationId: UUID,
    tier: 'GROWTH' as const,
    status: 'ACTIVE' as const,
    provider: 'openpix' as const,
    currentPeriodEnd: '2026-09-18T10:30:00.000Z',
    cancelAtPeriodEnd: false,
    trialEndsAt: null,
    createdAt: '2026-08-18T10:30:00.000Z',
  }

  it('accepts an active Pix subscription with its period end', () => {
    expect(subscriptionSchema.parse(subscription).currentPeriodEnd).toBe(
      '2026-09-18T10:30:00.000Z',
    )
  })

  it('allows a subscription with no period end at all', () => {
    // A trial has no paid period, and a Pix subscription has none until the
    // first charge is paid. Both are real states, not missing data.
    expect(
      subscriptionSchema.parse({ ...subscription, status: 'TRIALING', currentPeriodEnd: null })
        .currentPeriodEnd,
    ).toBeNull()
  })

  it('requires the period end to be a real instant when it is present', () => {
    // A date that does not parse turns "renews on the 18th" into a renewal that
    // never fires, and the failure is silent on both sides.
    expect(() =>
      subscriptionSchema.parse({ ...subscription, currentPeriodEnd: '18/09/2026' }),
    ).toThrow()
  })

  it('refuses a status the system does not act on', () => {
    expect(() => subscriptionSchema.parse({ ...subscription, status: 'PAGO' })).toThrow()
  })

  it('carries no secret from the payment provider', () => {
    // Nothing here may hold a key or a customer's payment details: the schema
    // crosses to the browser.
    const keys = Object.keys(subscriptionSchema.shape)
    expect(keys).not.toContain('externalId')
    expect(keys.some((key) => /secret|token|key|card/i.test(key))).toBe(false)
  })
})

describe('createCheckoutInputSchema', () => {
  const input = {
    tier: 'GROWTH' as const,
    interval: 'MONTHLY' as const,
    successUrl: 'https://app.example.com/billing/ok',
    cancelUrl: 'https://app.example.com/billing',
  }

  it('accepts a checkout with the provider left to the server', () => {
    // Which provider bills is a server decision — the browser saying "charge me
    // through the mock" is the one request that must not be honoured.
    expect(createCheckoutInputSchema.parse(input).provider).toBeUndefined()
  })

  it('refuses a return URL that is not a URL', () => {
    // It is where the customer lands after paying. `javascript:` and relative
    // junk both end the flow somewhere nobody intended.
    expect(() => createCheckoutInputSchema.parse({ ...input, successUrl: 'ok' })).toThrow()
  })

  it('refuses an interval that is neither monthly nor yearly', () => {
    expect(() => createCheckoutInputSchema.parse({ ...input, interval: 'WEEKLY' })).toThrow()
  })
})

describe('checkoutSessionSchema', () => {
  it('requires a real URL to send the customer to', () => {
    expect(() => checkoutSessionSchema.parse({ url: '', sessionId: 'x' })).toThrow()
    expect(
      checkoutSessionSchema.parse({ url: 'https://pix.example/qr', sessionId: 'org:GROWTH' })
        .sessionId,
    ).toBe('org:GROWTH')
  })
})

describe('usageSummarySchema', () => {
  it('shows spend and allowance as money, never as a bare number', () => {
    // §81 wants consumption always in sight, and a number with no currency is
    // the one a customer reads in the wrong one.
    const parsed = usageSummarySchema.parse({
      organizationId: UUID,
      tier: 'GROWTH',
      users: { used: 4, limit: 10 },
      transactions: { used: 20_700, limit: 200_000 },
      ai: {
        spent: { amountCents: 1_240, currency: 'EUR' },
        allowance: { amountCents: 3_000, currency: 'EUR' },
        overageAllowed: true,
      },
    })

    expect(parsed.ai.spent.currency).toBe('EUR')
    expect(parsed.transactions.limit).toBe(200_000)
  })

  it('keeps unlimited as null all the way to the panel', () => {
    // The panel has to draw "4 of unlimited", not "4 of 0".
    const parsed = usageSummarySchema.parse({
      organizationId: UUID,
      tier: 'ENTERPRISE',
      users: { used: 120, limit: null },
      transactions: { used: 4_000_000, limit: null },
      ai: { spent: { amountCents: 90_000, currency: 'EUR' }, allowance: null, overageAllowed: true },
    })

    expect(parsed.users.limit).toBeNull()
    expect(parsed.ai.allowance).toBeNull()
  })
})

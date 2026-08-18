import { describe, it, expect } from 'vitest'
import { ROLES, PERMISSIONS, ROLE_PERMISSIONS, type Permission } from '../src/enums.js'

/**
 * RBAC.
 *
 * The permission map is easy to widen by accident — someone adds a new permission
 * and copies it to every role "so nobody gets blocked". These tests exist so that
 * such a change fails instead of slipping through unnoticed.
 *
 * This is UI convenience. Authorization always happens on the server (§71): the
 * frontend hides, it does not protect.
 */

describe('ROLE_PERMISSIONS', () => {
  it('covers every role', () => {
    for (const role of ROLES) {
      expect(ROLE_PERMISSIONS[role], `role ${role} has no permissions defined`).toBeDefined()
    }
  })

  it('grants no permission that does not exist', () => {
    const known = new Set<string>(PERMISSIONS)
    for (const role of ROLES) {
      for (const permission of ROLE_PERMISSIONS[role]) {
        expect(known.has(permission), `${role} has an unknown permission: ${permission}`).toBe(true)
      }
    }
  })

  it('gives everything to OWNER', () => {
    expect([...ROLE_PERMISSIONS.OWNER].sort()).toEqual([...PERMISSIONS].sort())
  })

  it('keeps AUDITOR unable to change anything at all', () => {
    // An auditor who writes stops being an auditor. If someone adds a new write
    // permission, this test has to catch it — hence the list being derived by
    // pattern rather than fixed.
    const writes = PERMISSIONS.filter(
      (p) => p.startsWith('manage_') || p.startsWith('upload_') || p.startsWith('delete_'),
    )
    for (const p of writes) {
      expect(ROLE_PERMISSIONS.AUDITOR).not.toContain(p)
    }
  })

  it('keeps AUDITOR out of the AI', () => {
    // A generated answer is not auditable evidence, and an auditor quoting it as
    // if it were would be worse than not having the feature.
    expect(ROLE_PERMISSIONS.AUDITOR).not.toContain('ask_ai' satisfies Permission)
  })

  it('keeps VIEWER from exporting or asking', () => {
    expect(ROLE_PERMISSIONS.VIEWER).not.toContain('export_reports' satisfies Permission)
    expect(ROLE_PERMISSIONS.VIEWER).not.toContain('ask_ai' satisfies Permission)
  })

  it('lets only OWNER and ADMIN manage users', () => {
    const allowed = ROLES.filter((r) => ROLE_PERMISSIONS[r].includes('manage_users'))
    expect(allowed.sort()).toEqual(['ADMIN', 'OWNER'])
  })

  it('lets only OWNER touch billing', () => {
    const allowed = ROLES.filter((r) => ROLE_PERMISSIONS[r].includes('manage_billing'))
    expect(allowed).toEqual(['OWNER'])
  })

  it('leaves no role without any permission', () => {
    for (const role of ROLES) {
      expect(ROLE_PERMISSIONS[role].length, `role ${role} ended up empty`).toBeGreaterThan(0)
    }
  })
})

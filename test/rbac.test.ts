import { describe, it, expect } from 'vitest'
import { ROLES, PERMISSIONS, ROLE_PERMISSIONS, type Permission } from '../src/enums.js'

/**
 * RBAC.
 *
 * O mapa de permissões é fácil de alargar por descuido — alguém acrescenta uma
 * permissão nova e copia-a para todos os papéis "para não bloquear ninguém".
 * Estes testes existem para essa alteração falhar em vez de passar despercebida.
 *
 * Isto é conveniência de UI. A autorização acontece sempre no servidor (§71):
 * o frontend esconde, não protege.
 */

describe('ROLE_PERMISSIONS', () => {
  it('cobre todos os papéis', () => {
    for (const role of ROLES) {
      expect(ROLE_PERMISSIONS[role], `papel ${role} sem permissões definidas`).toBeDefined()
    }
  })

  it('não concede nenhuma permissão que não exista', () => {
    const known = new Set<string>(PERMISSIONS)
    for (const role of ROLES) {
      for (const permission of ROLE_PERMISSIONS[role]) {
        expect(known.has(permission), `${role} tem permissão desconhecida: ${permission}`).toBe(
          true,
        )
      }
    }
  })

  it('dá tudo ao OWNER', () => {
    expect([...ROLE_PERMISSIONS.OWNER].sort()).toEqual([...PERMISSIONS].sort())
  })

  it('mantém o AUDITOR incapaz de alterar seja o que for', () => {
    // Um auditor que escreve deixa de ser auditor. Se alguém acrescentar uma
    // permissão de escrita nova, este teste tem de a apanhar — daí a lista ser
    // derivada por padrão e não fixa.
    const escrita = PERMISSIONS.filter(
      (p) => p.startsWith('manage_') || p.startsWith('upload_') || p.startsWith('delete_'),
    )
    for (const p of escrita) {
      expect(ROLE_PERMISSIONS.AUDITOR).not.toContain(p)
    }
  })

  it('mantém o AUDITOR fora da IA', () => {
    // Uma resposta gerada não é evidência auditável, e um auditor a citá-la como
    // se fosse seria pior do que não ter a funcionalidade.
    expect(ROLE_PERMISSIONS.AUDITOR).not.toContain('ask_ai' satisfies Permission)
  })

  it('mantém o VIEWER sem exportar nem perguntar', () => {
    expect(ROLE_PERMISSIONS.VIEWER).not.toContain('export_reports' satisfies Permission)
    expect(ROLE_PERMISSIONS.VIEWER).not.toContain('ask_ai' satisfies Permission)
  })

  it('só deixa OWNER e ADMIN gerir utilizadores', () => {
    const podem = ROLES.filter((r) => ROLE_PERMISSIONS[r].includes('manage_users'))
    expect(podem.sort()).toEqual(['ADMIN', 'OWNER'])
  })

  it('só deixa o OWNER mexer na faturação', () => {
    const podem = ROLES.filter((r) => ROLE_PERMISSIONS[r].includes('manage_billing'))
    expect(podem).toEqual(['OWNER'])
  })

  it('não deixa nenhum papel sem qualquer permissão', () => {
    for (const role of ROLES) {
      expect(ROLE_PERMISSIONS[role].length, `papel ${role} ficou vazio`).toBeGreaterThan(0)
    }
  })
})

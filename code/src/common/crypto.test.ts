import { decrypt, encrypt, importKey } from './crypto'

describe('crypto', () => {
  const iv: Uint8Array = new Uint8Array([
    43, 236, 52, 166, 87, 115, 181, 233, 232, 91, 118, 79,
  ])
  const rawKey = '/bASVh5gUWpUNol5chZN+qktOFCsAwB2Npt0Ytlm87E='
  const encrypted = 'hcsA+y5yn8HgTjVpZRZdQZ4WA1Ltn5ojoa65lQ=='
  const message = 'test message'

  it('can encrypt a string', async () => {
    const key = await importKey(rawKey)
    const result = await encrypt(key, iv, message)
    expect(result).toEqual(encrypted)
  })

  it('can decrypt an encrypted string', async () => {
    const key = await importKey(rawKey)
    const result = await decrypt(key, iv, encrypted)

    expect(result).toEqual(message)
  })
})

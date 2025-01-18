import { vi } from 'vitest'
import { getI18nContent } from './i18n'

describe('i18n', () => {
  beforeEach(() => {
    vi.mock('../data/i18n/dialogService', () => ({
      default: {
        en: [
          {
            hello: 'Hello, world!',
          },
        ],
      },
    }))
  })

  it('should return the correct content for a given locale and key', () => {
    const result = getI18nContent('hello', 'en')
    expect(result).toBe('Hello, world!')
  })

  it('should return undefined if the key is not found', () => {
    const result = getI18nContent('nonExistentKey', 'en')
    expect(result).toBeUndefined()
  })

  it('should return undefined if the locale is not found', () => {
    const result = getI18nContent('hello', 'fr')
    expect(result).toBeUndefined()
  })
})

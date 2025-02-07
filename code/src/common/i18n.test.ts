import { vi } from 'vitest'
import { getI18nContent, getI18nDialog } from './i18n'

describe('i18n', () => {
  beforeEach(() => {
    vi.mock('../data/i18n/languageService', () => ({
      dialogData: {
        en: [
          {
            hello: 'Hello, world!',
          },
        ],
      },
      contentData: {
        en: [
          {
            start: 'Start',
          },
        ],
      },
    }))
  })

  it('should return the correct dialog for a given locale and key', () => {
    const result = getI18nDialog('hello', 'en')
    expect(result).toBe('Hello, world!')
  })

  it('should return the correct content for a given locale and key', () => {
    const result = getI18nContent('start', 'en')
    expect(result).toBe('Start')
  })

  it('should return undefined if the key is not found', () => {
    const result = getI18nDialog('nonExistentKey', 'en')
    expect(result).toBeUndefined()
  })

  it('should return undefined if the locale is not found', () => {
    const result = getI18nDialog('hello', 'fr')
    expect(result).toBeUndefined()
  })
})

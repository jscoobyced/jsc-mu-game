import { contentData, dialogData } from './languageService'

describe('languageService', () => {
  it('should return the correct dialog', () => {
    const language = dialogData.en ?? []
    expect(language).toHaveLength(1)
    const value = language[0].FOREST_GUY_INTRO_1
    expect(value).toContain('Hello Mumu! You have finally found me')
  })

  it('should return the correct content', () => {
    const content = contentData.en ?? []
    expect(content).toHaveLength(1)
    const value = content[0].START
    expect(value).toBe('START')
  })
})

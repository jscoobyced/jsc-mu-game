import getGeneralSettings from './general'

describe('general', () => {
  it('can load general.json', () => {
    const generalSettings = getGeneralSettings()
    expect(generalSettings.height).toBe(768)
  })
})

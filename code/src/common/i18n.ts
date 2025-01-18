import languageData from '../data/i18n/dialogService'

export const getI18nContent = (key: string, language = 'en') => {
  const localizations = languageData[language]

  if (!localizations) {
    return undefined
  }

  for (const localization of localizations) {
    if (key in localization) {
      return localization[key]
    }
  }

  return undefined
}

import { contentData, dialogData } from '../data/i18n/languageService'
import { LanguageData } from '../models/i18n'

export const getI18nDialog = (key: string, language = 'en') => {
  return getI18nData(dialogData, key, language)
}

export const getI18nContent = (key: string, language = 'en') => {
  return getI18nData(contentData, key, language)
}

const getI18nData = (
  languageData: LanguageData,
  key: string,
  language = 'en',
) => {
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

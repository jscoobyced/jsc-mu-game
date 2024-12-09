import i18n from '../data/i18n/dialogs.json'
import { LanguageData } from '../models/i18n'

const languageData: LanguageData = i18n

export const getI18nContent = (key: string, language = 'en') => {
  const localizations = languageData[language]
  for (const localization of localizations) {
    if (key in localization) {
      return localization[key]
    }
  }

  return undefined
}

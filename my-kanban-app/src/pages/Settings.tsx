import React from 'react'
import { useTranslation } from 'react-i18next'


export const Settings = () => {

  const [t, i18n] = useTranslation('global')

  const handleChangeLanguage = (lang: string) => {
    i18n.changeLanguage(lang)
  };

  return (
    <div>

      <h1>{t('settings.title')}</h1>
      <button onClick={() => handleChangeLanguage('en')}>English</button>
      <button onClick={() => handleChangeLanguage('heb')}>עברית</button>
    </div>
  )
}

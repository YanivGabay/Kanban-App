import React from 'react'
import { useTranslation } from 'react-i18next'


export const Profile = () => {

  const [t, i18n] = useTranslation('global')

  return (
    <div>

      <h1>{t('profile.title')}</h1>
      

    </div>
  )
}

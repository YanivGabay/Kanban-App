import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.tsx'

import global_en from "./translations/en/global.json"
import global_heb from "./translations/heb/global.json"
import i18next from "i18next"
import { I18nextProvider } from 'react-i18next'


i18next.init({
  interpolation: { escapeValue: false },  // React already does escaping
  lng: 'en',                              // language to use
  resources: {
    en: {
      global: global_en               // 'common' is our custom namespace
    },
    heb: {
      global: global_heb
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <I18nextProvider i18n={i18next}>
      <App />
    </I18nextProvider>
 
  </StrictMode>,
)

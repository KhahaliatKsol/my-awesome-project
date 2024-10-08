import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(Backend) // loads translations from your server (public/locales)
  .use(LanguageDetector) // detects user language
  .use(initReactI18next) // passes i18n down to React
  .init({
    fallbackLng: 'en', // fallback language
    debug: true, // enable debug mode in development

    interpolation: {
      escapeValue: false, // react already safes from xss
    },

    backend: {
      loadPath: '/locales/{{lng}}/translation.json', // path to your translation files
    },
  });

export default i18n;

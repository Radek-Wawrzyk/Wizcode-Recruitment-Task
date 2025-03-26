import en from './translations/en.json';
import pl from './translations/pl.json';

import { createI18n } from 'vue-i18n';

const i18n = createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en,
    pl,
  },
});

export { i18n };

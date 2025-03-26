import { createApp } from 'vue';
import { VueQueryPlugin } from '@tanstack/vue-query';
import { router } from './router';
import { i18n } from './i18n';
import { plugin as VueTippy } from 'vue-tippy';
import { TOOLTIP_CONFIG } from './constants/Tooltip';

import App from './App.vue';

import './styles/main.scss';

const app = createApp(App);

app.use(router);
app.use(i18n);
app.use(VueQueryPlugin);
app.use(VueTippy, {
  directive: 'tippy',
  component: 'tippy',
  defaultProps: { ...TOOLTIP_CONFIG },
});

app.mount('#app');

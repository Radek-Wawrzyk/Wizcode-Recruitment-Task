import { ref, onMounted, watch } from 'vue';
import { STORAGE_KEYS } from '@/constants/Storage';

const DARK_MODE_KEY = STORAGE_KEYS.DARK_MODE;
const isDarkMode = ref(false);

export const useDarkMode = () => {
  const toggleDarkMode = () => {
    isDarkMode.value = !isDarkMode.value;
  };

  const setDarkMode = (value: 'dark' | 'light') => {
    isDarkMode.value = value === 'dark';
  };

  const applyDarkMode = (isDarkMode: boolean) => {
    const html = document.documentElement;

    if (isDarkMode) {
      html.classList.add('dark-mode');
      html.classList.remove('light-mode');
    } else {
      html.classList.add('light-mode');
      html.classList.remove('dark-mode');
    }
  };

  onMounted(() => {
    const storedValue = localStorage.getItem(DARK_MODE_KEY);

    if (storedValue !== null) {
      isDarkMode.value = storedValue === 'true';
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      isDarkMode.value = prefersDark;
    }

    applyDarkMode(isDarkMode.value);
  });

  watch(isDarkMode, (newValue) => {
    localStorage.setItem(DARK_MODE_KEY, String(newValue));
    applyDarkMode(newValue);
  });

  return {
    isDarkMode,
    toggleDarkMode,
    setDarkMode,
  };
};

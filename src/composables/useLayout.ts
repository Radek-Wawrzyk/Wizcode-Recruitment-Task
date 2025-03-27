import { computed, reactive } from 'vue';

const state = reactive({
  sidebarOpen: false,
});

const useLayout = () => {
  const toggleSidebar = () => {
    state.sidebarOpen = !state.sidebarOpen;
  };

  const isSidebarOpen = computed(() => state.sidebarOpen);

  return {
    state,
    toggleSidebar,
    isSidebarOpen,
  };
};

export { useLayout };

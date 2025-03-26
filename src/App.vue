<script setup lang="ts">
import { ref } from 'vue';
import AppSidebar from '@/components/App/AppSidebar/AppSidebar.vue';
import AppTopNavigation from '@/components/App/AppTopNavigation/AppTopNavigation.vue';

const sidebarCollapsed = ref(false);
</script>

<template>
  <div class="app-layout">
    <AppSidebar :collapsed="sidebarCollapsed" />
    <AppTopNavigation :sidebar-collapsed="sidebarCollapsed" />

    <main class="app-content">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
  </div>
</template>

<style lang="scss">
.app-content {
  margin-left: 250px; /* Szerokość sidebara */
  margin-top: 64px; /* Wysokość nawigacji górnej */
  padding: var(--spacing-large);
  transition: margin-left 0.3s ease;
}

.app-layout {
  min-height: 100vh;

  &.sidebar-collapsed {
    .app-content {
      margin-left: 70px; /* Szerokość zwiniętego sidebara */
    }

    .app-top-navigation {
      left: 70px;
    }
  }
}
</style>

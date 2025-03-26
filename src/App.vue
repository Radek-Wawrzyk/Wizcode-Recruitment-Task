<script setup lang="ts">
import AppLayout from '@/components/App/AppLayout/AppLayout.vue';
import AppContent from '@/components/App/AppContent/AppContent.vue';

import { useDarkMode } from '@/composables/useDarkMode';

useDarkMode();
</script>

<template>
  <app-layout>
    <app-content>
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </app-content>
  </app-layout>
</template>

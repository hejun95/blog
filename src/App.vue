<script setup lang="ts">
import { RouterView } from 'vue-router'
import ArcoNavBar from './components/ArcoNavBar.vue'
</script>

<template>
  <div class="app-container">
    <header class="app-header">
      <ArcoNavBar />
    </header>
    <main class="app-main">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-header {
  width: 100%;
  background-color: #fff;
  border-bottom: 1px solid #f0f0f0;
  position: sticky;
  top: 0;
  z-index: 100;
  height: clamp(50px, 8vh, 80px);
  display: flex;
  align-items: center;
}

.app-main {
  flex: 1;
  max-width: min(1280px, 95vw);
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;
}
</style>

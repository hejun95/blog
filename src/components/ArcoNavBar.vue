<template>
  <div class="nav-container">
    <a-menu
      mode="horizontal"
      :selected-keys="[selectedKey]"
      @menu-item-click="onMenuClick"
      class="nav-menu"
    >
      <a-menu-item key="/">Home</a-menu-item>
      <a-menu-item key="/about">About</a-menu-item>
    </a-menu>
  </div>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from "vue-router";
import { ref, watch } from "vue";

const router = useRouter();
const route = useRoute();
const selectedKey = ref(route.path);

watch(
  () => route.path,
  (newPath) => {
    selectedKey.value = newPath;
  }
);

function onMenuClick(key: string) {
  if (key !== route.path) {
    router.push(key);
  }
}
</script>

<style scoped>
.nav-container {
  width: 100%;
  margin: 0 auto;
  padding: 0 20px;
  border: none;
}
</style>

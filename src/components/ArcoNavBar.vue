<template>
  <div class="nav-container">
    <a-menu
      mode="horizontal"
      accordion
      :selected-keys="[selectedKey]"
      @menu-item-click="onMenuClick"
    >
      <a-menu-item key="/">林慧琪的应援会</a-menu-item>
      <a-menu-item key="/about">去玩啥？</a-menu-item>
      <a-menu-item key="/wheel">去干嘛？</a-menu-item>
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
  border: none;
}
</style>

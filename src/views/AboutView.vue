<template>
  <div class="about">
    <div class="game-container">
      <iframe 
        src="https://hejun95.github.io/small_games/" 
        class="game-frame"
        frameborder="0"
        allowfullscreen>
      </iframe>
    </div>
  </div>
</template>

<style scoped>
.about {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.game-container {
  flex: 1;
  width: 100%;
  position: relative;
  overflow: hidden;
}

.game-frame {
  width: 100%;
  height: 100%;
  border: none;
  display: block;
}

/* 确保iframe在全屏模式下正常工作 */
@media (max-width: 768px) {
  h1 {
    font-size: 1.5rem;
    padding: 15px;
  }
}
</style>

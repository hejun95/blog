<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

// 弹幕数据接口
interface DanmakuItem {
  id: string
  text: string
  color: string
  speed: number
  size: number
  number: number
  opcaty: number
}

// 响应式数据
const danmakuList = ref<DanmakuItem[]>([])
const containerRef = ref<HTMLElement>()

// 获取弹幕数据
const fetchDanmakuData = async (): Promise<DanmakuItem[]> => {
  try {
    const response = await fetch('https://api.virapi.com/vir_githubh36ha196d666/demo/danmu/data?_token=$2a$10$YAXKsL.s4n0RqDjuez02pOCfjqR/TWuiQtkEKZPlhytjdyy8YjMiS')
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const result = await response.json()
    
    if (result.code === 200 && result.data && result.data.list) {
      return result.data.list
    } else {
      throw new Error(result.message || '获取数据失败')
    }
  } catch (err) {
    console.error('获取弹幕数据失败:', err)
    return []
  }
}

// 创建弹幕元素
const createDanmakuElement = (item: DanmakuItem) => {
  const danmaku = document.createElement('div')
  danmaku.className = 'danmaku-item'
  
  // 确保内容永远显示一行
  const textContent = item.text.replace(/\n/g, ' ').replace(/\r/g, ' ').trim()
  danmaku.textContent = textContent
  
  danmaku.style.color = item.color
  
  // 使用更复杂的随机算法
  const randomTop = (Math.random() * 0.8 + 0.1) * 100
  danmaku.style.top = `${randomTop}%`
  
  // 添加调试信息
  console.log(`弹幕生成 - 高度: ${randomTop.toFixed(2)}%, 内容: ${textContent}`)
  
  danmaku.style.fontSize = `${item.size + 1}rem`
  danmaku.style.opacity = item.opcaty.toString()
  danmaku.style.zIndex = Math.floor(Math.random() * 1000).toString()
  
  // 确保弹幕完全独立并从右侧外部开始
  danmaku.style.position = 'absolute'
  danmaku.style.left = '100%' // 从屏幕右侧外部开始
  danmaku.style.bottom = 'auto'
  danmaku.style.right = 'auto'
  
  // 确保永远显示一行
  danmaku.style.whiteSpace = 'nowrap'
  danmaku.style.wordWrap = 'normal'
  danmaku.style.wordBreak = 'keep-all'
  
  return danmaku
}

// 添加弹幕到容器
const addDanmaku = (item: DanmakuItem) => {
  if (!containerRef.value) return
  
  const danmakuElement = createDanmakuElement(item)
  containerRef.value.appendChild(danmakuElement)
  
  // 强制重绘，确保动画开始
  danmakuElement.offsetHeight
  
  // 调整速度：最小12秒，最大20秒，让弹幕停留更长时间
  const adjustedSpeed = Math.max(12, Math.min(20, item.speed + 8))
  
  // 开始动画：从右侧外部移动到左侧外部
  danmakuElement.style.transition = `left ${adjustedSpeed}s linear`
  danmakuElement.style.left = '-100%' // 移动到屏幕左侧外部
  
  // 动画结束后移除元素
  setTimeout(() => {
    if (danmakuElement.parentNode) {
      danmakuElement.parentNode.removeChild(danmakuElement)
    }
  }, adjustedSpeed * 1000)
}

// 开始弹幕循环
let timeoutId: number | null = null
const startDanmaku = () => {
  const addRandomDanmaku = () => {
    // 随机生成1-3条弹幕
    const danmakuCount = Math.floor(Math.random() * 3) + 1
    
    for (let i = 0; i < danmakuCount; i++) {
      const randomIndex = Math.floor(Math.random() * danmakuList.value.length)
      const randomItem = danmakuList.value[randomIndex]
      
      if (randomItem) {
        // 稍微延迟每条弹幕的生成，避免重叠
        setTimeout(() => {
          addDanmaku(randomItem)
        }, i * 200)
      }
    }
    
    // 更频繁的生成：0.1秒到0.6秒之间的随机间隔
    const randomDelay = Math.random() * 500 + 100
    timeoutId = setTimeout(addRandomDanmaku, randomDelay)
  }
  
  addRandomDanmaku()
}

// 停止弹幕
const stopDanmaku = () => {
  if (timeoutId) {
    clearTimeout(timeoutId)
    timeoutId = null
  }
}

// 组件挂载时初始化
onMounted(async () => {
  const data = await fetchDanmakuData()
  danmakuList.value = data
  startDanmaku()
})

// 组件卸载时清理
onUnmounted(() => {
  stopDanmaku()
})
</script>

<template>
  <div class="danmaku-fullscreen">
    <!-- 背景图片容器 -->
    <div class="background-container">
      <div class="bg-half bg-left">
        <img src="@/assets/imgs/bg1.jpg" alt="背景图片1" class="bg-image">
      </div>
      <div class="bg-half bg-right">
        <img src="@/assets/imgs/bg2.jpg" alt="背景图片2" class="bg-image">
      </div>
    </div>
    
    <!-- 弹幕容器 -->
    <div ref="containerRef" class="danmaku-container">
      <!-- 弹幕元素会动态添加到这里 -->
    </div>
  </div>
</template>

<style scoped>
.danmaku-fullscreen {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: visible; /* 改为visible，避免裁剪弹幕 */
  margin: 0;
  padding: 0;
}

/* 背景图片容器 */
.background-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  z-index: 0;
}

/* 背景图片半屏容器 */
.bg-half {
  width: 50%;
  height: 100%;
  position: relative;
  overflow: hidden;
}

/* 背景图片样式 */
.bg-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

/* 弹幕容器 */
.danmaku-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: visible;
  z-index: 1; /* 确保层级正确 */
}

/* 弹幕元素样式 */
.danmaku-item {
  position: absolute;
  white-space: nowrap;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  padding: 8px 15px;
  border-radius: 25px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  pointer-events: none;
  transform-origin: center;
  will-change: transform; /* 优化动画性能 */
  overflow: hidden; /* 防止内容溢出 */
  text-overflow: ellipsis; /* 文本溢出时显示省略号 */
  max-width: none; /* 移除最大宽度限制 */
  min-width: fit-content; /* 最小宽度适应内容 */
  display: inline-block; /* 确保内联块级显示 */
}
</style>

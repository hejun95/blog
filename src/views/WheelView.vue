<template>
  <div class="wheel-page">
    <div class="wheel-container">
      <!-- 转盘 -->
      <div 
        class="wheel" 
        :style="{ transform: `rotate(${rotation}deg)` }"
        :class="{ spinning: isSpinning }"
      >
        <svg class="wheel-svg" viewBox="0 0 400 400">
          <g v-for="(item, index) in wheelItems" :key="index">
            <path 
              :d="getWheelPath(index)"
              :fill="item.color"
              stroke="#333"
              stroke-width="2"
            />
            <text 
              :x="getTextX(index)"
              :y="getTextY(index)"
              class="wheel-text"
              :transform="`rotate(${getTextRotation(index)}, ${getTextX(index)}, ${getTextY(index)})`"
            >
              {{ item.text }}
            </text>
          </g>
        </svg>
      </div>
      
      <!-- 转盘中心按钮 -->
      <div class="wheel-center" @click="startSpin">
        <div v-if="!isSpinning && !showResult" class="center-text">点击开始</div>
        <div v-if="showResult" class="result-text">{{ currentResult }}</div>
      </div>
      
      <!-- 指针 -->
      <div class="pointer"></div>
    </div>
    
    <!-- 当前指向的数值显示 -->
    <div class="current-value">
      当前指向: {{ currentPointing }}
    </div>
    
    <!-- 添加选项的输入框 -->
    <div class="add-item-section">
      <input 
        v-model="newItemText" 
        placeholder="输入新选项"
        class="item-input"
        @keyup.enter="addItem"
      />
      <button @click="addItem" class="add-btn">添加</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface WheelItem {
  text: string
  color: string
}

// 预定义的颜色数组
const colors = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD',
  '#FF8A80', '#80DEEA', '#FFCC02', '#FF7043', '#8E24AA', '#43A047',
  '#E91E63', '#00BCD4', '#FF9800', '#795548', '#607D8B', '#9C27B0',
  '#FF5722', '#009688', '#3F51B5', '#FFC107', '#9E9E9E', '#FF1744',
  '#00E676', '#2196F3', '#FFEB3B', '#F44336', '#4CAF50', '#673AB7',
  '#8BC34A', '#CDDC39', '#03A9F4', '#0277BD', '#00695C', '#2E7D32',
  '#558B2F', '#827717', '#F57F17', '#FF6F00', '#E65100', '#BF360C'
]

// 转盘数据
const wheelItems = ref<WheelItem[]>([
  { text: '滑雪', color: colors[0] },
  { text: '野生动物园', color: colors[1] },
  { text: '蜡像馆', color: colors[2] },
  { text: '线下相声', color: colors[3] },
  { text: 'Live House', color: colors[4] },
  { text: '音乐节', color: colors[5] },
  { text: '山顶露营', color: colors[6] },
  { text: '密室逃脱', color: colors[7] },
  { text: '剧本杀', color: colors[8] },
  { text: '24小时沐浴', color: colors[9] },
  { text: '游泳', color: colors[10] },
  { text: '按摩spa', color: colors[11] },
  { text: '专业陶艺', color: colors[12] },
  { text: '漂流', color: colors[13] },
  { text: '密室逃脱', color: colors[14] },
  { text: '划船', color: colors[15] },
  { text: '话剧', color: colors[16] },
  { text: '车展', color: colors[17] },
  { text: '舞蹈音乐剧', color: colors[18] },
  { text: '线下脱口秀', color: colors[19] },
  { text: '骑行', color: colors[20] },
  { text: '文化讲坛', color: colors[21] },
  { text: '海洋馆', color: colors[22] },
  { text: '艺术展', color: colors[23] },
  { text: '演唱会', color: colors[24] },
  { text: 'coser展', color: colors[25] },
  { text: '法院旁观', color: colors[26] },
  { text: '骑马', color: colors[27] },
  { text: '放风筝', color: colors[28] }
])

const newItemText = ref('')
const rotation = ref(0)
const isSpinning = ref(false)
const showResult = ref(false)
const currentResult = ref('')

// 计算当前指向的选项
const currentPointing = computed(() => {
  if (wheelItems.value.length === 0) return '无选项'
  
  const itemCount = wheelItems.value.length
  const anglePerItem = 360 / itemCount
  const normalizedRotation = (rotation.value % 360 + 360) % 360
  const currentIndex = Math.floor((360 - normalizedRotation) / anglePerItem) % itemCount
  
  return wheelItems.value[currentIndex]?.text || '无选项'
})

// 获取转盘扇形路径
const getWheelPath = (index: number) => {
  const itemCount = wheelItems.value.length
  const anglePerItem = 360 / itemCount
  const startAngle = index * anglePerItem
  const endAngle = (index + 1) * anglePerItem
  
  const centerX = 200
  const centerY = 200
  const radius = 180
  
  const startRad = (startAngle - 90) * Math.PI / 180
  const endRad = (endAngle - 90) * Math.PI / 180
  
  const x1 = centerX + radius * Math.cos(startRad)
  const y1 = centerY + radius * Math.sin(startRad)
  const x2 = centerX + radius * Math.cos(endRad)
  const y2 = centerY + radius * Math.sin(endRad)
  
  const largeArcFlag = anglePerItem > 180 ? 1 : 0
  
  return `M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`
}

// 获取文字位置
const getTextX = (index: number) => {
  const itemCount = wheelItems.value.length
  const anglePerItem = 360 / itemCount
  const midAngle = (index * anglePerItem + anglePerItem / 2 - 90) * Math.PI / 180
  return 200 + 120 * Math.cos(midAngle)
}

const getTextY = (index: number) => {
  const itemCount = wheelItems.value.length
  const anglePerItem = 360 / itemCount
  const midAngle = (index * anglePerItem + anglePerItem / 2 - 90) * Math.PI / 180
  return 200 + 120 * Math.sin(midAngle)
}

const getTextRotation = (index: number) => {
  const itemCount = wheelItems.value.length
  const anglePerItem = 360 / itemCount
  return index * anglePerItem + anglePerItem / 2
}

// 开始转盘
const startSpin = () => {
  if (isSpinning.value || wheelItems.value.length === 0) return
  
  isSpinning.value = true
  showResult.value = false
  
  // 随机旋转角度 (5-10圈)
  const minSpins = 5
  const maxSpins = 10
  const spins = Math.random() * (maxSpins - minSpins) + minSpins
  const targetRotation = rotation.value + (spins * 360)
  
  // 动画持续时间 (3-5秒)
  const duration = Math.random() * 2000 + 3000
  
  const startTime = Date.now()
  const startRotation = rotation.value
  
  const animate = () => {
    const elapsed = Date.now() - startTime
    const progress = Math.min(elapsed / duration, 1)
    
    // 缓动函数：先快后慢
    const easeOut = 1 - Math.pow(1 - progress, 3)
    
    rotation.value = startRotation + (targetRotation - startRotation) * easeOut
    
    if (progress < 1) {
      requestAnimationFrame(animate)
    } else {
      // 动画结束
      isSpinning.value = false
      showResult.value = true
      currentResult.value = currentPointing.value
    }
  }
  
  requestAnimationFrame(animate)
}

// 添加新选项
const addItem = () => {
  if (!newItemText.value.trim()) return
  
  const colorIndex = wheelItems.value.length % colors.length
  wheelItems.value.push({
    text: newItemText.value.trim(),
    color: colors[colorIndex]
  })
  
  newItemText.value = ''
}
</script>

<style scoped>
.wheel-page {
  width: 100vw;
  height: 100vh;
  background-color: #000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.wheel-container {
  position: relative;
  width: 400px;
  height: 400px;
  margin-bottom: 30px;
}

.wheel {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  position: relative;
  transition: transform 0.1s ease-out;
  border: 4px solid #333;
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.1);
}

.wheel-svg {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.wheel-text {
  fill: white;
  font-weight: bold;
  font-size: 14px;
  text-anchor: middle;
  dominant-baseline: middle;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
}

.wheel-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #fff, #f0f0f0);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: 3px solid #333;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  transition: all 0.2s ease;
  z-index: 10;
}

.wheel-center:hover {
  transform: translate(-50%, -50%) scale(1.05);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.4);
}

.center-text {
  font-size: 12px;
  color: #333;
  font-weight: bold;
}

.result-text {
  font-size: 16px;
  color: #333;
  font-weight: bold;
  transform: rotate(-15deg);
  text-align: center;
  line-height: 1.2;
}

.pointer {
  position: absolute;
  top: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 15px solid transparent;
  border-right: 15px solid transparent;
  border-top: 25px solid #fff;
  z-index: 5;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
}

.current-value {
  color: white;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 20px;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
}

.add-item-section {
  display: flex;
  gap: 10px;
  align-items: center;
}

.item-input {
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 14px;
  outline: none;
  min-width: 200px;
}

.item-input::placeholder {
  color: rgba(255, 255, 255, 0.6);
}

.add-btn {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease;
}

.add-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.spinning {
  transition: none;
}
</style> 
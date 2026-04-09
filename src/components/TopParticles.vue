<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const canvasRef = ref(null)
const isDark = ref(false)
let animationId = null
let particles = []
let ctx = null
let observer = null

// 检测主题
const checkTheme = () => {
  isDark.value = document.documentElement.classList.contains('dark')
}

// 粒子类
class Particle {
  constructor(canvas) {
    this.canvas = canvas
    this.reset()
  }

  reset() {
    this.x = Math.random() * this.canvas.width
    this.y = Math.random() * 60 // 只在顶部60px区域内
    this.size = Math.random() * 1.5 + 0.5
    this.speedY = Math.random() * 0.2 + 0.05
    this.opacity = Math.random() * 0.5 + 0.2
  }

  update() {
    this.y -= this.speedY
    if (this.y < -10) {
      this.y = this.canvas.height + 10
      this.x = Math.random() * this.canvas.width
    }
  }

  draw() {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    // 根据主题调整粒子颜色
    const color = isDark.value ? '163, 177, 198' : '96, 115, 159'
    ctx.fillStyle = `rgba(${color}, ${this.opacity})`
    ctx.fill()
  }
}

// 初始化 Canvas
const initCanvas = () => {
  const canvas = canvasRef.value
  if (!canvas) return

  ctx = canvas.getContext('2d')

  // 设置 canvas 尺寸
  const updateSize = () => {
    canvas.width = window.innerWidth
    canvas.height = 60
  }
  updateSize()
  window.addEventListener('resize', updateSize)

  // 监听主题变化
  const observer = new MutationObserver(checkTheme)
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
  checkTheme()

  // 创建粒子
  const particleCount = Math.floor(window.innerWidth / 40) // 每40px一个粒子
  particles = []
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle(canvas))
  }

  // 动画循环
  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    particles.forEach(p => {
      p.update()
      p.draw()
    })

    animationId = requestAnimationFrame(animate)
  }
  animate()
}

onMounted(() => {
  initCanvas()
})

onUnmounted(() => {
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
  if (observer) {
    observer.disconnect()
  }
})
</script>

<template>
  <canvas ref="canvasRef" class="top-particles"></canvas>
</template>

<style scoped>
.top-particles {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  pointer-events: none;
  z-index: 100;
}
</style>
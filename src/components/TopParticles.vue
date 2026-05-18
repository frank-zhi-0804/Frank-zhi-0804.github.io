<script setup>
import { ref, onMounted } from 'vue'

const canvasRef = ref(null)
let animationId = null
let particles = []
let ctx = null
let mouse = { x: null, y: null }

class Particle {
  constructor(canvas) {
    this.canvas = canvas
    this.reset()
  }

  reset() {
    this.x = Math.random() * this.canvas.width
    this.y = Math.random() * this.canvas.height
    this.size = Math.random() * 2 + 1
    this.speedX = (Math.random() - 0.5) * 0.5
    this.speedY = (Math.random() - 0.5) * 0.5
    this.opacity = Math.random() * 0.6 + 0.4
    this.pulse = Math.random() * Math.PI * 2
    this.pulseSpeed = Math.random() * 0.02 + 0.01
  }

  update() {
    this.x += this.speedX
    this.y += this.speedY
    this.pulse += this.pulseSpeed

    if (this.x < 0 || this.x > this.canvas.width) this.speedX *= -1
    if (this.y < 0 || this.y > this.canvas.height) this.speedY *= -1

    // Mouse interaction - particles avoid cursor
    if (mouse.x !== null && mouse.y !== null) {
      const dx = this.x - mouse.x
      const dy = this.y - mouse.y
      const dist = Math.hypot(dx, dy)
      if (dist < 80) {
        this.x += dx * 0.015
        this.y += dy * 0.015
      }
    }
  }

  draw() {
    const pulseOpacity = this.opacity * (0.5 + 0.5 * Math.sin(this.pulse))
    const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 3)
    gradient.addColorStop(0, `rgba(255, 223, 100, ${pulseOpacity})`)
    gradient.addColorStop(0.3, `rgba(255, 200, 50, ${pulseOpacity * 0.6})`)
    gradient.addColorStop(1, 'rgba(255, 180, 0, 0)')

    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2)
    ctx.fillStyle = gradient
    ctx.fill()

    // Core
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size * 0.5, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(255, 255, 200, ${pulseOpacity})`
    ctx.fill()
  }
}

const initCanvas = () => {
  const canvas = canvasRef.value
  if (!canvas) return

  ctx = canvas.getContext('2d')

  const updateSize = () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }
  updateSize()
  window.addEventListener('resize', updateSize)

  // Create more particles
  const particleCount = Math.floor((window.innerWidth * window.innerHeight) / 8000)
  particles = []
  for (let i = 0; i < Math.min(particleCount, 150); i++) {
    particles.push(new Particle(canvas))
  }

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
  // Only start in dark mode
  if (document.documentElement.classList.contains('dark')) {
    initCanvas()
  }

  // Watch for theme changes
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.attributeName === 'class') {
        const isDark = document.documentElement.classList.contains('dark')
        if (isDark && !animationId) {
          initCanvas()
        } else if (!isDark && animationId) {
          cancelAnimationFrame(animationId)
          animationId = null
          particles = []
          if (ctx) {
            ctx.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height)
          }
        }
      }
    })
  })
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

  // Mouse tracking
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX
    mouse.y = e.clientY
  })

  window.addEventListener('mouseleave', () => {
    mouse.x = null
    mouse.y = null
  })
})
</script>

<template>
  <canvas ref="canvasRef" class="particle-canvas"></canvas>
</template>

<style scoped>
.particle-canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}
</style>
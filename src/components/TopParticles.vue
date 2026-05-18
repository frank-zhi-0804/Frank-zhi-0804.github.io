<script setup>
// Simple gradient effect instead of canvas animation
</script>

<template>
  <div class="top-gradient"></div>
</template>

<style scoped>
.top-gradient {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    var(--accent) 50%,
    transparent 100%
  );
  opacity: 0.4;
  pointer-events: none;
  z-index: 100;
}
</style>
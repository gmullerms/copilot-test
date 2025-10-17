<script setup>
import { ref, onMounted } from 'vue'

const currentTheme = ref('default')

const toggleTheme = () => {
  if (currentTheme.value === 'default') {
    currentTheme.value = 'nord'
    document.documentElement.setAttribute('data-theme', 'nord')
    localStorage.setItem('theme', 'nord')
  } else {
    currentTheme.value = 'default'
    document.documentElement.removeAttribute('data-theme')
    localStorage.setItem('theme', 'default')
  }
}

onMounted(() => {
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme === 'nord') {
    currentTheme.value = 'nord'
    document.documentElement.setAttribute('data-theme', 'nord')
  }
})
</script>

<template>
  <button @click="toggleTheme" class="theme-toggle">
    {{ currentTheme === 'default' ? '🌙 Nord Theme' : '☀️ Default Theme' }}
  </button>
</template>

<style scoped>
.theme-toggle {
  padding: 0.5rem 1rem;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  background-color: var(--color-background-soft);
  color: var(--color-text);
  cursor: pointer;
  font-size: 0.9rem;
  transition:
    background-color 0.3s,
    border-color 0.3s;
}

.theme-toggle:hover {
  border-color: var(--color-border-hover);
  background-color: var(--color-background-mute);
}
</style>

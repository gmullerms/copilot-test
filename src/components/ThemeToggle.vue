<template>
  <button
    @click="toggleTheme"
    class="theme-toggle"
    :title="`Switch to ${nextTheme} theme`"
    type="button"
  >
    <span class="theme-icon">{{ themeIcon }}</span>
    <span class="theme-label">{{ themeLabel }}</span>
  </button>
</template>

<script setup>
import { computed } from 'vue'
import { useTheme } from '@/composables/useTheme'

const { theme, toggleTheme, THEMES } = useTheme()

// Theme configuration map
const THEME_CONFIG = {
  [THEMES.LIGHT]: {
    icon: '☀️',
    label: 'Light',
    next: 'dark'
  },
  [THEMES.DARK]: {
    icon: '🌙',
    label: 'Dark',
    next: 'system'
  },
  [THEMES.SYSTEM]: {
    icon: '💻',
    label: 'System',
    next: 'light'
  }
}

const currentConfig = computed(() => THEME_CONFIG[theme.value] || THEME_CONFIG[THEMES.SYSTEM])
const themeIcon = computed(() => currentConfig.value.icon)
const themeLabel = computed(() => currentConfig.value.label)
const nextTheme = computed(() => currentConfig.value.next)
</script>

<style scoped>
.theme-toggle {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: 1px solid var(--color-border);
  border-radius: 6px;
  background: var(--color-background);
  color: var(--color-text);
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.theme-toggle:hover {
  border-color: var(--color-border-hover);
  background: var(--color-background-soft);
}

.theme-icon {
  font-size: 1rem;
}

.theme-label {
  font-weight: 500;
}

@media (max-width: 768px) {
  .theme-label {
    display: none;
  }
}
</style>
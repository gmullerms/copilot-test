<template>
  <button
    @click="toggleTheme"
    class="theme-toggle"
    :title="`Switch to ${getNextTheme()} theme`"
    type="button"
  >
    <span class="theme-icon">{{ getThemeIcon() }}</span>
    <span class="theme-label">{{ getThemeLabel() }}</span>
  </button>
</template>

<script setup>
import { useTheme } from '@/composables/useTheme'

const { theme, toggleTheme } = useTheme()

const getThemeIcon = () => {
  switch (theme.value) {
    case 'light':
      return '☀️'
    case 'dark':
      return '🌙'
    case 'system':
    default:
      return '💻'
  }
}

const getThemeLabel = () => {
  switch (theme.value) {
    case 'light':
      return 'Light'
    case 'dark':
      return 'Dark'
    case 'system':
    default:
      return 'System'
  }
}

const getNextTheme = () => {
  switch (theme.value) {
    case 'light':
      return 'dark'
    case 'dark':
      return 'system'
    case 'system':
    default:
      return 'light'
  }
}
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
import { ref, onMounted, watch } from 'vue'

const theme = ref('system')
const isDark = ref(false)

export function useTheme() {
  const setTheme = (newTheme) => {
    theme.value = newTheme
    localStorage.setItem('theme', newTheme)
    applyTheme()
  }

  const applyTheme = () => {
    const root = document.documentElement
    
    if (theme.value === 'dark') {
      root.setAttribute('data-theme', 'dark')
      isDark.value = true
    } else if (theme.value === 'light') {
      root.setAttribute('data-theme', 'light')
      isDark.value = false
    } else {
      // system preference
      root.removeAttribute('data-theme')
      isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
    }
  }

  const toggleTheme = () => {
    if (theme.value === 'light') {
      setTheme('dark')
    } else if (theme.value === 'dark') {
      setTheme('system')
    } else {
      setTheme('light')
    }
  }

  const initTheme = () => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
      theme.value = savedTheme
    }
    applyTheme()

    // Listen for system theme changes when in system mode
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = () => {
      if (theme.value === 'system') {
        applyTheme()
      }
    }
    mediaQuery.addEventListener('change', handleChange)
  }

  onMounted(() => {
    initTheme()
  })

  watch(theme, applyTheme)

  return {
    theme,
    isDark,
    setTheme,
    toggleTheme
  }
}
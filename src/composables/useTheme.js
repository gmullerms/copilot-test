import { ref, onMounted, onUnmounted, watch } from 'vue'

// Constants
const THEME_STORAGE_KEY = 'theme'
const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system'
}
const VALID_THEMES = Object.values(THEMES)

// Shared state
const theme = ref(THEMES.SYSTEM)
const isDark = ref(false)

// Media query for system preference
let mediaQuery = null
let mediaQueryHandler = null

/**
 * Composable for managing application theme
 * Supports light, dark, and system preference modes with persistence
 * 
 * @returns {Object} Theme state and controls
 * @property {Ref<string>} theme - Current theme mode ('light' | 'dark' | 'system')
 * @property {Ref<boolean>} isDark - Whether dark mode is currently active
 * @property {Function} setTheme - Set theme mode
 * @property {Function} toggleTheme - Cycle through theme modes
 */
export function useTheme() {
  /**
   * Sets the theme and persists to localStorage
   * @param {string} newTheme - Theme to set ('light', 'dark', or 'system')
   */
  const setTheme = (newTheme) => {
    if (!VALID_THEMES.includes(newTheme)) {
      console.warn(`Invalid theme: ${newTheme}. Using system default.`)
      newTheme = THEMES.SYSTEM
    }
    
    theme.value = newTheme
    
    try {
      localStorage.setItem(THEME_STORAGE_KEY, newTheme)
    } catch (error) {
      console.warn('Failed to save theme preference:', error)
    }
    
    applyTheme()
  }

  /**
   * Applies the current theme to the document
   */
  const applyTheme = () => {
    const root = document.documentElement
    
    if (theme.value === THEMES.DARK) {
      root.setAttribute('data-theme', THEMES.DARK)
      isDark.value = true
    } else if (theme.value === THEMES.LIGHT) {
      root.setAttribute('data-theme', THEMES.LIGHT)
      isDark.value = false
    } else {
      // System preference
      root.removeAttribute('data-theme')
      isDark.value = mediaQuery ? mediaQuery.matches : false
    }
  }

  /**
   * Cycles through theme modes: light -> dark -> system -> light
   */
  const toggleTheme = () => {
    if (theme.value === THEMES.LIGHT) {
      setTheme(THEMES.DARK)
    } else if (theme.value === THEMES.DARK) {
      setTheme(THEMES.SYSTEM)
    } else {
      setTheme(THEMES.LIGHT)
    }
  }

  /**
   * Initializes theme from localStorage and sets up system preference listener
   */
  const initTheme = () => {
    // Restore saved theme
    try {
      const savedTheme = localStorage.getItem(THEME_STORAGE_KEY)
      if (savedTheme && VALID_THEMES.includes(savedTheme)) {
        theme.value = savedTheme
      }
    } catch (error) {
      console.warn('Failed to load theme preference:', error)
    }

    // Set up system preference monitoring
    mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    mediaQueryHandler = () => {
      if (theme.value === THEMES.SYSTEM) {
        applyTheme()
      }
    }
    mediaQuery.addEventListener('change', mediaQueryHandler)
    
    applyTheme()
  }

  /**
   * Cleanup function to remove event listeners
   */
  const cleanup = () => {
    if (mediaQuery && mediaQueryHandler) {
      mediaQuery.removeEventListener('change', mediaQueryHandler)
    }
  }

  onMounted(() => {
    initTheme()
  })

  onUnmounted(() => {
    cleanup()
  })

  watch(theme, applyTheme)

  return {
    theme,
    isDark,
    setTheme,
    toggleTheme,
    THEMES
  }
}
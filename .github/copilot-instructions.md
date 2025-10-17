# GitHub Copilot Instructions

## Project Overview
This is a Vue 3 application with Vite, featuring a comprehensive theme switching system that supports light, dark, and system preference modes.

## Code Style & Conventions

### Vue Components
- Use Vue 3 Composition API with `<script setup>`
- Keep components focused and single-responsibility
- Use TypeScript-style JSDoc comments for better IntelliSense
- Follow Vue.js official style guide

### Theme System Architecture
The theme system uses a composable pattern with three modes:
- **Light**: Forces light theme (`data-theme="light"`)
- **Dark**: Forces dark theme (`data-theme="dark"`)
- **System**: Follows OS preference (no `data-theme` attribute)

Key implementation details:
- Theme state is managed in `src/composables/useTheme.js`
- CSS variables are defined in `src/assets/base.css`
- Manual themes override system preference via `data-theme` attribute
- Theme preference persists in localStorage
- System preference changes are monitored via `matchMedia`

### CSS & Styling
- Use CSS custom properties (CSS variables) for theming
- Scoped styles for component-specific styling
- Mobile-first responsive design
- Smooth transitions for theme changes (0.5s for colors)

### State Management
- Use Vue composables for shared state (not Vuex/Pinia for small apps)
- Keep composables pure and testable
- Handle side effects (localStorage, DOM) explicitly

### Error Handling
- Always handle localStorage failures gracefully (private browsing mode)
- Validate user input and stored data
- Provide sensible defaults when data is invalid

### Code Organization
- `src/composables/` - Reusable composition functions
- `src/components/` - Vue components
- `src/assets/` - Static assets and global styles
- `src/views/` - Route-level components
- `src/router/` - Vue Router configuration

## Best Practices

### When Adding New Features
1. Check existing patterns before creating new ones
2. Reuse composables and components when possible
3. Follow the established theme system architecture
4. Add comments only for complex logic or non-obvious decisions
5. Keep bundle size small - avoid unnecessary dependencies

### When Modifying Theme System
1. Test all three theme modes (light, dark, system)
2. Verify localStorage persistence works
3. Ensure smooth transitions between themes
4. Check responsive behavior on mobile
5. Validate that system preference changes are detected

### Testing Considerations
- Run `npm run lint` before committing
- Test theme switching in different browsers
- Verify responsive design on mobile viewports
- Check localStorage behavior in private browsing mode

## Common Tasks

### Adding a New Theme-Aware Component
```vue
<script setup>
// Import the theme composable if needed
import { useTheme } from '@/composables/useTheme'

const { isDark } = useTheme()
</script>

<style scoped>
/* Use CSS custom properties for colors */
.my-component {
  background: var(--color-background);
  color: var(--color-text);
  border: 1px solid var(--color-border);
}
</style>
```

### Adding New CSS Variables
Update `src/assets/base.css` in three places:
1. `:root` - Default (light) theme
2. `:root[data-theme='dark']` - Dark theme override
3. `@media (prefers-color-scheme: dark)` - System dark preference

## Dependencies
- **Vue 3.5+**: Core framework
- **Vue Router 4+**: Client-side routing
- **Vite 7+**: Build tool and dev server
- **ESLint + Prettier**: Code quality and formatting

## Linting & Formatting
- Run `npm run lint` to check and fix linting issues
- Run `npm run format` to format code with Prettier
- ESLint configuration is in `eslint.config.js`
- Prettier configuration is in `.prettierrc.json`

## Key Files
- `src/composables/useTheme.js` - Theme state management
- `src/components/ThemeToggle.vue` - Theme toggle button
- `src/assets/base.css` - Theme CSS variables
- `src/App.vue` - Root component with navigation

## Notes
- The app uses Vue 3 Composition API exclusively
- No TypeScript is configured (vanilla JavaScript)
- Theme preference is stored in localStorage with key `'theme'`
- Valid theme values: `'light'`, `'dark'`, `'system'`

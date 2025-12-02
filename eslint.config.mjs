// eslint.config.mjs
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  {
    // Regras customizadas do seu projeto
    rules: {
      // JS / TS básicos
      'no-unused-vars': 'warn',
      'no-console': 'off',
      'no-debugger': 'warn',
      'prefer-const': 'warn',

      // Se você quiser flexibilizar algumas regras do Vue:
      'vue/multi-word-component-names': 'off',
      'vue/no-v-html': 'off'
    }
  }
)

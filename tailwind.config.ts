import type { Config } from 'tailwindcss'

export default <Partial<Config>> {
  theme: {
    extend: {
      colors: {
        primary: '#4897df',
        'primary-content': '#061522',
        'primary-dark': '#247ed0',
        'primary-light': '#73b0e7',
        secondary: '#df9048',
        'secondary-content': '#221306',
        'secondary-dark': '#d07624',
        'secondary-light': '#e7aa73',
        background: '#141a1f',
        foreground: '#1f272e',
        border: '#33404d',
        copy: '#fafbfc',
        'copy-light': '#d1d9e0',
        'copy-lighter': '#94a7b8',
        success: '#48df48',
        warning: '#dfdf48',
        error: '#df4848',
        'success-content': '#062206',
        'warning-content': '#222206',
        'error-content': '#ffffff'
      }
    }
  }
}

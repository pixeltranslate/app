export default defineAppConfig({
  ui: {
    primary: 'sky',
    gray: 'neutral',
    button: {
      color: {
        primary: {
          solid: 'text-white bg-primary'
        },
        secondary: {
          solid: 'text-white bg-secondary'
        },
        light: {
          solid: 'text-white bg-primary-light'
        },
        dark: {
          solid: 'text-white bg-primary-dark'
        },
        red: {
          solid: 'text-white bg-red-500 hover:bg-red-400'
        }
      },
      default: {
        color: 'white'
      }
    },
    alert: {
      color: {
        red: {
          soft: 'bg-red-100 dark:bg-red-400 dark:bg-opacity-10 text-red-500 dark:text-red-400'
        }
      }
    },
    card: {
      rounded: 'rounded-sm'
    },
    dropdown: {
      rounded: 'rounded-sm'
    },
    notifications: {
      position: 'bottom-0 top-auto'
    },
    input: {
      default: {
        size: 'lg'
      }
    }
  }
})

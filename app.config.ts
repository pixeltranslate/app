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
        dark: {
          solid: 'text-white bg-primary-light'
        }
      },
      default: {
        color: 'white'
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

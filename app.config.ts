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

import type { SidebarItem } from '~/components/Navigation/SidebarItem.vue'

/* Display content */
interface SidebarDisplayOptions {
  links: SidebarItem[]
  workspace: {
    display: boolean,
    selectedWorkspace?: string
  },
}
type SidebarViews = 'home' | 'workspace'
const getRouteToView = (route: string): SidebarViews => {
  const splitRoute = route.split('/').splice(1)
  if (splitRoute[0] === '') {
    return 'home'
  }
  return 'workspace'
}

const getWorkSpaces = (): SidebarItem[] => {
  // Retrieve workspaces from User
  return [
    {
      label: 'Prismarin',
      href: '/workspace/prismarin',
      avatar: {
        text: 'P'
      }
    },
    {
      label: 'Averix',
      href: '/workspace/averix',
      avatar: {
        text: 'A'
      }
    }
  ]
}

const getHomeSidebar = (): SidebarDisplayOptions => {
  return {
    links: [],
    workspace: { display: false }
  }
}

const getWorkspaceSidebar = (): SidebarDisplayOptions => {
  const page = usePage()

  const projects = {
    label: 'Projects',
    icon: 'pixelarticons:folder',
    children: [{
      label: 'Backrooms: Survive the complex',
      href: '/'
    }, {
      label: 'Frostbite',
      href: '/'
    }, {
      label: 'Inverted Souls',
      href: '/'
    }]
  }
  return {
    links: [{
      label: 'Back',
      icon: 'pixelarticons:chevron-left',
      href: '/'
    }, {
      label: 'Settings',
      icon: 'pixelarticons:sliders',
      href: '/'
    },
    projects
    ],
    workspace: { display: true, selectedWorkspace: page.workspace }
  }
}

/* General functionality */
const isExpanded = ref(true)
const toggle = () => {
  isExpanded.value = !isExpanded.value
}

export default () => {
  return {
    isExpanded,
    toggle,
    getRouteToView,
    getWorkSpaces,
    getWorkspaceSidebar,
    getHomeSidebar
  }
}

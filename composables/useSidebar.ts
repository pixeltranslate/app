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
const routeToView: Record<string, SidebarViews> = {
  '/': 'home',
  '/workspace': 'workspace'
}
const getRouteToView = (route: string): SidebarViews => routeToView[route] || 'home'

const getWorkSpaces = (): SidebarItem[] => {
  return [
    {
      label: 'Prismarin',
      href: '/workspace',
      avatar: {
        text: 'P'
      }
    },
    {
      label: 'Averix',
      href: '/workspace',
      avatar: {
        text: 'A'
      }
    }
  ]
}

const getHomeSidebar = (): SidebarDisplayOptions => {
  return {
    links: [{
      label: 'Workspace',
      icon: 'pixelarticons:sliders',
      href: '/workspace'
    }],
    workspace: { display: false }
  }
}

const getWorkspaceSidebar = (selectedWorkspace: string): SidebarDisplayOptions => {
  // TODO Get projects to display for workspace
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
    workspace: { display: true, selectedWorkspace }
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

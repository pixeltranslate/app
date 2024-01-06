import { z } from 'zod'
import { type RouteSchema } from './usePage'
import usePage from './usePage'
import type { SidebarItem } from '~/components/Navigation/SidebarItem.vue'
import type { GlobalOpeners } from '~/composables/useGlobalOpeners'

type UsePage = ReturnType<typeof usePage>
const sidebarSectionsSchema = z.enum(['userInfo', 'workspaceInfo', 'workspaces', 'projects', 'projectInfo'])
type SidebarSections = z.infer<typeof sidebarSectionsSchema>

const generateBackLink = (page: UsePage) => {
  if (page.projectId) {
    return `/workspace/${page.workspaceId}`
  }
  return '/'
}

const generateDynamicLink = (page: UsePage, url: string) => {
  if (!page.workspaceId) {
    return url
  }
  if (page.projectId) {
    return `/workspace/${page.workspaceId}/project/${page.projectId}${url}`
  }
  return `/workspace/${page.workspaceId}${url}`
}

const isActive = (page: UsePage, identifier: string, method: 'exact' | 'includes') => {
  if (method === 'exact') {
    return page.path.replaceAll('/', '') === identifier.replaceAll('/', '')
  }
  return page.path.includes(identifier)
}

const homeLinks = (page: UsePage): SidebarItem[] => {
  return [
    { label: 'Dashboard', icon: 'i-pixelarticons-dashbaord', href: '/', active: isActive(page, '', 'exact') },
    { label: 'Workspaces', icon: 'i-pixelarticons-group', href: '/workspaces', active: isActive(page, '/workspaces', 'exact') }
  ]
}

const dynamicRouteLinks: Record<keyof RouteSchema, ((page: UsePage, openers: GlobalOpeners) => SidebarItem[])> = {
  workspaceId: (page, openers) => [
    { label: 'Back', icon: 'i-pixelarticons-chevron-left', href: generateBackLink(page) },
    {
      label: 'Projects',
      icon: 'i-pixelarticons-chart',
      href: generateDynamicLink(page, '/'),
      active: isActive(page, generateDynamicLink(page, ''), 'includes')
    },
    {
      label: 'Settings',
      icon: 'i-pixelarticons-sliders',
      click: () => {
        if (!page.workspace.data.value) {
          return
        }
        openers.workspaceCreateOrEdit.open({
          mode: 'update',
          data: page.workspace.data.value
        })
      }
    }
  ],
  projectId: (page, openers) => [
    { label: 'Back to workspace', icon: 'i-pixelarticons-chevron-left', href: generateBackLink(page) },
    { label: 'Dashboard', icon: 'i-pixelarticons-dashbaord', href: generateDynamicLink(page, '/'), active: isActive(page, generateDynamicLink(page, ''), 'exact') },
    { label: 'Collections', icon: 'i-pixelarticons-group', href: generateDynamicLink(page, '/collection'), active: isActive(page, generateDynamicLink(page, '/collection'), 'exact') },
    {
      label: 'Settings',
      icon: 'i-pixelarticons-sliders',
      click: () => {
        if (!page.project.data.value || !page.workspaceId) {
          return
        }
        openers.projectCreateOrEdit.open({
          mode: 'update',
          data: {
            ...page.project.data.value,
            workspaceId: page.workspaceId
          }
        })
      }
    }
  ],
  collectionId: () => []
}

const homeSections: SidebarSections[] = ['userInfo', 'workspaces']
const dynamicSections: Record<keyof RouteSchema, SidebarSections[]> = {
  workspaceId: ['workspaceInfo', 'projects'],
  projectId: ['projectInfo'],
  collectionId: []
}

const getSidebarInfo = (page: UsePage, openers: GlobalOpeners) => {
  if (page.projectId) {
    return {
      sections: dynamicSections.projectId,
      links: dynamicRouteLinks.projectId(page, openers)
    }
  } else if (page.workspaceId) {
    return {
      sections: dynamicSections.workspaceId,
      links: dynamicRouteLinks.workspaceId(page, openers)
    }
  }
  return {
    sections: homeSections,
    links: homeLinks(page)
  }
}

/* General functionality */
const isExpanded = ref(true)
const toggle = () => {
  isExpanded.value = !isExpanded.value
}

export default () => {
  const openers = useGlobalOpeners()
  const page = usePage()
  const data = computed(() => getSidebarInfo(page, openers))

  return {
    isExpanded,
    toggle,
    data
  }
}

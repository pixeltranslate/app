import { z } from 'zod'
import { type RouteSchema } from './usePage'
import usePage from './usePage'
import type { SidebarItem } from '~/components/Navigation/SidebarItem.vue'
import type { GlobalOpeners } from '~/composables/useGlobalOpeners'

type UsePage = ReturnType<typeof usePage>
const sidebarSectionsSchema = z.enum(['userInfo', 'workspaceInfo', 'workspaces', 'projects'])
type SidebarSections = z.infer<typeof sidebarSectionsSchema>

const generateBackLink = (page: UsePage) => {
  if (page.workspaceId) {
    return `/workspace/${page.workspaceId}`
  }
  return '/'
}

const homeLinks: SidebarItem[] = [
  { label: 'Dashboard', icon: 'i-pixelarticons-dashbaord', href: '/' },
  { label: 'Workspaces', icon: 'i-pixelarticons-group', href: '/' },
  { label: 'Documentation', icon: 'i-pixelarticons-book', href: '/' }
]
const dynamicRouteLinks: Record<keyof RouteSchema, ((page: UsePage, openers: GlobalOpeners) => SidebarItem[])> = {
  workspace: () => [
    {
      label: 'Edit',
      icon: 'i-pixelarticons-edit'
    },
    { label: 'Members', icon: 'i-pixelarticons-users' }
  ],
  project: page => [
    { label: 'Back', icon: 'i-pixelarticons-chevron-left', href: generateBackLink(page) }
  ]
}

const homeSections: SidebarSections[] = ['userInfo', 'workspaces']
const dynamicSections: Record<keyof RouteSchema, SidebarSections[]> = {
  workspace: ['workspaceInfo', 'projects', 'workspaces'],
  project: ['projects']
}

const getSidebarInfo = (page: UsePage, openers: GlobalOpeners) => {
  if (page.projectId) {
    return {
      sections: dynamicSections.project,
      links: dynamicRouteLinks.project(page, openers)
    }
  } else if (page.workspaceId) {
    return {
      sections: dynamicSections.workspace,
      links: dynamicRouteLinks.workspace(page, openers)
    }
  }
  return {
    sections: homeSections,
    links: homeLinks
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

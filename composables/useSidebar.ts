import { z } from 'zod'
import { routeSchema, type RouteSchema } from './usePage'
import type { SidebarItem } from '~/components/Navigation/SidebarItem.vue'
import type { GlobalOpeners } from '~/composables/useGlobalOpeners'

const sidebarSectionsSchema = z.enum(['userInfo', 'workspaceInfo', 'workspaces', 'projects'])
type SidebarSections = z.infer<typeof sidebarSectionsSchema>

const generateBackLink = (params: RouteSchema) => {
  if (params.workspace) {
    return `/workspace/${params.workspace}`
  }
  return '/'
}

const homeLinks: SidebarItem[] = [
  { label: 'Dashboard', icon: 'i-pixelarticons-dashbaord', href: '/' },
  { label: 'Workspaces', icon: 'i-pixelarticons-group', href: '/' },
  { label: 'Documentation', icon: 'i-pixelarticons-book', href: '/' }
]
const dynamicRouteLinks: Record<keyof RouteSchema, ((params: RouteSchema, openers: GlobalOpeners) => SidebarItem[])> = {
  workspace: () => [
    {
      label: 'Edit',
      icon: 'i-pixelarticons-edit'
    },
    { label: 'Members', icon: 'i-pixelarticons-users' }
  ],
  project: params => [
    { label: 'Back', icon: 'i-pixelarticons-chevron-left', href: generateBackLink(params) }
  ]
}

const homeSections: SidebarSections[] = ['userInfo', 'workspaces']
const dynamicSections: Record<keyof RouteSchema, SidebarSections[]> = {
  workspace: ['workspaceInfo', 'projects', 'workspaces'],
  project: ['projects']
}

const getSidebarInfo = (routeParams: RouteSchema, openers: GlobalOpeners) => {
  if (routeParams.project) {
    return {
      sections: dynamicSections.project,
      links: dynamicRouteLinks.project(routeParams, openers)
    }
  } else if (routeParams.workspace) {
    return {
      sections: dynamicSections.workspace,
      links: dynamicRouteLinks.workspace(routeParams, openers)
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
  const { params } = useRoute()
  const openers = useGlobalOpeners()
  const routeParams = routeSchema.parse(params)
  const data = computed(() => getSidebarInfo(routeParams, openers))

  return {
    isExpanded,
    toggle,
    data
  }
}

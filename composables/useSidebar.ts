import { z } from 'zod'
import type { SidebarItem } from '~/components/Navigation/SidebarItem.vue'

const sidebarSectionsSchema = z.enum(['userInfo', 'workspaceInfo', 'workspaces', 'projects'])
const routeSchema = z.object({
  workspace: z.string().nullish(),
  project: z.string().nullish()
})
type SidebarSections = z.infer<typeof sidebarSectionsSchema>
type RouteSchema = z.infer<typeof routeSchema>

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
const dynamicRouteLinks: Record<keyof RouteSchema, ((params: RouteSchema) => SidebarItem[])> = {
  workspace: params => [
    { label: 'Back', icon: 'i-pixelarticons-chevron-left', href: '/' },
    { label: 'Project', icon: 'i-pixelarticons-folder', href: `/workspace/${params.workspace || 'Averix'}/project/test` }
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

const getSidebarInfo = (routeParams: RouteSchema) => {
  if (routeParams.project) {
    return {
      sections: dynamicSections.project,
      links: dynamicRouteLinks.project(routeParams)
    }
  } else if (routeParams.workspace) {
    return {
      sections: dynamicSections.workspace,
      links: dynamicRouteLinks.workspace(routeParams)
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
  const routeParams = routeSchema.parse(params)
  const data = computed(() => getSidebarInfo(routeParams))

  return {
    isExpanded,
    toggle,
    data
  }
}

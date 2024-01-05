import { z } from 'zod'
import { idSchema, updateWorkspaceSchema, updateProjectSchema, updateCollectionSchema } from '~/server/schemas'

const makeGlobalOpener = <T>() => {
  const data = ref<T>()

  return {
    open: (payload: T) => { data.value = payload },
    close: () => { data.value = undefined },
    data
  }
}

export const openCreateOrUpdateWorkspaceSchema = z.discriminatedUnion('mode', [
  z.object({ mode: z.literal('create') }),
  z.object({ mode: z.literal('update'), data: updateWorkspaceSchema })
])
type OpenCreateOrUpdateWorkspace = z.infer<typeof openCreateOrUpdateWorkspaceSchema>

export const openCreateOrUpdateProjectSchema = z.discriminatedUnion('mode', [
  z.object({ mode: z.literal('create'), data: z.object({ workspaceId: idSchema }) }),
  z.object({ mode: z.literal('update'), data: updateProjectSchema })
])
type OpenCreateOrUpdateProject = z.infer<typeof openCreateOrUpdateProjectSchema>

export const openCreateOrUpdateCollectionSchema = z.discriminatedUnion('mode', [
  z.object({ mode: z.literal('create'), data: z.object({ workspaceId: idSchema, projectId: idSchema }) }),
  z.object({ mode: z.literal('update'), data: updateCollectionSchema })
])
type OpenCreateOrUpdateCollection = z.infer<typeof openCreateOrUpdateCollectionSchema>

// Opener definition
const openers = {
  workspaceCreateOrEdit: makeGlobalOpener<OpenCreateOrUpdateWorkspace>(),
  workspaceDelete: makeGlobalOpener<{ id: string, name: string }>(),
  projectCreateOrEdit: makeGlobalOpener<OpenCreateOrUpdateProject>(),
  projectDelete: makeGlobalOpener<{ id: string, workspaceId: string, name: string }>(),
  collectionCreateOrEdit: makeGlobalOpener<OpenCreateOrUpdateCollection>(),
  collectionDelete: makeGlobalOpener<{ workspaceId: string, projectId: string, id: string, name: string }>()
}

export type GlobalOpeners = typeof openers
export default () => {
  return openers
}

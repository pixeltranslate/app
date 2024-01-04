import { z } from 'zod'
import { idSchema, updateWorkspaceSchema, updateProjectSchema } from '~/server/schemas'

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

// Opener definition
const openers = {
  workspaceCreateOrEdit: makeGlobalOpener<OpenCreateOrUpdateWorkspace>(),
  workspaceDelete: makeGlobalOpener<{ id: string, name: string }>(),
  projectCreateOrEdit: makeGlobalOpener<OpenCreateOrUpdateProject>(),
  projectDelete: makeGlobalOpener<{ id: string, workspaceId: string, name: string }>(),
  languageCreateOrEdit: makeGlobalOpener<{ test: string }>()
}

export type GlobalOpeners = typeof openers
export default () => {
  return openers
}

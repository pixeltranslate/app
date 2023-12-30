import type { ProjectPlatforms } from '~/types'

export const platformToIcon: Record<ProjectPlatforms, string> = {
  unity: 'i-bxl-unity',
  unreal: 'i-file-icons-unrealscript',
  java: 'i-bxl-java',
  node: 'i-bxl-javascript',
  multi: 'i-pixelarticons-command'
}

export default (platform: ProjectPlatforms) => {
  return platformToIcon[platform]
}

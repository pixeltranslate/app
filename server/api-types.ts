export interface APIWorkspaceResponse {
  id: string,
  name: string,
  description: string,
  createdAt: number,
  memebers: Record<string, string>
}

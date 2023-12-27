export interface APIWorkspaceResponse {
  id: string,
  name: string,
  description: string,
  createdAt: number,
  members: Record<string, string>
}

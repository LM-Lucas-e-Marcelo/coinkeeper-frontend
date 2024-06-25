import { api } from '@/services/api'
import { IRoles } from '@/types/roles/get-roles'

interface UseRolesProps {
  per?: string
  content?: string
}

export async function useRoles({
  content = '',
  per = '',
}: UseRolesProps): Promise<{ roles: IRoles }> {
  const queryParams = new URLSearchParams()

  if (content) {
    queryParams.append(per, content)
  }

  const response = await api(`/roles/search?${queryParams.toString()}`, {
    next: {
      tags: ['roles'],
    },
  })

  const roles = await response.json()

  return { roles }
}

import { api } from '../api-client'

export interface ICompany {
  id: number
  name: string
}

export async function getCompanies(): Promise<{ companies: ICompany[] }> {
  const result = await api.get(`organizations/user/my-organizations`, {
    next: {
      tags: ['companies'],
    },
  })

  const companies = await result.json<ICompany[]>()

  return { companies }
}

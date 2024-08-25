import { api } from '../api-client'

export interface ICompany {
  token: string
  organization: {
    name: string
  }
}

export interface ICompanyAuth {
  organizationId: number
}

export async function companyAuth({
  organizationId,
}: ICompanyAuth): Promise<ICompany> {
  const result = await api.post('auth/sign-in/organization', {
    json: {
      organizationId,
    },
  })

  return await result.json<ICompany>()
}

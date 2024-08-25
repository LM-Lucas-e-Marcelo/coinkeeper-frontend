'use client'
import { signInCompany } from '@/actions/auth/sign-in-company-action'

import { ICompany } from '@/http/companies/get-companies'
import { useRouter } from 'next/navigation'

export function CompanyCard(company: ICompany) {
  const router = useRouter()

  const handleAuth = async ({ id }: { id: number }): Promise<void> => {
    await signInCompany(id)
    router?.push('/dashboard')
  }

  return (
    <button
      onClick={() => handleAuth({ id: company.id })}
      className="p-3 border border-primary rounded-md hover:bg-primary hover:text-white min-w-[100px]"
    >
      <span />
      <p>{company.name}</p>
    </button>
  )
}

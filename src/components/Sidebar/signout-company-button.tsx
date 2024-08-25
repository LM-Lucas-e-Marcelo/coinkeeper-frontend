'use client'

import { GoOrganization } from '@/assets/icons'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'
import { deleteCookie } from 'cookies-next'

export const SignOutCompanyButton = () => {
  const { push } = useRouter()

  const handleSignOut = useCallback(() => {
    deleteCookie('organization-token')
    deleteCookie('organization-name')
    push('/companies')
  }, [push])

  return (
    <button
      onClick={handleSignOut}
      className="flex w-full p-3 gap-3 items-center"
    >
      <GoOrganization size={20} />
      Trocar empresa
    </button>
  )
}

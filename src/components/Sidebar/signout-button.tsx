'use client'

import { MdLogout } from '@/assets/icons'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'
import { deleteCookie } from 'cookies-next'

export const SignOutButton = () => {
  const { push } = useRouter()

  const handleSignOut = useCallback(() => {
    deleteCookie('token')
    deleteCookie('user')
    deleteCookie('organization-token')
    deleteCookie('organization-name')
    push('/')
  }, [push])

  return (
    <button
      onClick={handleSignOut}
      className="flex w-full p-3 gap-3 items-center mt-[-15px]"
    >
      <MdLogout size={20} />
      Sair
    </button>
  )
}

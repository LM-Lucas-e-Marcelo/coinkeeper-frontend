'use client'

import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { useCallback } from 'react'

type AddParamsProps = { [key: string]: string | boolean | number }

export const useUrlParams = () => {
  const router = useRouter()
  const pathname = usePathname()
  const params = useSearchParams()

  const addParams = useCallback(
    (newParams: AddParamsProps) => {
      const currentParams = new URLSearchParams(params.toString())
      Object.entries(newParams).forEach(([key, value]) => {
        currentParams.set(key, String(value))
      })
      router.push(`${pathname}?${currentParams.toString()}`)
    },
    [router, pathname, params],
  )

  const removeParams = useCallback(
    (paramsToRemove: string[]) => {
      const currentParams = new URLSearchParams(params.toString())
      paramsToRemove.forEach((param) => currentParams.delete(param))
      router.push(`${pathname}?${currentParams.toString()}`)
    },
    [router, pathname, params],
  )

  return { addParams, removeParams, params }
}

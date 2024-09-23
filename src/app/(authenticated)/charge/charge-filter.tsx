'use client'

import { Button } from '@/components/form/button'
import { Input } from '@/components/form/input'
import { useUrlParams } from '@/hooks/use-params'
import { FormEvent, useCallback } from 'react'

export const ChargeFilter = () => {
  const { addParams, params } = useUrlParams()

  const dateFilter = params.get('date')

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()

      const form = event.currentTarget
      const data = new FormData(form)
      const filter = Object.fromEntries(data) as never

      addParams(filter)
    },
    [addParams],
  )

  return (
    <form
      className="flex gap-3 items-end mt-[-15px] pb-3"
      onSubmit={handleSubmit}
    >
      <Input
        type="date"
        label="Filtrar"
        defaultValue={dateFilter || new Date().toISOString().split('T')[0]}
        name="date"
      />
      <Button type="submit">Filtrar</Button>
    </form>
  )
}

'use client'
import { tv } from 'tailwind-variants'
import { Button } from './button'
import { useUrlParams } from '@/hooks/use-params'
import { FormEvent } from 'react'
import { z } from 'zod'

const filter = tv({
  slots: {
    base: 'flex items-center gap-3',
    select: 'border border-zinc-300 p-2 rounded-md',
    input: 'border border-zinc-300 p-[6px] rounded-md',
  },
})

const filterSchema = z.object({
  per: z.string(),
  content: z.string().nullish(),
})

const { base, select, input } = filter()

interface FilterProps {
  options: Array<{
    name: string
    value: string
  }>
}

export const Filter = ({ options }: FilterProps) => {
  const { addParams, removeParams } = useUrlParams()

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const result = filterSchema.safeParse(Object.fromEntries(data))

    if (!result.success) return

    const { per, content } = result.data

    if (!content) {
      return removeParams([per])
    }

    addParams({
      [per]: content,
    })
  }

  return (
    <form className={base()} onSubmit={onSubmit}>
      <select className={select()} name="per">
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>
      <input placeholder="Buscar" className={input()} name="content" />
      <Button>Filtrar</Button>
    </form>
  )
}

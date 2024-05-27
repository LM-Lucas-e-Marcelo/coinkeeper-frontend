'use client'
import { tv } from 'tailwind-variants'
import { Button } from './button'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useUrlParams } from '@/hooks/useParams'

const filter = tv({
  slots: {
    base: 'flex items-center gap-3',
    select: 'border border-zinc-300 p-2 rounded-md',
    input: 'border border-zinc-300 p-[6px] rounded-md',
  },
})

const { base, select, input } = filter()

interface FilterProps {
  options: Array<{
    name: string
    value: string
  }>
}

interface IForm {
  per: string
  content: string
}

export const Filter = ({ options }: FilterProps) => {
  const { addParams, removeParams } = useUrlParams()
  const { register, handleSubmit } = useForm<IForm>()

  const onSubmit: SubmitHandler<IForm> = ({ content, per }): void => {
    if (!content) {
      return removeParams(['per', 'content'])
    }

    addParams({
      per,
      content,
    })
  }

  return (
    <form className={base()} onSubmit={handleSubmit(onSubmit)}>
      <select className={select()} {...register('per')}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>
      <input
        placeholder="Buscar"
        className={input()}
        {...register('content')}
      />
      <Button>Filtrar</Button>
    </form>
  )
}

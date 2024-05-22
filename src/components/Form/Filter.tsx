import { tv } from 'tailwind-variants'
import { Button } from './button'

const filter = tv({
  slots: {
    base: 'flex items-center gap-3',
    select: 'border border-zinc-300 p-2 rounded-md',
    input: 'border border-zinc-300 p-[6px] rounded-md',
  },
})

const { base, select, input } = filter()

export const Filter = () => {
  return (
    <div className={base()}>
      <select className={select()}>
        <option value="xuxu">Nome</option>
      </select>
      <input placeholder="Buscar" className={input()} />
      <Button>Filtrar</Button>
    </div>
  )
}

import { IoIosSearch } from '@/assets/icons'
import { tv } from 'tailwind-variants'

const searchInput = tv({
  slots: {
    base: 'w-60 relative rounded-md overflow-hidden',
    input: 'size-full bg-secondary p-3 pr-10',
    icon: 'absolute top-[5px] right-2 text-zinc-400',
  },
})

const { base, input, icon } = searchInput()

export const SearchInput = () => {
  return (
    <div className={base()}>
      <input name="search" placeholder="Buscar" className={input()} />
      <IoIosSearch size={30} className={icon()} />
    </div>
  )
}

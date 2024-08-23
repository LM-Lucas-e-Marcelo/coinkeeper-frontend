'use client'
import { useUrlParams } from '@/hooks/use-params'
import { ReactNode } from 'react'
import { IoIosArrowDown } from '@/assets/icons'
import { tv } from 'tailwind-variants'

const orderIcon = tv({
  base: 'transition-all',
  variants: {
    isAsc: {
      true: 'rotate-180 ',
      false: 'rotate-0',
    },
    isActive: {
      true: 'text-primary',
    },
  },
})

interface TableCellProps {
  children: ReactNode
  sortBy?: string
}

export const TableCell = ({ children, sortBy }: TableCellProps) => {
  const { addParams, params } = useUrlParams()

  const sortDirection = params.get('sortDirection')
  const sortByParam = params.get('sortBy')

  const handleOrderBy = () => {
    addParams({
      sortDirection: sortDirection === 'asc' ? 'desc' : 'asc',
      sortBy: sortBy!,
    })
  }

  return (
    <td className="py-2 last:w-[100px]">
      {sortBy ? (
        <button onClick={handleOrderBy} className="flex items-center gap-2">
          {children}
          <IoIosArrowDown
            className={orderIcon({
              isAsc: sortDirection === 'asc',
              isActive: sortByParam === sortBy,
            })}
          />
        </button>
      ) : (
        children
      )}
    </td>
  )
}

'use client'
import { useUrlParams } from '@/hooks/use-params'
import { ReactNode } from 'react'
import { IoIosArrowDown } from '@/assets/icons'
import { tv } from 'tailwind-variants'

const tdStyles = tv({
  slots: {
    td: 'py-2 last:w-[100px]',
    orderIcon: 'transition-all',
  },
  variants: {
    isAsc: {
      true: {
        orderIcon: 'rotate-180',
      },
      false: {
        orderIcon: 'rotate-0',
      },
    },
    isActive: {
      true: {
        orderIcon: 'text-primary',
      },
    },
    isCheck: {
      true: {
        td: 'w-[120px] text-center',
      },
    },
  },
})

interface TableCellProps {
  children: ReactNode
  sortBy?: string
  isCheck?: boolean
}

const { orderIcon, td } = tdStyles()

export const TableCell = ({ children, sortBy, isCheck }: TableCellProps) => {
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
    <td className={td({ isCheck })}>
      {sortBy ? (
        <button
          onClick={handleOrderBy}
          className="flex items-center gap-2 text-nowrap"
        >
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

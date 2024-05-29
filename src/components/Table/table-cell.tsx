import { ReactNode } from 'react'

interface TableCellProps {
  children: ReactNode
}

export const TableCell = ({ children }: TableCellProps) => {
  return <td className="py-2 last:w-[100px] ">{children}</td>
}

import { ReactNode } from 'react'

interface TableCellProps {
  children: ReactNode
}

export const TableCell = ({ children }: TableCellProps) => {
  return <td className="py-2">{children}</td>
}

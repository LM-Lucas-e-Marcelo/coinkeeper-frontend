import { ReactNode } from 'react'

interface TableRowProps {
  children: ReactNode
}

export const TableRow = ({ children }: TableRowProps) => {
  return <tr className="border-b border-gray">{children}</tr>
}

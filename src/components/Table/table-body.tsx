import { ReactNode } from 'react'

interface TableBodyProps {
  children: ReactNode
}

export const TableBody = ({ children }: TableBodyProps) => {
  return <tbody className="text-center">{children}</tbody>
}

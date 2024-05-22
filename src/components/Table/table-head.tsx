import { ReactNode } from 'react'

interface TableHeadProps {
  children: ReactNode
}

export const TableHead = ({ children }: TableHeadProps) => {
  return <thead className="font-bold text-lg text-center">{children}</thead>
}

import { ReactNode } from 'react'

interface TableRootProps {
  children: ReactNode
}

export const TableRoot = ({ children }: TableRootProps) => {
  return <table className="w-full border-collapse">{children}</table>
}

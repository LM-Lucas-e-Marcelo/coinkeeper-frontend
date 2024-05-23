import { ReactNode } from 'react'

interface ModalActionsProps {
  children: ReactNode
}

export const ModalActions = ({ children }: ModalActionsProps) => {
  return (
    <span className="w-full flex  justify-end p-3 border-t">{children}</span>
  )
}

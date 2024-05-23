import { ReactNode } from 'react'

interface ModalContentProps {
  children: ReactNode
}

export const ModalContent = ({ children }: ModalContentProps) => {
  return <div className="p-3">{children}</div>
}

import { ReactNode } from 'react'

interface ModalHeaderProps {
  children: ReactNode
}

export const ModalHeader = ({ children }: ModalHeaderProps) => {
  return (
    <header className="w-full bg-primary p-3 text-white sticky top-0 z-10">
      {children}
    </header>
  )
}

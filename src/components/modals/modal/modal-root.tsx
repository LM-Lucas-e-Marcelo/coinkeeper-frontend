'use client'
import { ReactNode, useEffect } from 'react'
import { VariantProps, tv } from 'tailwind-variants'

const modalRoot = tv({
  slots: {
    overlay: 'fixed inset-0 flex justify-center items-center transition-colors',
    modal:
      'bg-white rounded-md overflow-hidden shadow transition-all min-w-[500px]',
  },
  variants: {
    isOpen: {
      true: {
        overlay: 'visible bg-black/20',
        modal: 'mt-0 opacity-100',
      },
      false: {
        overlay: 'invisible',
        modal: 'mt-[-400px] opacity-0',
      },
    },
  },
})

type ModalRootVariants = VariantProps<typeof modalRoot>

interface ModalRootProps extends ModalRootVariants {
  onClose: () => void
  children: ReactNode
}

export const ModalRoot = ({ isOpen, onClose, children }: ModalRootProps) => {
  const { modal, overlay } = modalRoot({ isOpen })

  useEffect(() => {
    const listener = (event: KeyboardEvent): void => {
      if (event.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    addEventListener('keydown', listener)
    return () => removeEventListener('keydown', listener)
  }, [isOpen, onClose])

  return (
    <div className={overlay()} onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} className={modal()}>
        {children}
      </div>
    </div>
  )
}

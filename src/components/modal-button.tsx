'use client'

import { useUrlParams } from '@/hooks/use-params'
import { ComponentProps } from 'react'

interface ModalButtonProps extends ComponentProps<'span'> {
  params: {
    [key: string]: string | boolean | number
  }
}

export const ModalButton = ({ params, ...rest }: ModalButtonProps) => {
  const { addParams } = useUrlParams()

  const handleOpenModal = () => addParams(params)

  return (
    <span
      className="cursor-pointer"
      onClick={(event) => {
        event.stopPropagation()
        handleOpenModal()
      }}
      {...rest}
    />
  )
}

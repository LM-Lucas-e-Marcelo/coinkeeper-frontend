'use client'

import { useUrlParams } from '@/hooks/useParams'
import { ComponentProps } from 'react'

interface ModalButtonProps extends ComponentProps<'span'> {
  params: {
    [key: string]: string | boolean | number
  }
}

export const ModalButon = ({ params, ...rest }: ModalButtonProps) => {
  const { addParams } = useUrlParams()

  const handleOpenModal = () => addParams(params)

  return <span className="cursor-pointer" onClick={handleOpenModal} {...rest} />
}

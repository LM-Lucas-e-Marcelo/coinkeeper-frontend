'use client'

import { useUrlParams } from '@/hooks/useParams'
import { ComponentProps } from 'react'

interface ModalButtonProps extends ComponentProps<'button'> {
  params: {
    [key: string]: string | boolean | number
  }
}

export const ModalButon = ({ params, ...rest }: ModalButtonProps) => {
  const { addParams } = useUrlParams()

  const handleOpenModal = () => addParams(params)

  return <button onClick={handleOpenModal} {...rest} />
}

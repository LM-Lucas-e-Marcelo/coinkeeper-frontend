/* eslint-disable @next/next/no-img-element */

'use client'

import { ButtonGroup } from '@/components/form/button-group'
import { Modal } from '../modal'
import { Button } from '@/components/form/button'
import { toast } from 'react-toastify'
import { useUrlParams } from '@/hooks/use-params'
import { useFormState } from '@/hooks/use-form-state'
import { reloadQrcodeAction } from '@/actions/whatsapp/pay-many-parcel-action'

interface ConnectBotModalProps {
  qrCode: string
}

export const ConnectBotModal = ({ qrCode }: ConnectBotModalProps) => {
  const { removeParams, params } = useUrlParams()
  const isOpen = params.has('connect_bot')

  const handleCloseModal = () => removeParams(['connect_bot'])

  const onSuccess = (message: string | null) => {
    toast(message, { type: 'success' })
  }
  const onError = (message: string | null) => {
    toast(message, { type: 'error' })
  }
  const [, handleSubmit] = useFormState({
    action: reloadQrcodeAction,
    onError,
    onSuccess,
  })

  return (
    <Modal.Root size="lg" isOpen={isOpen} onClose={handleCloseModal}>
      <Modal.Header>Enviar mensagem</Modal.Header>
      <form onSubmit={handleSubmit}>
        <Modal.Content>
          <div className="flex px-3 items-center justify-center">
            <img src={qrCode} alt="qrcode" />
          </div>
        </Modal.Content>
        <Modal.Actions>
          <ButtonGroup>
            <Button type="button" onClick={handleCloseModal} variant="danger">
              Fechar
            </Button>
            <Button type="submit">Recarregar</Button>
          </ButtonGroup>
        </Modal.Actions>
      </form>
    </Modal.Root>
  )
}

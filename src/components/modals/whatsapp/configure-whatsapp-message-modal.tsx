'use client'

import { ButtonGroup } from '@/components/form/button-group'
import { Modal } from '../modal'
import { Button } from '@/components/form/button'
import { toast } from 'react-toastify'
import { useUrlParams } from '@/hooks/use-params'
import { useFormState } from '@/hooks/use-form-state'
import { Textarea } from '@/components/form/textarea'
import { updateWhatsappMessageAction } from '@/actions/whatsapp/update-whatsapp-message-action'
import { GetWhatsappMessageResponse } from '@/http/whatsapp/get-whatsapp-messages'

interface ConfigureWhatsappMessageModalProps {
  messages: GetWhatsappMessageResponse
}

export const ConfigureWhatsappMessageModal = ({
  messages,
}: ConfigureWhatsappMessageModalProps) => {
  const { removeParams, params } = useUrlParams()
  const isOpen = params.has('configure_whatsapp_message')

  const handleCloseModal = () => {
    removeParams(['configure_whatsapp_message'])
  }

  const onSuccess = (message: string | null) => {
    toast(message, { type: 'success' })
    handleCloseModal()
  }
  const onError = (message: string | null) => {
    toast(message, { type: 'error' })
  }
  const [{ errors }, handleSubmit, isPending] = useFormState({
    action: updateWhatsappMessageAction,
    onError,
    onSuccess,
  })

  if (!messages) return null

  return (
    <Modal.Root size="lg" isOpen={isOpen} onClose={handleCloseModal}>
      <Modal.Header>Enviar mensagem</Modal.Header>
      <form onSubmit={handleSubmit}>
        <Modal.Content>
          <div className="flex flex-col gap-3">
            <Textarea
              label="Mensagem de cobrança"
              name="chargeMessage"
              error={errors?.chargeMessage}
              defaultValue={messages.chargeMessage}
            />
            <Textarea
              label="Mensagem de pagamento"
              name="payMessage"
              error={errors?.payMessage}
              defaultValue={messages.payMessage}
            />
            <Textarea
              label="Mensagem de quitação"
              name="payOffMessage"
              error={errors?.payOffMessage}
              defaultValue={messages.payOffMessage}
            />
          </div>
          <div className="mt-5 flex flex-col gap-2 text-zinc-400 text-sm">
            <p>Variáveis disponíveis: [[name]]</p>
            <p>Exemplo de uso: Olá [[name]], tudo bem?</p>
          </div>
        </Modal.Content>
        <Modal.Actions>
          <ButtonGroup>
            <Button type="button" onClick={handleCloseModal} variant="danger">
              Fechar
            </Button>

            <Button type="submit" disabled={isPending}>
              Editar
            </Button>
          </ButtonGroup>
        </Modal.Actions>
      </form>
    </Modal.Root>
  )
}

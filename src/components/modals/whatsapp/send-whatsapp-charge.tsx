'use client'

import { ButtonGroup } from '@/components/form/button-group'
import { Modal } from '../modal'
import { Button } from '@/components/form/button'
import { toast } from 'react-toastify'
import { useUrlParams } from '@/hooks/use-params'
import { useFormState } from '@/hooks/use-form-state'

import { Dispatch, SetStateAction, useMemo } from 'react'

import { IStatus } from '@/http/whatsapp/get-bot-status'
import { tv } from 'tailwind-variants'
import { ModalButton } from '@/components/modal-button'
import { sendMessageAction } from '@/actions/whatsapp/send-message-action'
import { ImSpinner11 } from '@/assets/icons'
import { reloadStatusAction } from '@/actions/whatsapp/reload-status-action'
import { ICharge } from '@/http/get-charges'
import { EmptyState } from '@/components/empty-state'

const statusStyles = tv({
  base: 'h-3 w-3 bg-red rounded-full',
  variants: {
    open: {
      true: 'bg-green-500',
    },
  },
})

interface SendWhatsappChargeProps {
  customers: ICharge[]
  selectedCustomers: number[]
  status: IStatus
  setSelectedCustomers: Dispatch<SetStateAction<number[]>>
}

export const SendWhatsappCharge = ({
  customers,
  selectedCustomers,
  status,
  setSelectedCustomers,
}: SendWhatsappChargeProps) => {
  const { removeParams, params } = useUrlParams()
  const isOpen = params.has('send_whatsapp_charge')

  const handleCloseModal = () => {
    removeParams(['send_whatsapp_charge'])
  }

  const onSuccess = (message: string | null) => {
    toast(message, { type: 'success' })
    setSelectedCustomers([])
    handleCloseModal()
  }
  const onError = (message: string | null) => {
    toast(message, { type: 'error' })
  }
  const [, handleSubmit, isPending] = useFormState({
    action: sendMessageAction,
    onError,
    onSuccess,
    payload: selectedCustomers,
  })

  const filterSelectedCustomers = useMemo(
    () =>
      customers?.filter((customer) => selectedCustomers.includes(customer.id)),
    [customers, selectedCustomers],
  )

  return (
    <Modal.Root size="lg" isOpen={isOpen} onClose={handleCloseModal}>
      <Modal.Header>Enviar mensagem</Modal.Header>
      <form onSubmit={handleSubmit}>
        <Modal.Content>
          <div className="flex justify-between px-3 pb-4">
            <div className="flex items-center gap-2">
              <p>Status BOT:</p>
              <div
                className={statusStyles({
                  open: status.connectionStatus === 'open',
                })}
              />
              <button type="button" onClick={reloadStatusAction}>
                <ImSpinner11 size={16} />
              </button>
            </div>
            <ButtonGroup>
              <ModalButton params={{ connect_bot: true }}>
                <Button type="button">Conectar Whatsapp</Button>
              </ModalButton>
              <ModalButton params={{ configure_whatsapp_message: true }}>
                <Button type="button">Configurar mensagem</Button>
              </ModalButton>
            </ButtonGroup>
          </div>

          <div className="border border-zinc-200 bg-zinc-50 p-3 flex-1 rounded-md flex flex-col gap-3  max-h-[70vh] overflow-auto">
            {filterSelectedCustomers.length ? (
              filterSelectedCustomers.map((customer) => (
                <button
                  className="flex justify-between items-center border border-primary bg-white px-2 py-2 rounded-md"
                  key={customer.id}
                  type="button"
                >
                  <p>{customer.name}</p>
                </button>
              ))
            ) : (
              <EmptyState message="Não há clientes selecionados" />
            )}
          </div>
        </Modal.Content>
        <Modal.Actions>
          <ButtonGroup>
            <Button type="button" onClick={handleCloseModal} variant="danger">
              Fechar
            </Button>

            <Button
              type="submit"
              disabled={isPending || !selectedCustomers?.length}
            >
              Enviar
            </Button>
          </ButtonGroup>
        </Modal.Actions>
      </form>
    </Modal.Root>
  )
}

'use client'

import { ButtonGroup } from '@/components/form/button-group'
import { Modal } from '../modal'
import { Button } from '@/components/form/button'
import { toast } from 'react-toastify'
import { useUrlParams } from '@/hooks/use-params'
import { useFormState } from '@/hooks/use-form-state'
import { ICustomerWithDebt } from '@/http/customers/get-customer-with-debt'
import { formatCurrency } from '@/utils/format-currency'
import { FormEvent, useCallback, useMemo, useState } from 'react'

import { Input } from '@/components/form/input'
import { IStatus } from '@/http/whatsapp/get-bot-status'
import { tv } from 'tailwind-variants'
import { ModalButton } from '@/components/modal-button'
import { sendMessageAction } from '@/actions/whatsapp/send-message-action'
import { ImSpinner11, FiX } from '@/assets/icons'
import { reloadStatusAction } from '@/actions/whatsapp/reload-status-action'

const statusStyles = tv({
  base: 'h-3 w-3 bg-red rounded-full',
  variants: {
    open: {
      true: 'bg-green-500',
    },
  },
})

interface PayManyParcelsProps {
  customers: ICustomerWithDebt[]
  status: IStatus
}

export const SendWhatsappMessage = ({
  customers,
  status,
}: PayManyParcelsProps) => {
  const [customerFilter, setCustomerFilter] = useState('')
  const [selectedCustomers, setSelectedCustomers] = useState<number[]>([])

  const { removeParams, params } = useUrlParams()
  const isOpen = params.has('send_whatsapp_message')

  const handleCloseModal = () => {
    removeParams(['send_whatsapp_message'])
    setSelectedCustomers([])
  }

  const onSuccess = (message: string | null) => {
    toast(message, { type: 'success' })
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

  const customersWithDebt = useMemo(
    () =>
      customers.filter(
        (customer) =>
          !selectedCustomers.includes(customer.id) &&
          customer.name
            .toLocaleLowerCase()
            .includes(customerFilter.toLocaleLowerCase()),
      ),
    [customerFilter, customers, selectedCustomers],
  )

  const filterSelectedCustomers = useMemo(
    () =>
      customers.filter((customer) => selectedCustomers.includes(customer.id)),
    [customers, selectedCustomers],
  )

  const handleSelectCustomer = useCallback((customerId: number) => {
    setSelectedCustomers((prevState) => [...prevState, customerId])
  }, [])

  const handleRemoveCustomer = useCallback((customerId: number) => {
    setSelectedCustomers((prevState) => [
      ...prevState.filter((id) => id !== customerId),
    ])
  }, [])

  const handleChangeFilter = (event: FormEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget
    setCustomerFilter(value)
  }

  const handleSelectAllCustomers = useCallback(() => {
    const customersWithDebt = customers.map((customer) => customer.id)
    setSelectedCustomers(customersWithDebt)
  }, [customers])

  const handleRemoveAllSelectedCustomers = () => {
    setSelectedCustomers([])
  }

  return (
    <Modal.Root size="lg" isOpen={isOpen} onClose={handleCloseModal}>
      <Modal.Header>Enviar mensagem</Modal.Header>
      <form onSubmit={handleSubmit}>
        <Modal.Content>
          <div className="flex justify-between px-3">
            <div className="flex items-center gap-2">
              <p>Status BOT:</p>
              <div
                className={statusStyles({
                  open: status.connectionStatus === 'open',
                })}
              />
              <button type="button" onClick={() => reloadStatusAction()}>
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
          <div className="flex gap-3 py-5 px-2 ">
            <div className="border border-zinc-200 bg-zinc-50 p-3 flex-1 rounded-md flex flex-col gap-3  max-h-[70vh] overflow-auto">
              <span className="flex flex-col">
                <p className="text-xl">Clientes</p>
                <Button type="button" onClick={handleSelectAllCustomers}>
                  Selecionar todos
                </Button>
              </span>
              <Input onChange={handleChangeFilter} placeholder="Buscar" />
              {customersWithDebt.map((customer) => (
                <button
                  onClick={() => handleSelectCustomer(customer.id)}
                  key={customer.id}
                  className="flex justify-between items-center border border-primary bg-white px-2 py-1 rounded-md"
                  type="button"
                >
                  <strong>{customer.name}</strong>
                  <div>
                    <p>Total: {formatCurrency(customer.totalDebt)}</p>
                    <p>Total de Parcelas: {customer.totalParcels}</p>
                  </div>
                </button>
              ))}
            </div>

            <div className="border border-zinc-200 bg-zinc-50 p-3 flex-1 rounded-md flex flex-col gap-3  max-h-[70vh] overflow-auto">
              <span className="flex flex-col">
                <p className="text-xl">Clientes Selecionados</p>
                <Button
                  type="button"
                  onClick={handleRemoveAllSelectedCustomers}
                >
                  Remover todos
                </Button>
              </span>
              {filterSelectedCustomers.map((customer) => (
                <button
                  className="flex justify-between items-center border border-primary bg-white px-2 py-1 rounded-md"
                  key={customer.id}
                  type="button"
                >
                  <p onClick={() => handleRemoveCustomer(customer.id)}>
                    {customer.name}
                  </p>
                  <button
                    type="button"
                    className="text-red"
                    onClick={() => handleRemoveCustomer(customer.id)}
                  >
                    <FiX size={20} />
                  </button>
                </button>
              ))}
            </div>
          </div>
        </Modal.Content>
        <Modal.Actions>
          <ButtonGroup>
            <Button type="button" onClick={handleCloseModal} variant="danger">
              Fechar
            </Button>

            <Button type="submit" disabled={isPending}>
              Enviar
            </Button>
          </ButtonGroup>
        </Modal.Actions>
      </form>
    </Modal.Root>
  )
}

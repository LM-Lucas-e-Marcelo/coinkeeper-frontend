'use client'

import { ButtonGroup } from '@/components/form/button-group'
import { Modal } from '../modal'
import { Button } from '@/components/form/button'
import { toast } from 'react-toastify'
import { useUrlParams } from '@/hooks/use-params'
import { useFormState } from '@/hooks/use-form-state'
import { Dispatch, SetStateAction, useMemo } from 'react'
import { ICharge } from '@/http/get-charges'
import { EmptyState } from '@/components/empty-state'
import { parcelsNotPaidAction } from '@/actions/transactions/parcels-not-paid-action'

interface ParcelsNotPaidModalProps {
  customers: ICharge[]
  selectedCustomers: number[]
  setSelectedCustomers: Dispatch<SetStateAction<number[]>>
}

export const ParcelsNotPaidModal = ({
  customers,
  selectedCustomers,
  setSelectedCustomers,
}: ParcelsNotPaidModalProps) => {
  const { removeParams, params } = useUrlParams()
  const isOpen = params.has('parcels_not_paid')

  const handleCloseModal = () => {
    removeParams(['parcels_not_paid'])
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
    action: parcelsNotPaidAction,
    onError,
    onSuccess,
    payload: selectedCustomers,
  })

  const filterSelectedCustomers = useMemo(
    () =>
      customers.filter((customer) => selectedCustomers.includes(customer.id)),
    [customers, selectedCustomers],
  )

  return (
    <Modal.Root size="lg" isOpen={isOpen} onClose={handleCloseModal}>
      <Modal.Header>Não Pagaram</Modal.Header>
      <form onSubmit={handleSubmit}>
        <Modal.Content>
          <div className="border border-zinc-200 bg-zinc-50 p-3 flex-1 rounded-md flex flex-col gap-3  max-h-[70vh] overflow-auto">
            {!!selectedCustomers.length && (
              <p className="text-xl">Clientes Selecionados</p>
            )}

            {filterSelectedCustomers?.length ? (
              filterSelectedCustomers.map((customer) => (
                <button
                  className="flex border border-primary bg-white px-2 py-2 rounded-md"
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
              Salvar
            </Button>
          </ButtonGroup>
        </Modal.Actions>
      </form>
    </Modal.Root>
  )
}

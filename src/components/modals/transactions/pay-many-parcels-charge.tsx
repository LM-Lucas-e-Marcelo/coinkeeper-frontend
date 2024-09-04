'use client'

import { ButtonGroup } from '@/components/form/button-group'
import { Modal } from '../modal'
import { Button } from '@/components/form/button'
import { toast } from 'react-toastify'
import { useUrlParams } from '@/hooks/use-params'
import { useFormState } from '@/hooks/use-form-state'
import { Dispatch, SetStateAction, useMemo, useState } from 'react'
import { payManyParcelAction } from '@/actions/transactions/pay-many-parcel-action'
import { ICharge } from '@/http/get-charges'
import { EmptyState } from '@/components/empty-state'

interface PayManyParcelsChargeProps {
  customers: ICharge[]
  selectedCustomers: number[]
  setSelectedCustomers: Dispatch<SetStateAction<number[]>>
}

export const PayManyParcelsCharge = ({
  customers,
  selectedCustomers,
  setSelectedCustomers,
}: PayManyParcelsChargeProps) => {
  const [customerParcelValues, setCustomerParcelValues] = useState<
    Record<number, number>
  >({})
  const { removeParams, params } = useUrlParams()
  const isOpen = params.has('pay_many_parcels_charge')

  const handleCloseModal = () => {
    removeParams(['pay_many_parcels_charge'])
    setCustomerParcelValues({})
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
    action: payManyParcelAction,
    onError,
    onSuccess,
    payload: customerParcelValues,
  })

  const filterSelectedCustomers = useMemo(
    () =>
      customers.filter((customer) => selectedCustomers.includes(customer.id)),
    [customers, selectedCustomers],
  )

  const handleChange = (customerId: number, value: number) => {
    setCustomerParcelValues((prevState) => ({
      ...prevState,
      [customerId]: value,
    }))
  }

  return (
    <Modal.Root size="lg" isOpen={isOpen} onClose={handleCloseModal}>
      <Modal.Header>Pagar parcelas</Modal.Header>
      <form onSubmit={handleSubmit}>
        <Modal.Content>
          <div className="border border-zinc-200 bg-zinc-50 p-3 flex-1 rounded-md flex flex-col gap-3  max-h-[70vh] overflow-auto">
            {!!selectedCustomers.length && (
              <p className="text-xl">Clientes Selecionados</p>
            )}

            {filterSelectedCustomers?.length ? (
              filterSelectedCustomers.map((customer) => (
                <button
                  className="flex justify-between items-center border border-primary bg-white px-2 py-2 rounded-md"
                  key={customer.id}
                  type="button"
                >
                  <p>{customer.name}</p>
                  <input
                    type="number"
                    defaultValue={1}
                    className="w-[50px] border border-primary rounded-md px-2 py-1 text-center"
                    min={1}
                    onChange={(e) =>
                      handleChange(customer.id, parseInt(e.target.value))
                    }
                  />
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
              Pagar parcela
            </Button>
          </ButtonGroup>
        </Modal.Actions>
      </form>
    </Modal.Root>
  )
}

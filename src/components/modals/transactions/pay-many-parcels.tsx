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
import { payManyParcelAction } from '@/actions/transactions/pay-many-parcel-action'
import { Input } from '@/components/form/input'
import { FiX } from '@/assets/icons'

interface PayManyParcelsProps {
  customers: ICustomerWithDebt[]
}

export const PayManyParcels = ({ customers }: PayManyParcelsProps) => {
  const [customerFilter, setCustomerFilter] = useState('')
  const [selectedCustomers, setSelectedCustomers] = useState<number[]>([])
  const [customerParcelValues, setCustomerParcelValues] = useState<
    Record<number, number>
  >({})
  const { removeParams, params } = useUrlParams()
  const isOpen = params.has('pay_many_parcels')

  const handleCloseModal = () => {
    removeParams(['pay_many_parcels'])
    setSelectedCustomers([])
    setCustomerParcelValues({})
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
    setCustomerParcelValues((prevState) => ({
      ...prevState,
      [customerId]: 1,
    }))
  }, [])

  const handleRemoveCustomer = useCallback((customerId: number) => {
    setSelectedCustomers((prevState) => [
      ...prevState.filter((id) => id !== customerId),
    ])

    setCustomerParcelValues((prevState) => {
      const updatedValues = { ...prevState }
      delete updatedValues[customerId]
      return updatedValues
    })
  }, [])

  const handleChange = (customerId: number, value: number) => {
    setCustomerParcelValues((prevState) => ({
      ...prevState,
      [customerId]: value,
    }))
  }

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
      <Modal.Header>Pagar parcelas</Modal.Header>
      <form onSubmit={handleSubmit}>
        <Modal.Content>
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
                  <div className="flex gap-3 items-center">
                    <input
                      type="number"
                      defaultValue={1}
                      className="w-[50px] border border-primary rounded-md px-2 text-center"
                      min={1}
                      onChange={(e) =>
                        handleChange(customer.id, parseInt(e.target.value))
                      }
                    />
                    <button
                      type="button"
                      className="text-red"
                      onClick={() => handleRemoveCustomer(customer.id)}
                    >
                      <FiX size={20} />
                    </button>
                  </div>
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
              Pagar parcela
            </Button>
          </ButtonGroup>
        </Modal.Actions>
      </form>
    </Modal.Root>
  )
}

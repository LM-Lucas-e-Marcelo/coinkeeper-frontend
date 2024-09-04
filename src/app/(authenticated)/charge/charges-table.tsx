'use client'

import { Table } from '@/components/table'
import { formatCurrency } from '@/utils/format-currency'
import { ICharge } from '@/http/get-charges'
import { Checkbox } from '@/components/form/checkbox'
import { FormEvent, useCallback, useState } from 'react'
import { SendWhatsappCharge } from '@/components/modals/whatsapp/send-whatsapp-charge'
import { IStatus } from '@/http/whatsapp/get-bot-status'
import { PayManyParcelsCharge } from '@/components/modals/transactions/pay-many-parcels-charge'
import { EmptyState } from '@/components/empty-state'

interface ChargesTableProps {
  customers: ICharge[]
  status: IStatus
}

export function ChargesTable({ customers, status }: ChargesTableProps) {
  const [selectedCustomers, setSelectedCustomers] = useState<number[]>([])

  const handleChange = useCallback((event: FormEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget

    setSelectedCustomers((prevState) =>
      prevState?.includes(+value)
        ? prevState.filter((prev) => prev !== +value)
        : [...prevState, +value],
    )
  }, [])

  return (
    <>
      <Table.Root>
        <Table.Head>
          <Table.Row>
            <Table.Cell isCheck>Selecionar</Table.Cell>
            <Table.Cell>Nome</Table.Cell>
            <Table.Cell>Parcela Atual</Table.Cell>
            <Table.Cell>Total de Parcelas</Table.Cell>
            <Table.Cell sortBy="customers.total_debt">Débito total</Table.Cell>
          </Table.Row>
        </Table.Head>
        {customers.length && (
          <Table.Body>
            {customers?.map((customer) => (
              <Table.Row key={customer.id}>
                <Table.Cell isCheck>
                  <Checkbox
                    value={customer.id}
                    onChange={handleChange}
                    checked={selectedCustomers.includes(customer.id)}
                  />
                </Table.Cell>
                <Table.Cell>{customer.name}</Table.Cell>
                <Table.Cell>{formatCurrency(customer.parcelActual)}</Table.Cell>
                <Table.Cell>{customer.totalParcels}</Table.Cell>
                <Table.Cell>{formatCurrency(customer.totalDebt)}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        )}
      </Table.Root>
      {!customers?.length && (
        <EmptyState message="Não há dados para ser exibido." />
      )}
      <SendWhatsappCharge
        customers={customers}
        selectedCustomers={selectedCustomers}
        status={status}
        setSelectedCustomers={setSelectedCustomers}
      />
      <PayManyParcelsCharge
        customers={customers}
        selectedCustomers={selectedCustomers}
        setSelectedCustomers={setSelectedCustomers}
      />
    </>
  )
}

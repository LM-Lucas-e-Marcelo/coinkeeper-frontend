'use client'

import { ButtonGroup } from '@/components/form/button-group'
import { Modal } from '../modal'
import { Button } from '@/components/form/button'
import { Input } from '@/components/form/input'
import { toast } from 'react-toastify'
import { useCallback } from 'react'
import { useUrlParams } from '@/hooks/use-params'
import { useFormState } from '@/hooks/use-form-state'
import { Select } from '@/components/form/select'
import { Textarea } from '@/components/form/textarea'
import { createTransactionAction } from '@/actions/transactions/create-transaction-action'
import { CustomerDetailsPageProps } from '@/app/(authenticated)/customers/[id]/page'

export const CreateTransactionModal = ({
  params: customerParams,
}: CustomerDetailsPageProps) => {
  const { removeParams, params } = useUrlParams()
  const isOpen = params.has('create_transaction')

  const handleCloseModal = useCallback(() => {
    removeParams(['create_transaction'])
  }, [removeParams])

  const onSuccess = (message: string | null) => {
    toast(message, { type: 'success' })
    handleCloseModal()
  }
  const onError = (message: string | null) => {
    toast(message, { type: 'error' })
  }

  const [{ errors }, handleSubmit, isPending] = useFormState({
    action: createTransactionAction,
    onError,
    onSuccess,
  })

  const parcelsQuantity = Array.from({ length: 24 })
  const parcelOptions = parcelsQuantity.map((_, index) => ({
    label: index + 1,
    value: index + 1,
  }))

  return (
    <Modal.Root isOpen={isOpen} onClose={handleCloseModal}>
      <Modal.Header>Cadastrar empréstimo</Modal.Header>
      <form onSubmit={handleSubmit}>
        <Modal.Content>
          <div className="flex gap-3 flex-col">
            <Input
              name="customerId"
              type="hidden"
              defaultValue={customerParams?.id}
            />
            <Input
              label="Primeira parcela"
              name="firstDueDate"
              type="date"
              defaultValue={new Date().toISOString().split('T')[0]}
              error={errors?.firstDueDate}
            />

            <Input
              label="Data para pagamento"
              name="paymentDate"
              type="date"
              error={errors?.paymentDate}
            />
            <div className="flex gap-3">
              <Select
                label="Total de parcelas"
                name="totalParcels"
                options={parcelOptions}
                error={errors?.totalParcels}
              />
              <Input label="Valor" name="value" error={errors?.value} />
            </div>

            <Input
              label="Intervalo em dias entre os pagamentos"
              name="differenceBetweenParcels"
              error={errors?.differenceBetweenParcels}
            />
            <Textarea
              label="Descrição"
              name="description"
              error={errors?.description}
            />
          </div>
        </Modal.Content>
        <Modal.Actions>
          <ButtonGroup>
            <Button type="button" onClick={handleCloseModal} variant="danger">
              Fechar
            </Button>

            <Button type="submit" disabled={isPending}>
              Cadastrar
            </Button>
          </ButtonGroup>
        </Modal.Actions>
      </form>
    </Modal.Root>
  )
}

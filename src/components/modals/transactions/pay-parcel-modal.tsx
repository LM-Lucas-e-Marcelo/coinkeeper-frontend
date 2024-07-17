'use client'

import { ButtonGroup } from '@/components/form/button-group'
import { Modal } from '../modal'
import { Button } from '@/components/form/button'
import { Input } from '@/components/form/input'
import { toast } from 'react-toastify'
import { useUrlParams } from '@/hooks/use-params'
import { useFormState } from '@/hooks/use-form-state'
import { Textarea } from '@/components/form/textarea'
import { payParcelAction } from '@/actions/transactions/pay-parcel-action'

export const PayParcelModal = () => {
  const { removeParams, params } = useUrlParams()
  const isOpen = params.has('pay_parcel')
  const parcelId = params.get('parcel')
  const parcelNumber = params.get('parcel_number')
  const transactionId = params.get('transaction_id')

  const handleCloseModal = () =>
    removeParams(['pay_parcel', 'parcel', 'parcel_number', 'transaction_id'])

  const onSuccess = (message: string | null) => {
    toast(message, { type: 'success' })
    handleCloseModal()
  }
  const onError = (message: string | null) => {
    toast(message, { type: 'error' })
  }
  const [{ errors }, handleSubmit, isPending] = useFormState({
    action: payParcelAction,
    onError,
    onSuccess,
  })

  if (!parcelId || !transactionId) return

  return (
    <Modal.Root isOpen={isOpen} onClose={handleCloseModal}>
      <Modal.Header>Pagar parcela {parcelNumber}</Modal.Header>
      <form onSubmit={handleSubmit}>
        <Modal.Content>
          <div className="flex gap-3 flex-col">
            <Input
              label="Data do pagamento"
              name="paymentDate"
              type="date"
              defaultValue={new Date().toISOString().split('T')[0]}
              error={errors?.paymentDate}
            />

            <Textarea label="Observação" name="observation" />
            <Input name="id" type="hidden" defaultValue={parcelId} />
            <Input
              name="transactionId"
              type="hidden"
              defaultValue={transactionId}
            />
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

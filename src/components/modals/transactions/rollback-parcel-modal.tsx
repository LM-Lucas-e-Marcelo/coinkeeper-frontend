'use client'

import { ButtonGroup } from '@/components/form/button-group'
import { Modal } from '../modal'
import { Button } from '@/components/form/button'
import { Input } from '@/components/form/input'
import { toast } from 'react-toastify'
import { useUrlParams } from '@/hooks/use-params'
import { useFormState } from '@/hooks/use-form-state'
import { rollbackParcelAction } from '@/actions/transactions/rollback-parcel-action'

export const RollbackParcelModal = () => {
  const { removeParams, params } = useUrlParams()
  const isOpen = params.has('rollback_parcel')
  const parcelId = params.get('parcel')
  const parcelNumber = params.get('parcel_number')
  const transactionId = params.get('transaction_id')

  const handleCloseModal = () =>
    removeParams(['rollback_parcel', 'parcel', 'parcel_number'])

  const onSuccess = (message: string | null) => {
    toast(message, { type: 'success' })
    handleCloseModal()
  }
  const onError = (message: string | null) => {
    toast(message, { type: 'error' })
  }
  const [, handleSubmit, isPending] = useFormState({
    action: rollbackParcelAction,
    onError,
    onSuccess,
  })

  if (!parcelId || !transactionId) return

  return (
    <Modal.Root isOpen={isOpen} onClose={handleCloseModal}>
      <Modal.Header>Cancelar pagamento da parcela {parcelNumber}</Modal.Header>
      <form onSubmit={handleSubmit}>
        <Modal.Content>
          Você tem certeza de que quer cancelar o pagamento da parcela{' '}
          {parcelNumber}?
          <Input name="id" type="hidden" defaultValue={parcelId} />
          <Input
            name="transactionId"
            type="hidden"
            defaultValue={transactionId}
          />
        </Modal.Content>
        <Modal.Actions>
          <ButtonGroup>
            <Button type="button" onClick={handleCloseModal}>
              Fechar
            </Button>

            <Button type="submit" disabled={isPending} variant="danger">
              Cancelar pagamento
            </Button>
          </ButtonGroup>
        </Modal.Actions>
      </form>
    </Modal.Root>
  )
}

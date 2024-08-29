'use client'

import { ButtonGroup } from '@/components/form/button-group'
import { Modal } from '../modal'
import { Button } from '@/components/form/button'
import { Input } from '@/components/form/input'
import { toast } from 'react-toastify'
import { useUrlParams } from '@/hooks/use-params'
import { useFormState } from '@/hooks/use-form-state'
import { ITransactions } from '@/http/transactions/get-transactions'
import { formatCurrency } from '@/utils/format-currency'
import { payOffTransactionAction } from '@/actions/transactions/pay-off-transaction.action'

interface PayOffTransactionModalProps {
  transaction: ITransactions
}

export const PayOffTransactionModal = ({
  transaction,
}: PayOffTransactionModalProps) => {
  const { removeParams, params } = useUrlParams()
  const isOpen = params.has(`pay_off_transaction_${transaction.id}`)

  const handleCloseModal = () =>
    removeParams([`pay_off_transaction_${transaction.id}`])

  const onSuccess = (message: string | null) => {
    toast(message, { type: 'success' })
    handleCloseModal()
  }
  const onError = (message: string | null) => {
    toast(message, { type: 'error' })
  }
  const [{ errors }, handleSubmit, isPending] = useFormState({
    action: payOffTransactionAction,
    onError,
    onSuccess,
  })

  return (
    <Modal.Root isOpen={isOpen} onClose={handleCloseModal}>
      <Modal.Header>Quitação de dívida</Modal.Header>
      <form onSubmit={handleSubmit}>
        <Modal.Content>
          <div className="flex gap-3 flex-col">
            Você tem certeza de que quer efetuar o pagamento total desta
            transação?
            <div>
              <p>Valor: {formatCurrency(transaction.value)}</p>
              <p>Valor ja pago: {formatCurrency(transaction.valuePaid)}</p>
              <p>
                Parcelas restantes:{' '}
                {transaction.totalParcels - transaction.totalParcelsPaid}
              </p>
            </div>
            <Input
              name="transactionId"
              type="hidden"
              defaultValue={transaction.id}
              error={errors?.transactionId}
            />
          </div>
        </Modal.Content>
        <Modal.Actions>
          <ButtonGroup>
            <Button type="button" onClick={handleCloseModal} variant="danger">
              Fechar
            </Button>

            <Button type="submit" disabled={isPending}>
              Quitar transação
            </Button>
          </ButtonGroup>
        </Modal.Actions>
      </form>
    </Modal.Root>
  )
}

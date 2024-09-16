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

interface FinancialLossProps {
  transaction: ITransactions
}

export const FinancialLossModal = ({ transaction }: FinancialLossProps) => {
  const { removeParams, params } = useUrlParams()
  const isOpen = params.has(`financial_loss_${transaction.id}`)

  const handleCloseModal = () =>
    removeParams([`financial_loss_${transaction.id}`])

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
      <Modal.Header>Marcar como prejuízo</Modal.Header>
      <form onSubmit={handleSubmit}>
        <Modal.Content>
          <div className="flex gap-3 flex-col">
            Você tem certeza de que quer marcar esta transação como prejuízo?
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
              Marcar como prejuízo
            </Button>
          </ButtonGroup>
        </Modal.Actions>
      </form>
    </Modal.Root>
  )
}

'use client'

import { ButtonGroup } from '@/components/form/button-group'
import { Modal } from '../modal'
import { Button } from '@/components/form/button'
import { Input } from '@/components/form/input'
import { toast } from 'react-toastify'
import { useCallback, useEffect, useState } from 'react'
import { useUrlParams } from '@/hooks/use-params'
import { useFormState } from '@/hooks/use-form-state'
import { Textarea } from '@/components/form/textarea'
import { createExpenseTransactionAction } from '@/actions/expenses/create-expense-transaction-action'
import { IExpenseTransaction } from '@/http/expenses/get-expense-by-id'
import { updateExpenseTransactionAction } from '@/actions/expenses/update-expense-transaction-action'

interface ManagementExpenseTransactionModalProps {
  id: string
  transactions: IExpenseTransaction[]
}

export const ManagementExpenseTransactionModal = ({
  id,
  transactions,
}: ManagementExpenseTransactionModalProps) => {
  const [selectedTransaction, setSelectedTransaction] =
    useState<IExpenseTransaction | null>()
  const { removeParams, params } = useUrlParams()
  const isOpen = params.has('management_expense_transaction')
  const transactionId = params.get('transaction')

  const handleCloseModal = useCallback(() => {
    removeParams(['management_expense_transaction', 'transaction'])
    setSelectedTransaction(null)
  }, [removeParams])

  const onSuccess = (message: string | null) => {
    toast(message, { type: 'success' })
    handleCloseModal()
  }
  const onError = (message: string | null) => {
    toast(message, { type: 'error' })
  }

  const [{ errors }, handleSubmit, isPending] = useFormState({
    action: transactionId
      ? updateExpenseTransactionAction
      : createExpenseTransactionAction,
    onError,
    onSuccess,
  })

  useEffect(() => {
    if (transactionId && isOpen) {
      const transaction = transactions.find(
        (transaction) => transaction.id === +transactionId,
      )

      if (!transaction) {
        return handleCloseModal()
      }

      setSelectedTransaction(transaction)
    }
  }, [handleCloseModal, isOpen, transactionId, transactions])

  if (transactionId && !selectedTransaction) return

  return (
    <Modal.Root isOpen={isOpen} onClose={handleCloseModal}>
      <Modal.Header>
        {transactionId ? 'Editar' : 'Cadastrar'} depesa
      </Modal.Header>
      <form onSubmit={handleSubmit}>
        <Modal.Content>
          <div className="flex gap-3 flex-col">
            {transactionId ? (
              <Input
                name="transactionId"
                type="hidden"
                defaultValue={transactionId!}
              />
            ) : (
              <Input name="expenseId" type="hidden" defaultValue={id} />
            )}
            <div className="flex gap-3">
              <Input
                label="Data de vencimento"
                name="dueDate"
                type="date"
                defaultValue={selectedTransaction?.dueDate}
                error={errors?.dueDate}
              />

              <Input
                label="Data do pagamento"
                name="paymentDate"
                type="date"
                defaultValue={selectedTransaction?.paymentDate}
                error={errors?.paymentDate}
              />
            </div>

            <Input
              label="Valor"
              name="value"
              type="number"
              defaultValue={selectedTransaction?.value}
              error={errors?.value}
            />

            <Textarea
              label="Descrição"
              name="description"
              defaultValue={selectedTransaction?.description}
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
              {transactionId ? 'Editar' : 'Cadastrar'} depesa
            </Button>
          </ButtonGroup>
        </Modal.Actions>
      </form>
    </Modal.Root>
  )
}

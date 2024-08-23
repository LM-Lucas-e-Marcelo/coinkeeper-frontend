'use client'

import { ButtonGroup } from '@/components/form/button-group'
import { Modal } from '../modal'
import { Button } from '@/components/form/button'
import { Input } from '@/components/form/input'
import { toast } from 'react-toastify'
import { useCallback } from 'react'
import { useUrlParams } from '@/hooks/use-params'
import { useFormState } from '@/hooks/use-form-state'
import { Message } from '@/components/message'
import { deleteTransactionAction } from '@/actions/transactions/delete-transaction-action'

export const DeleteExpenseTransactionModal = () => {
  const { removeParams, params } = useUrlParams()
  const isOpen = params.has('delete_expense_transaction')
  const transactionId = params.get('transaction')

  const handleCloseModal = useCallback(() => {
    removeParams(['delete_expense_transaction', 'transaction'])
  }, [removeParams])

  const onSuccess = (message: string | null) => {
    toast(message, { type: 'success' })
    handleCloseModal()
  }
  const onError = (message: string | null) => {
    toast(message, { type: 'error' })
  }

  const [{ errors }, handleSubmit, isPending] = useFormState({
    action: deleteTransactionAction,
    onError,
    onSuccess,
  })

  if (!transactionId) return

  return (
    <Modal.Root isOpen={isOpen} onClose={handleCloseModal}>
      <Modal.Header>Excluir transação</Modal.Header>
      <form onSubmit={handleSubmit}>
        <Modal.Content>
          <div className="flex flex-col gap-4">
            Você tem certeza de que quer excluir esta transação?
            <Message
              title="Cuidado!"
              message="Esta ação não poderá ser revertida, a transação será excluida
          permanentemente"
            />
          </div>
          <Input
            type="hidden"
            defaultValue={transactionId}
            name="id"
            error={errors?.id}
          />
        </Modal.Content>
        <Modal.Actions>
          <ButtonGroup>
            <Button onClick={handleCloseModal} type="button">
              Fechar
            </Button>
            <Button variant="danger" disabled={isPending}>
              Excluir assim mesmo
            </Button>
          </ButtonGroup>
        </Modal.Actions>
      </form>
    </Modal.Root>
  )
}

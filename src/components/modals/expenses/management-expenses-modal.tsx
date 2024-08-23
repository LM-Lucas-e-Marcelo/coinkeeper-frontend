'use client'

import { ButtonGroup } from '@/components/form/button-group'
import { Modal } from '../modal'
import { Button } from '@/components/form/button'
import { Input } from '@/components/form/input'
import { toast } from 'react-toastify'
import { useCallback, useEffect } from 'react'
import { useUrlParams } from '@/hooks/use-params'
import { useFormState } from '@/hooks/use-form-state'
import { IOrganizationExpense } from '@/http/expenses/get-expenses'
import { createExpenseAction } from '@/actions/expenses/create-expense-action'
import { updateExpenseAction } from '@/actions/expenses/update-expense-action'

interface ManagementExpensesModalProps {
  expense?: IOrganizationExpense | null
}

export const ManagementExpenseModal = ({
  expense,
}: ManagementExpensesModalProps) => {
  const { removeParams, params } = useUrlParams()
  const isOpen = params.has('management_expense')
  const isUpdate = params.has('update')

  const handleCloseModal = useCallback(() => {
    removeParams(['management_expense', 'update'])
  }, [removeParams])

  const onSuccess = (message: string | null) => {
    toast(message, { type: 'success' })
    handleCloseModal()
  }
  const onError = (message: string | null) => {
    toast(message, { type: 'error' })
  }

  const [{ errors }, handleSubmit, isPending] = useFormState({
    action: isUpdate ? updateExpenseAction : createExpenseAction,
    onError,
    onSuccess,
  })

  useEffect(() => {
    if (isUpdate && isOpen) {
      if (!expense) {
        return handleCloseModal()
      }
    }
  }, [expense, handleCloseModal, isOpen, isUpdate])

  if (isUpdate && !expense) return

  return (
    <Modal.Root isOpen={isOpen} onClose={handleCloseModal}>
      <Modal.Header>{isUpdate ? 'Editar' : 'Cadastrar'} Despesa</Modal.Header>
      <form onSubmit={handleSubmit}>
        <Modal.Content>
          {isUpdate && (
            <Input name="id" defaultValue={expense?.id} type="hidden" />
          )}
          <Input
            label="Nome"
            name="name"
            error={errors?.name}
            defaultValue={expense?.name}
          />
        </Modal.Content>
        <Modal.Actions>
          <ButtonGroup>
            <Button type="button" onClick={handleCloseModal} variant="danger">
              Fechar
            </Button>

            <Button type="submit" disabled={isPending}>
              {isUpdate ? 'Editar' : 'Cadastrar '}
            </Button>
          </ButtonGroup>
        </Modal.Actions>
      </form>
    </Modal.Root>
  )
}

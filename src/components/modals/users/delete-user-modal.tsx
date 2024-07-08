'use client'

import { ButtonGroup } from '@/components/form/button-group'
import { Modal } from '../modal'
import { Button } from '@/components/form/button'
import { Message } from '@/components/message'
import { useCallback } from 'react'
import { deleteUserAction } from '@/actions/users/delete-user-action'
import { toast } from 'react-toastify'
import { useUrlParams } from '@/hooks/use-params'
import { useFormState } from '@/hooks/use-form-state'
import { Input } from '@/components/form/input'

export const DeleteUserModal = () => {
  const { removeParams, params } = useUrlParams()

  const isOpen = params.has('delete_user')
  const userName = params.get('name')
  const userId = params.get('user')

  const handleCloseModal = useCallback(
    (): void => removeParams(['delete_user', 'name', 'user']),
    [removeParams],
  )

  const onSuccess = (message: string | null) => {
    toast(message, { type: 'success' })
    handleCloseModal()
  }

  const onError = (message: string | null) => {
    toast(message, { type: 'error' })
  }

  const [{ errors }, handleSubmit, isPending] = useFormState({
    action: deleteUserAction,
    onError,
    onSuccess,
  })

  if (!userId) return

  return (
    <Modal.Root isOpen={isOpen} onClose={handleCloseModal}>
      <Modal.Header>Excluir usuário</Modal.Header>
      <form onSubmit={handleSubmit}>
        <Modal.Content>
          <div className="flex flex-col gap-4">
            Você tem certeza de que quer excluir o usuário {userName}?
            <Message
              title="Cuidado!"
              message="Esta ação não poderá ser revertida, o usuário será excluido
          permanentemente"
            />
          </div>
          <Input
            type="hidden"
            defaultValue={userId}
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

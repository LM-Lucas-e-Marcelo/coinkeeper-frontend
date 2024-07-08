'use client'

import { ButtonGroup } from '@/components/form/button-group'
import { Modal } from '../modal'
import { Button } from '@/components/form/button'
import { Input } from '@/components/form/input'
import { toast } from 'react-toastify'
import { useCallback, useEffect, useState } from 'react'
import { useUrlParams } from '@/hooks/use-params'
import { useFormState } from '@/hooks/use-form-state'
import { updateUserAction } from '@/actions/users/update-user-action'
import { IUser, IUsers } from '@/http/users/get-users'

interface UpdateUserModalProps {
  users: IUsers
}

export const UpdateUserModal = ({ users }: UpdateUserModalProps) => {
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null)
  const { removeParams, params } = useUrlParams()
  const isOpen = params.has('update_user')
  const userId = params.get('user')

  const handleCloseModal = useCallback(() => {
    removeParams(['update_user', 'user'])
    setSelectedUser(null)
  }, [removeParams])

  const onSuccess = (message: string | null) => {
    toast(message, { type: 'success' })
    handleCloseModal()
  }
  const onError = (message: string | null) => {
    toast(message, { type: 'error' })
  }

  const [{ errors }, handleSubmit, isPending] = useFormState({
    action: updateUserAction,
    onError,
    onSuccess,
  })

  useEffect(() => {
    if (userId && isOpen) {
      const user = users?.items.find((user) => user.id === +userId)

      if (!user) {
        return handleCloseModal()
      }

      setSelectedUser(user)
    }
  }, [handleCloseModal, isOpen, userId, users])

  if (!selectedUser) return

  return (
    <Modal.Root isOpen={isOpen} onClose={handleCloseModal}>
      <Modal.Header>Editar Usuário</Modal.Header>
      <form onSubmit={handleSubmit}>
        <Modal.Content>
          <div className="flex gap-3 flex-col">
            <Input
              label="Nome"
              name="name"
              error={errors?.name}
              defaultValue={selectedUser?.name}
            />
            <Input
              label="Usuário"
              name="username"
              error={errors?.username}
              defaultValue={selectedUser?.username}
            />
            <Input
              label="Senha"
              name="password"
              type="password"
              error={errors?.password}
            />

            <Input name="id" type="hidden" defaultValue={selectedUser.id} />
          </div>
        </Modal.Content>
        <Modal.Actions>
          <ButtonGroup>
            <Button type="button" onClick={handleCloseModal} variant="danger">
              Fechar
            </Button>

            <Button type="submit" disabled={isPending}>
              Editar
            </Button>
          </ButtonGroup>
        </Modal.Actions>
      </form>
    </Modal.Root>
  )
}

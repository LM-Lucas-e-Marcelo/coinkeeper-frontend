'use client'

import { ButtonGroup } from '@/components/form/button-group'
import { Modal } from '../modal'
import { Button } from '@/components/form/button'
import { Input } from '@/components/form/input'
import { toast } from 'react-toastify'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useUrlParams } from '@/hooks/use-params'
import { useFormState } from '@/hooks/use-form-state'
import { updateUserAction } from '@/actions/users/update-user-action'
import { IUser, IUsers } from '@/http/users/get-users'
import { IRoles } from '@/http/roles/get-roles'
import { Select } from '@/components/form/select'
import { createUserAction } from '@/actions/users/create-user-action'

interface UpdateUserModalProps {
  users: IUsers
  roles: IRoles
}

export const ManagementUserModal = ({ users, roles }: UpdateUserModalProps) => {
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null)
  const { removeParams, params } = useUrlParams()
  const isOpen = params.has('management_user')
  const userId = params.get('user')

  const rolesOptions = useMemo(
    () =>
      roles.items.map((role) => ({
        label: role.name,
        value: role.id,
      })),
    [roles.items],
  )

  const handleCloseModal = useCallback(() => {
    removeParams(['management_user', 'user'])
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
    action: userId ? updateUserAction : createUserAction,
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

  if (userId && !selectedUser) return

  return (
    <Modal.Root isOpen={isOpen} onClose={handleCloseModal}>
      <Modal.Header>{userId ? 'Editar' : 'Cadastrar'} Usuário</Modal.Header>
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

            <Select label="Grupo" name="roleId" options={rolesOptions} />
            <Input
              label="Senha"
              name="password"
              type="password"
              error={errors?.password}
            />

            <Input name="id" type="hidden" defaultValue={selectedUser?.id} />
          </div>
        </Modal.Content>
        <Modal.Actions>
          <ButtonGroup>
            <Button type="button" onClick={handleCloseModal} variant="danger">
              Fechar
            </Button>

            <Button type="submit" disabled={isPending}>
              {userId ? 'Editar' : 'Criar'}
            </Button>
          </ButtonGroup>
        </Modal.Actions>
      </form>
    </Modal.Root>
  )
}

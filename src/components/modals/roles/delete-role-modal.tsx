'use client'

import { ButtonGroup } from '@/components/form/button-group'
import { Modal } from '../modal'
import { Button } from '@/components/form/button'
import { Message } from '@/components/message'
import { useCallback } from 'react'
import { toast } from 'react-toastify'
import { useUrlParams } from '@/hooks/use-params'
import { deleteRoleAction } from '@/actions/roles/delete-role-action'
import { useFormState } from '@/hooks/use-form-state'
import { Input } from '@/components/form/input'

export const DeleteRoleModal = () => {
  const { removeParams, params } = useUrlParams()

  const isOpen = params.has('delete_role')
  const roleName = params.get('name')
  const roleId = params.get('role')

  const handleCloseModal = useCallback(
    (): void => removeParams(['delete_role', 'name', 'role']),
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
    action: deleteRoleAction,
    onError,
    onSuccess,
  })

  if (!roleId) return

  return (
    <Modal.Root isOpen={isOpen} onClose={handleCloseModal}>
      <Modal.Header>Excluir Grupo</Modal.Header>

      <form onSubmit={handleSubmit}>
        <Modal.Content>
          <div className="flex flex-col gap-4">
            Você tem certeza de que quer excluir o grupo {roleName}?
            <Message
              title="Cuidado!"
              message="Esta ação não poderá ser revertida, o usuário será excluido
          permanentemente"
            />
          </div>
          <Input
            type="hidden"
            defaultValue={roleId}
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

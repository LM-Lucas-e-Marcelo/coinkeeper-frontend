'use client'

import { ButtonGroup } from '@/components/form/button-group'
import { Modal } from '../modal'
import { Button } from '@/components/form/button'
import { Message } from '@/components/message'
import { useCallback, useState } from 'react'
import { Status } from '@/constants/status'
import { toast } from 'react-toastify'
import { useUrlParams } from '@/hooks/useParams'
import { deleteRole } from '@/actions/roles/delete-role-action'

export const DeleteRoleModal = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { removeParams, params } = useUrlParams()

  const isOpen = params.has('delete_role')
  const roleName = params.get('name')
  const roleId = params.get('role')

  const handleCloseModal = useCallback(
    (): void => removeParams(['delete_role', 'name', 'role']),
    [removeParams],
  )

  const handleDeleteRole = useCallback(async (): Promise<void | null> => {
    setIsLoading(true)
    const { Success } = Status
    const response = await deleteRole({ id: roleId })

    if (response.status !== Success) {
      toast(response.message, { type: 'error' })
      return null
    }

    toast(response.message, { type: 'success' })
    handleCloseModal()
    setIsLoading(false)
  }, [handleCloseModal, roleId])

  return (
    <Modal.Root isOpen={isOpen} onClose={handleCloseModal}>
      <Modal.Header>Excluir Grupo</Modal.Header>

      <Modal.Content>
        <div className="flex flex-col gap-4">
          Você tem certeza de que quer excluir o grupo {roleName}?
          <Message
            title="Cuidado!"
            message="Esta ação não poderá ser revertida, o usuário será excluido
          permanentemente"
          />
        </div>
      </Modal.Content>
      <Modal.Actions>
        <ButtonGroup>
          <Button onClick={handleCloseModal} type="button">
            Fechar
          </Button>
          <Button
            onClick={handleDeleteRole}
            variant="danger"
            type="button"
            disabled={isLoading}
          >
            Excluir assim mesmo
          </Button>
        </ButtonGroup>
      </Modal.Actions>
    </Modal.Root>
  )
}

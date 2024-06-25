'use client'

import { ButtonGroup } from '@/components/form/button-group'
import { Modal } from '../modal'
import { Button } from '@/components/form/button'
import { Message } from '@/components/message'
import { useCallback, useState } from 'react'
import { deleteUser } from '@/actions/users/delete-user-action'
import { Status } from '@/constants/status'
import { toast } from 'react-toastify'
import { useUrlParams } from '@/hooks/use-params'

export const DeleteUserModal = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { removeParams, params } = useUrlParams()

  const isOpen = params.has('delete_user')
  const userName = params.get('name')
  const userId = params.get('user')

  const handleCloseModal = useCallback(
    (): void => removeParams(['delete_user', 'name', 'user']),
    [removeParams],
  )

  const handleDeleteUser = useCallback(async (): Promise<void | null> => {
    setIsLoading(true)
    const { Success } = Status
    const response = await deleteUser({ id: userId })

    if (response.status !== Success) {
      toast(response.message, { type: 'error' })
      return null
    }

    toast(response.message, { type: 'success' })
    handleCloseModal()
    setIsLoading(false)
  }, [handleCloseModal, userId])

  return (
    <Modal.Root isOpen={isOpen} onClose={handleCloseModal}>
      <Modal.Header>Excluir usuário</Modal.Header>

      <Modal.Content>
        <div className="flex flex-col gap-4">
          Você tem certeza de que quer excluir o usuário {userName}?
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
            onClick={handleDeleteUser}
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

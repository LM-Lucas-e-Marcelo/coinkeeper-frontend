'use client'

import { ButtonGroup } from '@/components/form/button-group'
import { Modal } from '../modal'
import { Button } from '@/components/form/button'
import { Message } from '@/components/message'
import { useCallback } from 'react'
import { toast } from 'react-toastify'
import { useUrlParams } from '@/hooks/use-params'
import { useFormState } from '@/hooks/use-form-state'
import { Input } from '@/components/form/input'
import { deleteCustomerDocumentAction } from '@/actions/customers/delete-customer-document-action'

export const DeleteCustomerDocumentModal = () => {
  const { removeParams, params } = useUrlParams()

  const fileName = params.get('file_name')
  const fileId = params.get('file_id')
  const isOpen = params.has(`delete_file_${fileId}`)
  const customerId = params.get('customer_id')

  const handleCloseModal = useCallback(
    (): void =>
      removeParams([
        `delete_file_${fileId}`,
        'file_name',
        'file_id',
        'customer_id',
      ]),
    [fileId, removeParams],
  )

  const onSuccess = (message: string | null) => {
    toast(message, { type: 'success' })
    handleCloseModal()
  }

  const onError = (message: string | null) => {
    toast(message, { type: 'error' })
  }

  const [{ errors }, handleSubmit, isPending] = useFormState({
    action: deleteCustomerDocumentAction,
    onError,
    onSuccess,
  })

  if (!fileId || !customerId) return

  return (
    <Modal.Root isOpen={isOpen} onClose={handleCloseModal}>
      <Modal.Header>Excluir Documento</Modal.Header>

      <form onSubmit={handleSubmit}>
        <Modal.Content>
          <div className="flex flex-col gap-4">
            Você tem certeza de que quer excluir o documento {fileName}?
            <Message
              title="Cuidado!"
              message="Esta ação não poderá ser revertida, o documento será excluido
          permanentemente"
            />
          </div>
          <Input
            type="hidden"
            defaultValue={customerId}
            name="customerId"
            error={errors?.customerId}
          />
          <Input
            type="hidden"
            defaultValue={fileId}
            name="fileId"
            error={errors?.fileId}
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

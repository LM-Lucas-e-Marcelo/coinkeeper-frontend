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
import { deleteProductAction } from '@/actions/products/delete-product-action'

export const DeleteProductModal = () => {
  const { removeParams, params } = useUrlParams()

  const isOpen = params.has('delete_product')
  const productName = params.get('name')
  const productId = params.get('product')

  const handleCloseModal = useCallback(
    (): void => removeParams(['delete_product', 'name', 'product']),
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
    action: deleteProductAction,
    onError,
    onSuccess,
  })

  if (!productId) return

  return (
    <Modal.Root isOpen={isOpen} onClose={handleCloseModal}>
      <Modal.Header>Excluir produto</Modal.Header>
      <form onSubmit={handleSubmit}>
        <Modal.Content>
          <div className="flex flex-col gap-4">
            Você tem certeza de que quer excluir o produto {productName}?
            <Message
              title="Cuidado!"
              message="Esta ação não poderá ser revertida, o produto será excluido
          permanentemente"
            />
          </div>
          <Input
            type="hidden"
            defaultValue={productId}
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

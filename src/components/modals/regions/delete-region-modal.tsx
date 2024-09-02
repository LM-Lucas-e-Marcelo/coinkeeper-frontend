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
import { deleteRegionAction } from '@/actions/regions/delete-region-action'

export const DeleteRegionModal = () => {
  const { removeParams, params } = useUrlParams()

  const isOpen = params.has('delete_region')
  const regionName = params.get('region_name')
  const regionId = params.get('region')

  const handleCloseModal = useCallback(
    (): void => removeParams(['delete_region', 'region_name', 'region']),
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
    action: deleteRegionAction,
    onError,
    onSuccess,
  })

  if (!regionId) return

  return (
    <Modal.Root isOpen={isOpen} onClose={handleCloseModal}>
      <Modal.Header>Excluir região</Modal.Header>
      <form onSubmit={handleSubmit}>
        <Modal.Content>
          <div className="flex flex-col gap-4">
            Você tem certeza de que quer excluir a região {regionName}?
            <Message
              title="Cuidado!"
              message="Esta ação não poderá ser revertida, a região será excluida
          permanentemente"
            />
          </div>
          <Input
            type="hidden"
            defaultValue={regionId}
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

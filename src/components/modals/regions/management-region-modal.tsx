'use client'

import { ButtonGroup } from '@/components/form/button-group'
import { Modal } from '../modal/index'
import { Button } from '@/components/form/button'
import { Input } from '@/components/form/input'
import { toast } from 'react-toastify'
import { useCallback } from 'react'
import { useUrlParams } from '@/hooks/use-params'
import { useFormState } from '@/hooks/use-form-state'

import { createRegionAction } from '@/actions/regions/create-region-action'
import { updateRegionAction } from '@/actions/regions/update-region-action'

export const ManagementRegionModal = () => {
  const { removeParams, params } = useUrlParams()
  const isOpen = params.has('management_region')
  const regionId = params.get('region')
  const regionName = params.get('region_name')

  const handleCloseModal = useCallback(() => {
    removeParams(['management_region', 'update'])
  }, [removeParams])

  const onSuccess = (message: string | null) => {
    toast(message, { type: 'success' })
    handleCloseModal()
  }
  const onError = (message: string | null) => {
    toast(message, { type: 'error' })
  }

  const [{ errors }, handleSubmit, isPending] = useFormState({
    action: regionId ? updateRegionAction : createRegionAction,
    onError,
    onSuccess,
  })

  if (regionId && !regionName) return

  return (
    <Modal.Root isOpen={isOpen} onClose={handleCloseModal}>
      <Modal.Header>{regionId ? 'Editar' : 'Cadastrar'} Região</Modal.Header>
      <form onSubmit={handleSubmit}>
        <Modal.Content>
          <div className="flex gap-3 flex-col">
            <Input name="id" defaultValue={regionId || ''} type="hidden" />
            <Input
              label="Nome"
              name="name"
              error={errors?.name}
              defaultValue={regionName || ''}
            />
          </div>
        </Modal.Content>
        <Modal.Actions>
          <ButtonGroup>
            <Button type="button" onClick={handleCloseModal} variant="danger">
              Fechar
            </Button>

            <Button type="submit" disabled={isPending}>
              {regionId ? 'Editar' : 'Cadastrar '}
            </Button>
          </ButtonGroup>
        </Modal.Actions>
      </form>
    </Modal.Root>
  )
}

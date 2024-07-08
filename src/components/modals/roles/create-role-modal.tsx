'use client'

import { ButtonGroup } from '@/components/form/button-group'
import { Modal } from '../modal'
import { Button } from '@/components/form/button'
import { Input } from '@/components/form/input'
import { toast } from 'react-toastify'
import { useUrlParams } from '@/hooks/use-params'
import { createRoleAction } from '@/actions/roles/create-role-action'
import { useFormState } from '@/hooks/use-form-state'

export const CreateRoleModal = () => {
  const { removeParams, params } = useUrlParams()
  const isOpen = params.has('create_role')

  const handleCloseModal = () => removeParams(['create_role'])

  const onSuccess = (message: string | null) => {
    toast(message, { type: 'success' })
    handleCloseModal()
  }
  const onError = (message: string | null) => {
    toast(message, { type: 'error' })
  }
  const [{ errors }, handleSubmit, isPending] = useFormState({
    action: createRoleAction,
    onError,
    onSuccess,
  })

  return (
    <Modal.Root isOpen={isOpen} onClose={handleCloseModal}>
      <Modal.Header>Cadastrar Grupo</Modal.Header>
      <form onSubmit={handleSubmit}>
        <Modal.Content>
          <Input label="Nome" name="name" error={errors?.name} />
        </Modal.Content>
        <Modal.Actions>
          <ButtonGroup>
            <Button type="button" onClick={handleCloseModal} variant="danger">
              Fechar
            </Button>

            <Button type="submit" disabled={isPending}>
              Cadastrar
            </Button>
          </ButtonGroup>
        </Modal.Actions>
      </form>
    </Modal.Root>
  )
}

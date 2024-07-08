'use client'

import { ButtonGroup } from '@/components/form/button-group'
import { Modal } from '../modal'
import { Button } from '@/components/form/button'
import { Input } from '@/components/form/input'
import { createUserAction } from '@/actions/users/create-user-action'
import { toast } from 'react-toastify'
import { useUrlParams } from '@/hooks/use-params'
import { useFormState } from '@/hooks/use-form-state'

export const CreateUserModal = () => {
  const { removeParams, params } = useUrlParams()
  const handleCloseModal = () => removeParams(['create_user'])

  const onSuccess = (message: string | null) => {
    toast(message, { type: 'success' })
    handleCloseModal()
  }
  const onError = (message: string | null) => {
    toast(message, { type: 'error' })
  }
  const [{ errors }, handleSubmit, isPending] = useFormState({
    action: createUserAction,
    onError,
    onSuccess,
  })

  const isOpen = params.has('create_user')

  return (
    <Modal.Root isOpen={isOpen} onClose={handleCloseModal}>
      <Modal.Header>Cadastrar Usuário</Modal.Header>
      <form onSubmit={handleSubmit}>
        <Modal.Content>
          <div className="flex gap-3 flex-col">
            <Input label="Nome" name="name" error={errors?.name} />
            <Input label="Usuário" name="username" error={errors?.username} />
            <Input
              label="Senha"
              name="password"
              type="password"
              error={errors?.password}
            />
          </div>
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

'use client'

import { ButtonGroup } from '@/components/form/button-group'
import { Modal } from '../modal'
import { Button } from '@/components/form/button'
import { Input } from '@/components/form/input'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-toastify'
import { Status } from '@/constants/status'
import { useUrlParams } from '@/hooks/useParams'
import { createRoleSchema } from '@/schemas/roles/create-role-schema'
import { CreateRoleData } from '@/types/roles/create-role'
import { createRole } from '@/actions/roles/create-role-action'

export const CreateRoleModal = () => {
  const { removeParams, params } = useUrlParams()
  const isOpen = params.has('create_role')

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<CreateRoleData>({
    resolver: zodResolver(createRoleSchema),
  })

  const handleCloseModal = () => removeParams(['create_role'])

  const onSubmit = handleSubmit(async (data) => {
    const { Success } = Status
    const response = await createRole(data)

    if (response.status !== Success) {
      return toast(response.message, {
        type: 'error',
      })
    }

    toast(response.message, {
      type: 'success',
    })
    handleCloseModal()
    reset()
  })

  return (
    <Modal.Root isOpen={isOpen} onClose={handleCloseModal}>
      <Modal.Header>Cadastrar Grupo</Modal.Header>
      <form onSubmit={onSubmit}>
        <Modal.Content>
          <Input
            label="Nome"
            name="name"
            register={register}
            error={errors?.name?.message}
          />
        </Modal.Content>
        <Modal.Actions>
          <ButtonGroup>
            <Button type="button" onClick={handleCloseModal} variant="danger">
              Fechar
            </Button>

            <Button type="submit" disabled={isSubmitting}>
              Cadastrar
            </Button>
          </ButtonGroup>
        </Modal.Actions>
      </form>
    </Modal.Root>
  )
}

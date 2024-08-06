'use client'

import { ButtonGroup } from '@/components/form/button-group'
import { Modal } from '../modal'
import { Button } from '@/components/form/button'
import { Input } from '@/components/form/input'
import { toast } from 'react-toastify'
import { useCallback } from 'react'
import { useUrlParams } from '@/hooks/use-params'
import { useFormState } from '@/hooks/use-form-state'
import { createCustomerAction } from '@/actions/customers/create-customer-action'
import { SUPPORTED_FILES } from '@/constants/files'

export const CreateCustomerModal = () => {
  const { removeParams, params } = useUrlParams()
  const isOpen = params.has('create_customer')

  const handleCloseModal = useCallback(() => {
    removeParams(['create_customer'])
  }, [removeParams])

  const onSuccess = (message: string | null) => {
    toast(message, { type: 'success' })
    handleCloseModal()
  }
  const onError = (message: string | null) => {
    toast(message, { type: 'error' })
  }

  const [{ errors }, handleSubmit, isPending] = useFormState({
    action: createCustomerAction,
    onError,
    onSuccess,
  })

  return (
    <Modal.Root isOpen={isOpen} onClose={handleCloseModal}>
      <Modal.Header>Cadastrar Cliente</Modal.Header>
      <form onSubmit={handleSubmit}>
        <Modal.Content>
          <div className="flex gap-3 flex-col">
            <Input label="Nome" name="name" error={errors?.name} />
            <Input label="CPF" name="document" error={errors?.document} />
            <div className="flex gap-3">
              <Input label="Telefone" name="phone" error={errors?.phone} />
              <Input
                label="Whatsapp"
                name="phoneWhatsapp"
                error={errors?.phoneWhatsapp}
              />
            </div>
            <Input
              label="Endereço residencial"
              name="residentialAddress"
              error={errors?.residentialAddress}
            />
            <Input
              label="Endereço empresarial"
              name="businessAddress"
              error={errors?.businessAddress}
            />

            <Input
              label="Email"
              type="email"
              name="email"
              error={errors?.email}
            />
            <Input
              type="file"
              label="Documento"
              name="documentFile"
              error={errors?.documentFile}
              accept={SUPPORTED_FILES.toString()}
            />
            <Input
              type="file"
              label="Comprovante de residencia"
              name="proofAddressFile"
              error={errors?.proofAddressFile}
              accept={SUPPORTED_FILES.toString()}
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

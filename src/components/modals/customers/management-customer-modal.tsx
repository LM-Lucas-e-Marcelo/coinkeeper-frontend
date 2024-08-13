'use client'

import { ButtonGroup } from '@/components/form/button-group'
import { Modal } from '../modal'
import { Button } from '@/components/form/button'
import { Input } from '@/components/form/input'
import { toast } from 'react-toastify'
import { useCallback, useEffect } from 'react'
import { useUrlParams } from '@/hooks/use-params'
import { useFormState } from '@/hooks/use-form-state'
import { createCustomerAction } from '@/actions/customers/create-customer-action'
import { SUPPORTED_FILES } from '@/constants/files'
import { ICustomerById } from '@/http/customers/get-customer-by-id'
import { updateCustomerAction } from '@/actions/customers/update-customer-action'

interface ManagementCustomerModalProps {
  customer?: ICustomerById | null
}

export const ManagementCustomerModal = ({
  customer,
}: ManagementCustomerModalProps) => {
  const { removeParams, params } = useUrlParams()
  const isOpen = params.has('management_customer')
  const isUpdate = params.has('update')

  const handleCloseModal = useCallback(() => {
    removeParams(['management_customer', 'update'])
  }, [removeParams])

  const onSuccess = (message: string | null) => {
    toast(message, { type: 'success' })
    handleCloseModal()
  }
  const onError = (message: string | null) => {
    toast(message, { type: 'error' })
  }

  const [{ errors }, handleSubmit, isPending] = useFormState({
    action: isUpdate ? updateCustomerAction : createCustomerAction,
    onError,
    onSuccess,
  })

  useEffect(() => {
    if (isUpdate && isOpen) {
      if (!customer) {
        return handleCloseModal()
      }
    }
  }, [customer, handleCloseModal, isOpen, isUpdate])

  if (isUpdate && !customer) return

  return (
    <Modal.Root isOpen={isOpen} onClose={handleCloseModal}>
      <Modal.Header>{isUpdate ? 'Editar' : 'Cadastrar'} Cliente</Modal.Header>
      <form onSubmit={handleSubmit}>
        <Modal.Content>
          <div className="flex gap-3 flex-col">
            <Input
              label="Nome"
              name="name"
              error={errors?.name}
              defaultValue={customer?.name}
            />
            <Input
              label="CPF"
              name="document"
              error={errors?.document}
              defaultValue={customer?.document}
            />
            <div className="flex gap-3">
              <Input
                label="Telefone"
                name="phone"
                error={errors?.phone}
                defaultValue={customer?.phone}
              />
              <Input
                label="Whatsapp"
                name="phoneWhatsapp"
                error={errors?.phoneWhatsapp}
                defaultValue={customer?.phoneWhatsapp}
              />
            </div>
            <Input
              label="Endereço residencial"
              name="residentialAddress"
              error={errors?.residentialAddress}
              defaultValue={customer?.residentialAddress}
            />
            <Input
              label="Endereço empresarial"
              name="businessAddress"
              error={errors?.businessAddress}
              defaultValue={customer?.businessAddress}
            />
            <Input
              label="Email"
              type="email"
              name="email"
              error={errors?.email}
              defaultValue={customer?.email}
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
            />{' '}
            <Input name="id" type="hidden" defaultValue={customer?.id} />
          </div>
        </Modal.Content>
        <Modal.Actions>
          <ButtonGroup>
            <Button type="button" onClick={handleCloseModal} variant="danger">
              Fechar
            </Button>

            <Button type="submit" disabled={isPending}>
              {isUpdate ? 'Editar' : 'Cadastrar '}
            </Button>
          </ButtonGroup>
        </Modal.Actions>
      </form>
    </Modal.Root>
  )
}

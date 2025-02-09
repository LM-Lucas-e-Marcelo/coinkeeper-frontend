import { Button } from '@/components/form/button'
import { ButtonGroup } from '@/components/form/button-group'
import { TableLoading } from '@/components/loadings/table-loading'
import { PageHeader } from '@/components/page-header'
import { getCustomerById } from '@/http/customers/get-customer-by-id'
import { Suspense } from 'react'
import { tv } from 'tailwind-variants'
import { CustomerData } from './customer-data'
import { CustomerAddress } from './customer-address'
import { ModalButton } from '@/components/modal-button'
import { ManagementCustomerModal } from '@/components/modals/customers/management-customer-modal'
import { getRegions } from '@/http/regions/get-regions'
import { CustomerDocuments } from './customer-documents'
import { AddCustomerDocumentsModal } from '@/components/modals/customers/add-customer-documents-modal'
import { DeleteCustomerDocumentModal } from '@/components/modals/customers/delete-customer-document-modal'

const registrationStyles = tv({
  slots: {
    container: 'flex gap-3 pb-5 border-b border-primary',
  },
})

export interface RegistrationProps {
  params: {
    id: string
  }
}

const { container } = registrationStyles()

export default async function Registration({ params }: RegistrationProps) {
  const { customer } = await getCustomerById({ id: params?.id })
  const { regions } = await getRegions()

  if (!customer) return null

  return (
    <Suspense fallback={<TableLoading />}>
      <PageHeader>
        <h1 className="text-2xl">Ficha cadastral</h1>
        <ButtonGroup>
          <ModalButton params={{ add_file_modal: true }}>
            <Button>Adicionar documentos</Button>
          </ModalButton>
          <ModalButton params={{ management_customer: true, update: true }}>
            <Button>Editar</Button>
          </ModalButton>
        </ButtonGroup>
      </PageHeader>
      <div className={container()}>
        <CustomerData customer={customer} />
        <CustomerAddress customer={customer} />
      </div>
      <CustomerDocuments medias={customer.medias} customerId={customer.id} />
      <ManagementCustomerModal regions={regions} customer={customer} />
      <AddCustomerDocumentsModal customerId={customer.id} />
      <DeleteCustomerDocumentModal />
    </Suspense>
  )
}

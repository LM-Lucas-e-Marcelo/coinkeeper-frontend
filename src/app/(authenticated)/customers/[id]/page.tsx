import { tv } from 'tailwind-variants'
import { CustomerDetails } from './customer-details'
import { CustomerTransactions } from './customer-transactions'
import { PageHeader } from '@/components/page-header'
import { ButtonGroup } from '@/components/form/button-group'
import { ModalButton } from '@/components/modal-button'
import { Button } from '@/components/form/button'
import { CreateTransactionModal } from '@/components/modals/transactions/create-transaction-modal'
import { getProducts } from '@/http/products/get-products'
import { getCustomerById } from '@/http/customers/get-customer-by-id'
import { Suspense } from 'react'
import { TableLoading } from '@/components/loadings/table-loading'

const customerDeatils = tv({
  slots: {
    container: 'flex gap-6 h-full relative overflow-hidden max-h-[80vh]',
  },
})

export interface CustomerDetailsPageProps {
  params: {
    id: string
  }
}

const { container } = customerDeatils()

export default async function CustomerDetailsPage({
  params,
}: CustomerDetailsPageProps) {
  const { products } = await getProducts({ limit: 0 })
  const { customer } = await getCustomerById({ id: params?.id })
  return (
    <Suspense fallback={<TableLoading />}>
      <PageHeader>
        <ButtonGroup align="end">
          <ModalButton params={{ customer_documents: true }}>
            <Button>Documentos</Button>
          </ModalButton>
          <ModalButton params={{ create_transaction: true }}>
            <Button>Cadastrar Transação</Button>
          </ModalButton>
        </ButtonGroup>
      </PageHeader>
      <div className={container()}>
        <CustomerDetails customer={customer} />
        <CustomerTransactions params={params} customerScore={customer?.score} />
        <CreateTransactionModal params={params} products={products} />
      </div>
    </Suspense>
  )
}

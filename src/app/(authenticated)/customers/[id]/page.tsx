import { tv } from 'tailwind-variants'
import { CustomerDetails } from './customer-details'
import { CustomerTransactions } from './customer-transactions'
import { PageHeader } from '@/components/page-header'
import { ButtonGroup } from '@/components/form/button-group'
import { ModalButton } from '@/components/modal-button'
import { Button } from '@/components/form/button'
import { CreateTransactionModal } from '@/components/modals/transactions/create-transaction-modal'

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

export default function CustomerDetailsPage({
  params,
}: CustomerDetailsPageProps) {
  return (
    <>
      <PageHeader>
        <ButtonGroup align="end">
          <ModalButton params={{ create_transaction: true }}>
            <Button>Cadastrar transação</Button>
          </ModalButton>
        </ButtonGroup>
      </PageHeader>
      <div className={container()}>
        <CustomerDetails params={params} />
        <CustomerTransactions params={params} />
        <CreateTransactionModal params={params} />
      </div>
    </>
  )
}

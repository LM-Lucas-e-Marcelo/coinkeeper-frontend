import { tv } from 'tailwind-variants'

import { ExpenseTransactions } from './expense-transactions'
import { PageHeader } from '@/components/page-header'
import { ButtonGroup } from '@/components/form/button-group'
import { ModalButton } from '@/components/modal-button'
import { Button } from '@/components/form/button'

const expenseDetails = tv({
  slots: {
    container: 'flex gap-6 h-full relative overflow-hidden max-h-[80vh]',
  },
})

export interface ExpenseDetailsPageProps {
  params: {
    id: string
  }
}

const { container } = expenseDetails()

export default function ExpenseDetailsPage({
  params,
}: ExpenseDetailsPageProps) {
  return (
    <>
      <PageHeader>
        <ButtonGroup align="end">
          <ModalButton params={{ management_expense: true, update: true }}>
            <Button>Editar transação</Button>
          </ModalButton>
          <ModalButton params={{ management_expense_transaction: true }}>
            <Button>Cadastrar despesa</Button>
          </ModalButton>
        </ButtonGroup>
      </PageHeader>
      <div className={container()}>
        <ExpenseTransactions params={params} />
      </div>
    </>
  )
}

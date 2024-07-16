import { tv } from 'tailwind-variants'
import { TransactionCard } from './transaction-card'
import { DeleteTransactionModal } from '@/components/modals/transactions/delete-transaction-modal'
import { getTransactions } from '@/http/transactions/get-transactions'
import { CustomerDetailsPageProps } from './page'

const customerTransactions = tv({
  slots: {
    container: 'w-full flex gap-4',
    section:
      'w-full flex flex-col gap-4 overflow-auto max-h-[80vh] px-4 relative',
    headerTitle: 'sticky top-0 bg-white w-full py-2',
    divider: 'w-1 bg-primary h-full',
  },
})

const { container, section, headerTitle, divider } = customerTransactions()

export async function CustomerTransactions({
  params,
}: CustomerDetailsPageProps) {
  const { transactions } = await getTransactions({ customerId: params.id })

  return (
    <div className={container()}>
      <section className={section()}>
        <strong className={headerTitle()}>Pagamentos</strong>
        {transactions?.map((transaction) => {
          return (
            <TransactionCard key={transaction.id} transaction={transaction} />
          )
        })}
      </section>
      <div className={divider()} />
      <section className={section()}>
        <strong className={headerTitle()}>Parcelas</strong>
        <h1>Ver com o CCE o que colocar</h1>
      </section>
      <DeleteTransactionModal />
    </div>
  )
}

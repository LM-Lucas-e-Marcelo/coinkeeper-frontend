import { tv } from 'tailwind-variants'
import { TransactionCard } from './transaction-card'
import { DeleteTransactionModal } from '@/components/modals/transactions/delete-transaction-modal'
import { getTransactions } from '@/http/transactions/get-transactions'
import { CustomerDetailsPageProps } from './page'
import { PayParcelModal } from '@/components/modals/transactions/pay-parcel-modal'
import { CustomerScore } from './customer-score'

const customerTransactions = tv({
  slots: {
    container: 'w-full flex gap-4',
    section:
      'w-full flex flex-col gap-4 overflow-auto max-h-[80vh] px-4 relative',
    headerTitle: 'sticky top-0 bg-white w-full py-2',
    divider: 'w-1 bg-primary h-full',
  },

  variants: {
    isSmall: {
      true: {
        section: 'w-[400px] justify-center items-center',
      },
    },
    isAbsolute: {
      true: {
        headerTitle: 'absolute',
      },
    },
  },
})

const { container, section, headerTitle, divider } = customerTransactions()

interface CustomerTransactionsProps extends CustomerDetailsPageProps {
  customerScore?: number
}

export async function CustomerTransactions({
  params,
  customerScore,
}: CustomerTransactionsProps) {
  const { transactions } = await getTransactions({ customerId: params.id })

  return (
    <div className={container()}>
      <section className={section()}>
        <strong className={headerTitle()}>Empréstimos</strong>
        {transactions?.map((transaction) => {
          return (
            <TransactionCard key={transaction.id} transaction={transaction} />
          )
        })}
      </section>
      <div className={divider()} />
      <section className={section({ isSmall: true })}>
        <strong className={headerTitle({ isAbsolute: true })}>Pontuação</strong>
        <CustomerScore customerScore={customerScore} />
      </section>
      <DeleteTransactionModal />
      <PayParcelModal />
    </div>
  )
}

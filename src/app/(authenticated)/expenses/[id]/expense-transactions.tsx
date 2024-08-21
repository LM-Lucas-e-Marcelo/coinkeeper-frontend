import { tv } from 'tailwind-variants'
import { TransactionCard } from './transaction-card'
import { DeleteTransactionModal } from '@/components/modals/transactions/delete-transaction-modal'
import { ExpenseDetailsPageProps } from './page'
import { getExpenseById } from '@/http/expenses/get-expense-by-id'
import { ManagementExpenseTransactionModal } from '@/components/modals/expenses/management-expense-transactions-modal'

const expenseTransactions = tv({
  slots: {
    container: 'w-full flex gap-4',
    section:
      'w-full flex flex-col gap-4 overflow-auto max-h-[80vh] px-4 relative',
    headerTitle: 'sticky top-0 bg-white w-full py-2',
  },
})

const { container, section, headerTitle } = expenseTransactions()

export async function ExpenseTransactions({ params }: ExpenseDetailsPageProps) {
  const { expenseById } = await getExpenseById({ expenseId: params.id })

  return (
    <div className={container()}>
      <section className={section()}>
        <strong className={headerTitle()}>Despesas</strong>
        {expenseById?.transactions?.map((transaction) => {
          return (
            <TransactionCard key={transaction.id} transaction={transaction} />
          )
        })}
      </section>

      <ManagementExpenseTransactionModal
        id={params.id}
        transactions={expenseById.transactions}
      />
      <DeleteTransactionModal />
    </div>
  )
}

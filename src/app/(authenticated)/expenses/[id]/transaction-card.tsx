import { ModalButton } from '@/components/modal-button'
import { tv } from 'tailwind-variants'
import { FiTrash2, FiEdit } from '@/assets/icons'
import { formatCurrency } from '@/utils/format-currency'
import { formatDate } from '@/utils/format-date'
import { IExpenseTransaction } from '@/http/expenses/get-expense-by-id'

const transactionCard = tv({
  slots: {
    card: 'flex justify-between p-4  w-full rounded-md bg-secondary border-l-4 border-red',
    cardSection: 'flex flex-col gap-4',
    secondCardSection: 'flex flex-col gap-4 items-end justify-around',
    cardSpan: 'text-center',
    cardActions: 'flex gap-2 items-center',
  },

  variants: {
    paid: {
      true: {
        card: 'border-green-500',
      },
    },
  },
})

interface TransactionCardProps {
  transaction: IExpenseTransaction
}

const { card, cardSection, secondCardSection, cardSpan, cardActions } =
  transactionCard()

export function TransactionCard({ transaction }: TransactionCardProps) {
  return (
    <div className={card({ paid: transaction.paymentDate !== null })}>
      <div className={cardSection()}>
        <span>
          <strong>Descrição</strong>
          <p>{transaction.description}</p>
        </span>
        <span>
          <strong>Valor</strong>
          <p>{formatCurrency(transaction.value)}</p>
        </span>
      </div>
      <div className={secondCardSection()}>
        <span className={cardSpan()}>
          <strong>Data de vencimento</strong>
          <p>{formatDate(transaction?.dueDate)}</p>
        </span>
        <span className={cardSpan()}>
          <strong>Data do pagamento</strong>
          <p>{formatDate(transaction.paymentDate) || '-'}</p>
        </span>
        <span className={cardActions()}>
          <ModalButton
            params={{
              management_expense_transaction: true,
              transaction: transaction.id,
            }}
          >
            <FiEdit size={24} className="text-orange" />
          </ModalButton>
          <ModalButton
            params={{ delete_transaction: true, transaction: transaction.id }}
          >
            <FiTrash2 size={24} className="text-red" />
          </ModalButton>
        </span>
      </div>
    </div>
  )
}

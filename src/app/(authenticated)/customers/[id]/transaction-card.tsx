import { ModalButton } from '@/components/modal-button'
import { tv } from 'tailwind-variants'
import { FiEye, FiTrash2 } from '@/assets/icons'
import { ITransactions } from '@/http/transactions/get-transactions'
import { formatCurrency } from '@/utils/format-currency'
import { formatDate } from '@/utils/format-date'

const transactionCard = tv({
  slots: {
    card: 'flex justify-between p-4  w-full rounded-md bg-secondary',
    cardSection: 'flex flex-col gap-4',
    secondCardSection: 'flex flex-col gap-4 items-end justify-around',
    cardSpan: 'text-center',
    cardActions: 'flex gap-4',
  },
})

interface TransactionCardProps {
  transaction: ITransactions
}

const { card, cardSection, secondCardSection, cardSpan, cardActions } =
  transactionCard()

export function TransactionCard({ transaction }: TransactionCardProps) {
  return (
    <div className={card()}>
      <div className={cardSection()}>
        <span>
          <strong>Descrição</strong>
          <p>{transaction.description}</p>
        </span>
        <span>
          <strong>Data</strong>
          <p>{formatDate(transaction?.paymentDate)}</p>
        </span>
        <span>
          <strong>Valor empréstimo</strong>
          <p className="text-green-500">{formatCurrency(transaction.value)}</p>
        </span>
        <span>
          <strong>Valor devido</strong>
          <p className="text-red">
            {formatCurrency(transaction.differenceBetweenParcels)}
          </p>
        </span>
      </div>
      <div className={secondCardSection()}>
        <span className={cardSpan()}>
          <strong>Parcelas</strong>
          <p>
            {transaction.totalParcelsPaid}/{transaction.totalParcels}
          </p>
        </span>
        <span className={cardActions()}>
          <ModalButton params={{ xuxu: true }}>
            <FiEye size={24} className="text-primary" />
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

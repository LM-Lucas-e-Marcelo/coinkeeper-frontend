import { ModalButton } from '@/components/modal-button'
import { tv } from 'tailwind-variants'
import {
  FiEye,
  FiTrash2,
  LiaFileContractSolid,
  FiCheck,
  MdMoneyOff,
} from '@/assets/icons'
import { ITransactions } from '@/http/transactions/get-transactions'
import { formatCurrency } from '@/utils/format-currency'
import { formatDate } from '@/utils/format-date'
import { ParcelsDetailsModal } from '@/components/modals/transactions/parcels-details-modal'
import { PayOffTransactionModal } from '@/components/modals/transactions/pay-off-transaction-modal'
import { FinancialLossModal } from '@/components/modals/transactions/financial-loss-modal'

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
  transaction: ITransactions
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
          <strong>Data</strong>
          <p>{formatDate(transaction?.createdAt)}</p>
        </span>
        <span>
          <strong>Valor da transação</strong>
          <p className="text-red">{formatCurrency(transaction.value)}</p>
        </span>
        <span>
          <strong>Valor pago</strong>
          <p className="text-green-500">
            {formatCurrency(transaction.valuePaid)}
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
        <span className={cardSpan()}>
          <strong>Data da quitação</strong>
          <p>{formatDate(transaction.paymentDate) || '-'}</p>
        </span>
        <span className={cardSpan()}>
          <strong>Despesas</strong>
          <p>{formatCurrency(transaction.companyExpense) || '-'}</p>
        </span>
        <span className={cardActions()}>
          <ModalButton params={{ [`financial_loss_${transaction.id}`]: true }}>
            <MdMoneyOff
              size={24}
              className="text-red"
              title="Marcar como prejuízo"
            />
          </ModalButton>
          <ModalButton
            params={{ [`pay_off_transaction_${transaction.id}`]: true }}
          >
            <FiCheck
              size={24}
              className="text-green-500"
              title="Efetuar quitação do empréstimo"
            />
          </ModalButton>
          {transaction.contractFileUrl && (
            <a href={transaction.contractFileUrl} target="_blank">
              <LiaFileContractSolid
                size={26}
                className="text-orange"
                title="Ver comprovante"
              />
            </a>
          )}
          <ModalButton params={{ [`parcels_details_${transaction.id}`]: true }}>
            <FiEye size={24} className="text-primary" />
          </ModalButton>
          <ModalButton
            params={{ delete_transaction: true, transaction: transaction.id }}
          >
            <FiTrash2
              size={24}
              className="text-red"
              title="Excluir empréstimo"
            />
          </ModalButton>
        </span>
        <ParcelsDetailsModal
          parcels={transaction.parcels}
          transactionId={transaction.id}
        />
        <PayOffTransactionModal transaction={transaction} />
        <FinancialLossModal transaction={transaction} />
      </div>
    </div>
  )
}

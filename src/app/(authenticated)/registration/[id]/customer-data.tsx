import { ICustomerById } from '@/http/customers/get-customer-by-id'
import { formatCurrency } from '@/utils/format-currency'
import { tv } from 'tailwind-variants'

const customerDataStyles = tv({
  slots: {
    section: 'p-5 bg-secondary rounded-md w-[50%]',
    title: 'text-xl text-center w-full block border-b border-primary pb-2',
    span: 'mt-2 flex flex-col text-lg',
  },
})

interface CustomerDataProps {
  customer: ICustomerById
}

const { section, title, span } = customerDataStyles()

export const CustomerData = ({ customer }: CustomerDataProps) => {
  return (
    <section className={section()}>
      <strong className={title()}>Dados</strong>
      <div className="flex items-center justify-between">
        <div>
          <span className={span()}>
            <strong>Nome</strong>
            <p>{customer?.name}</p>
          </span>
          <span className={span()}>
            <strong>Score</strong>
            <p>{customer?.score}</p>
          </span>
          <span className={span()}>
            <strong>Dívida total</strong>
            <p>{formatCurrency(customer?.totalDebt)}</p>
          </span>
        </div>
        <div>
          <span className={span()}>
            <strong>Email</strong>
            <p>{customer?.email}</p>
          </span>
          <span className={span()}>
            <strong>Telefone</strong>
            <p>{customer?.phone}</p>
          </span>
          <span className={span()}>
            <strong>Whatsapp</strong>
            <p>{customer?.phoneWhatsapp}</p>
          </span>
        </div>
      </div>
    </section>
  )
}

import { ICustomerById } from '@/http/customers/get-customer-by-id'
import { tv } from 'tailwind-variants'

const customerAddressStyles = tv({
  slots: {
    section: 'p-5 bg-secondary rounded-md w-[50%]',
    title: 'text-xl text-center w-full block border-b border-primary pb-2',
    span: 'mt-2 flex flex-col text-lg',
  },
})

interface CustomerAddressProps {
  customer: ICustomerById
}

const { section, title, span } = customerAddressStyles()

export const CustomerAddress = ({ customer }: CustomerAddressProps) => {
  return (
    <section className={section()}>
      <strong className={title()}>Endereço</strong>
      <div>
        <span className={span()}>
          <strong>Endereço residencial</strong>
          <p>{customer?.residentialAddress}</p>
        </span>
        <span className={span()}>
          <strong>Endereço empresarial</strong>
          <p>{customer?.businessAddress}</p>
        </span>
        <span className={span()}>
          <strong>Região</strong>
          <p>{customer?.region.name}</p>
        </span>
      </div>
    </section>
  )
}

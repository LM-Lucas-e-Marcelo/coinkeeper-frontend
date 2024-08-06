import { tv } from 'tailwind-variants'
import { CustomerDetailsPageProps } from './page'
import { getCustomerById } from '@/http/customers/get-customer-by-id'
import { formatCurrency } from '@/utils/format-currency'
import { CustomerDocumentsModal } from '@/components/modals/customers/customer-documents'

const customerDeatils = tv({
  slots: {
    aside: 'max-w-[300px] flex flex-col gap-4',
    card: 'bg-secondary rounded-md p-4 flex flex-col gap-2',
    cardTitle: 'w-full align-text-center text-center border-b border-primary',
  },
})

const { aside, card, cardTitle } = customerDeatils()

export async function CustomerDetails({ params }: CustomerDetailsPageProps) {
  const { customer } = await getCustomerById({ id: params?.id })

  return (
    <>
      <aside className={aside()}>
        <div className={card()}>
          <p className={cardTitle()}>Informações</p>
          <section>
            <strong>Nome</strong>
            <p>{customer?.name}</p>
          </section>
          <section>
            <strong>Valor total da dívida</strong>
            <p>{formatCurrency(customer?.totalDebt)}</p>
          </section>
        </div>
        <div className={card()}>
          <p className={cardTitle()}>Contato</p>
          <section>
            <strong>Whatsapp</strong>
            <p>{customer?.phoneWhatsapp ?? '-'}</p>
          </section>
          <section>
            <strong>Telefone</strong>
            <p>{customer?.phone ?? '-'}</p>
          </section>
          <section>
            <strong>E-mail</strong>
            <p>{customer?.email ?? '-'}</p>
          </section>
        </div>
        <address className={card()}>
          <p className={cardTitle()}>Endereço</p>
          <section>
            <strong>Residencial</strong>
            <p>{customer?.residentialAddress ?? '-'}</p>
          </section>
          <section>
            <strong>mpresarial</strong>
            <p>{customer?.businessAddress ?? '-'}</p>
          </section>
        </address>
      </aside>
      <CustomerDocumentsModal
      // documentUrl={customer?.documentFileUrl}
      // proofAddressUrl={customer?.proofAddressFileUrl}
      />
    </>
  )
}

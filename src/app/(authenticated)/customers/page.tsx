import { Button } from '@/components/form/button'
import { ButtonGroup } from '@/components/form/button-group'
import { Filter } from '@/components/form/filter'
import { PageHeader } from '@/components/page-header'
import { CustomersTable } from './customers-table'
import { Suspense } from 'react'
import { TableLoading } from '@/components/loadings/table-loading'
import { ModalButton } from '@/components/modal-button'
import { PayManyParcels } from '@/components/modals/transactions/pay-many-parcels'
import { getCustomersWithDebt } from '@/http/customers/get-customer-with-debt'
import { SendWhatsappMessage } from '@/components/modals/whatsapp/send-whatsapp-message'
import { getBotStatus } from '@/http/whatsapp/get-bot-status'
import { ConnectBotModal } from '@/components/modals/whatsapp/connect-bot-modal'
import { getConnectBot } from '@/http/whatsapp/get-connect-bot'
import { ConfigureWhatsappMessageModal } from '@/components/modals/whatsapp/configure-whatsapp-message-modal'
import { getWhatsappMessage } from '@/http/whatsapp/get-whatsapp-messages'

export interface CustomersProps {
  searchParams: {
    [key: string]: string
  }
}

export default async function Customers({ searchParams }: CustomersProps) {
  const { customers } = await getCustomersWithDebt()
  const { status } = await getBotStatus()
  const { qrcode } = await getConnectBot()
  const { messages } = await getWhatsappMessage()
  const filterOptions = [{ name: 'Nome', value: 'name' }]

  return (
    <>
      <Suspense fallback={<TableLoading />}>
        <PageHeader>
          <Filter options={filterOptions} />
          <ButtonGroup>
            <ModalButton params={{ send_whatsapp_message: true }}>
              <Button>Enviar mensagem</Button>
            </ModalButton>
            <ModalButton params={{ pay_many_parcels: true }}>
              <Button>Pagar Parcelas</Button>
            </ModalButton>
            <ModalButton params={{ management_customer: true }}>
              <Button>Cadastrar</Button>
            </ModalButton>
          </ButtonGroup>
        </PageHeader>
        <CustomersTable searchParams={searchParams} />
        <PayManyParcels customers={customers} />
        <SendWhatsappMessage customers={customers} status={status} />
        <ConfigureWhatsappMessageModal messages={messages} />
        <ConnectBotModal qrCode={qrcode.token} />
      </Suspense>
    </>
  )
}

import { Button } from '@/components/form/button'
import { ButtonGroup } from '@/components/form/button-group'
import { TableLoading } from '@/components/loadings/table-loading'
import { PageHeader } from '@/components/page-header'
import { Suspense } from 'react'
import { ChargesTable } from './charges-table'
import { getCharges } from '@/http/get-charges'
import { formatCurrency } from '@/utils/format-currency'
import { ModalButton } from '@/components/modal-button'
import { getBotStatus } from '@/http/whatsapp/get-bot-status'
import { getConnectBot } from '@/http/whatsapp/get-connect-bot'
import { ConnectBotModal } from '@/components/modals/whatsapp/connect-bot-modal'
import { getWhatsappMessage } from '@/http/whatsapp/get-whatsapp-messages'

interface ChargeProps {
  searchParams: {
    [key: string]: string
  }
}

export default async function Charge({ searchParams }: ChargeProps) {
  const { charges } = await getCharges(searchParams)
  const { status } = await getBotStatus()
  const { qrcode } = await getConnectBot()
  const { messages } = await getWhatsappMessage()

  return (
    <Suspense fallback={<TableLoading />}>
      <PageHeader>
        <div className="flex gap-3 mt-5">
          <span>
            <p className="text-sm">Clientes com débito</p>
            <p className="text-lg">{charges.totalClientsInDebt}</p>
          </span>
          <div className="w-[1px] bg-primary" />
          <span>
            <p className="text-sm">Total a receber</p>
            <p className="text-lg">{formatCurrency(charges.totalReceiver)}</p>
          </span>
        </div>
        <ButtonGroup>
          <ModalButton params={{ send_whatsapp_charge: true }}>
            <Button>Enviar Mensagem</Button>
          </ModalButton>
          <ModalButton params={{ pay_many_parcels_charge: true }}>
            <Button>Pagar Parcelas</Button>
          </ModalButton>
        </ButtonGroup>
      </PageHeader>
      <ChargesTable
        customers={charges.customers}
        status={status}
        messages={messages}
      />
      <ConnectBotModal qrCode={qrcode.token} />
    </Suspense>
  )
}

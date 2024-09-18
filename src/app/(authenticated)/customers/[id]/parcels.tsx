'use client'
import { Button } from '@/components/form/button'
import { ButtonGroup } from '@/components/form/button-group'
import { ModalButton } from '@/components/modal-button'
import { IParcel } from '@/http/transactions/get-transactions'
import { formatCurrency } from '@/utils/format-currency'
import { formatDate } from '@/utils/format-date'
import { tv } from 'tailwind-variants'

const parcels = tv({
  slots: {
    container:
      'flex flex-col px-4 p-2 gap-2 mb-4 border-l-4 border-red bg-secondary rounded-md last:mb-0 w-[50%] ml-auto',
    wrapper: 'flex justify-between gap-2',
    parcelSection: 'flex flex-col gap-2',
    statusSpan: 'flex items-center gap-2',
    section: 'flex flex-col gap-6 justify-start',
  },
  variants: {
    paid: {
      true: {
        container: 'border-green-500',
      },
    },
  },
})

interface ParcelsProps {
  parcels: IParcel[]
  transactionId: number
}

const { container, wrapper, parcelSection, statusSpan, section } = parcels()

export const Parcels = ({ parcels, transactionId }: ParcelsProps) => {
  const handleSeeProofPayment = (url: string) => {
    window.open(url, '_blank')
  }

  return (
    <>
      {parcels?.map((parcel) => {
        const currentParcelDate = new Date(parcel.dueDate)
        const adjustDate = new Date(
          currentParcelDate.setDate(currentParcelDate.getDate() + 1),
        ).toISOString()

        return (
          <div
            key={parcel.id}
            className={container({ paid: parcel.paymentDate !== null })}
          >
            <div className={wrapper()}>
              <section className={parcelSection()}>
                <span className={statusSpan()}>
                  <strong>Parcela:</strong>
                  <p>{parcel.parcel}</p>
                </span>
                <span className={statusSpan()}>
                  <strong>Valor:</strong>
                  <p>{formatCurrency(parcel.value)}</p>
                </span>
              </section>
              <section>
                <span>
                  <strong>Vencimento</strong>
                  <p>{formatDate(adjustDate)}</p>
                </span>
              </section>
              <section className={section()}>
                <span>
                  <strong>Pago em</strong>
                  <p>{formatDate(parcel.paymentDate) ?? '-'}</p>
                </span>
              </section>
            </div>
            <span>
              <strong>Observação</strong>
              <p>{parcel.observation || '-'}</p>
            </span>
            <ButtonGroup align="end">
              {parcel.proofFileUrl && (
                <Button
                  onClick={() => handleSeeProofPayment(parcel.proofFileUrl)}
                  variant="secondary"
                >
                  Ver comprovante
                </Button>
              )}
              {parcel.paymentDate !== null ? (
                <Button type="button" variant="danger">
                  <ModalButton
                    params={{
                      rollback_parcel: true,
                      parcel: parcel.id,
                      parcel_number: parcel.parcel,
                      transaction_id: transactionId,
                    }}
                  >
                    Cancelar pagamento
                  </ModalButton>
                </Button>
              ) : (
                <Button type="button">
                  <ModalButton
                    params={{
                      pay_parcel: true,
                      parcel: parcel.id,
                      parcel_number: parcel.parcel,
                      transaction_id: transactionId,
                    }}
                  >
                    Pagar parcela
                  </ModalButton>
                </Button>
              )}
            </ButtonGroup>
          </div>
        )
      })}
    </>
  )
}

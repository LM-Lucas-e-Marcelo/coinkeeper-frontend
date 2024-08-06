'use client'

import { Modal } from '../modal'
import { Button } from '@/components/form/button'
import { useCallback } from 'react'
import { useUrlParams } from '@/hooks/use-params'
import { IParcel } from '@/http/transactions/get-transactions'
import { formatDate } from '@/utils/format-date'
import { tv } from 'tailwind-variants'
import { ModalButton } from '@/components/modal-button'
import { formatCurrency } from '@/utils/format-currency'
import { ButtonGroup } from '@/components/form/button-group'

const parcelsDetailsModal = tv({
  slots: {
    container:
      'flex flex-col px-4 p-2 gap-2 mb-4 border-l-4 border-red bg-secondary rounded-md last:mb-0',
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

interface ParcelsDetailsModalProps {
  parcels: IParcel[]
  transactionId: number
}

const { container, wrapper, parcelSection, statusSpan, section } =
  parcelsDetailsModal()

export const ParcelsDetailsModal = ({
  parcels,
  transactionId,
}: ParcelsDetailsModalProps) => {
  const { removeParams, params } = useUrlParams()
  const isOpen = params.has(`parcels_details_${transactionId}`)

  const handleCloseModal = useCallback(() => {
    removeParams([`parcels_details_${transactionId}`])
  }, [removeParams, transactionId])

  const handleSeeProofPayment = (url: string) => {
    window.open(url, '_blank')
  }

  return (
    <Modal.Root isOpen={isOpen} onClose={handleCloseModal}>
      <Modal.Header>Parcelas</Modal.Header>

      <Modal.Content>
        {parcels.map((parcel) => {
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
                    <p>{formatDate(parcel.dueDate)}</p>
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
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={handleCloseModal} type="button">
          Fechar
        </Button>
      </Modal.Actions>
    </Modal.Root>
  )
}

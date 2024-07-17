'use client'

import { Modal } from '../modal'
import { Button } from '@/components/form/button'
import { useCallback } from 'react'
import { useUrlParams } from '@/hooks/use-params'
import { IParcel } from '@/http/transactions/get-transactions'
import { formatDate } from '@/utils/format-date'
import { FiX, FiCheck } from '@/assets/icons'
import { tv } from 'tailwind-variants'
import { ModalButton } from '@/components/modal-button'
import { formatCurrency } from '@/utils/format-currency'

const parcelsDetailsModal = tv({
  slots: {
    container:
      'flex justify-between border-b border-primary px-4 py-2 items-center',
    parcelSection: 'flex flex-col gap-2',
    statusSpan: 'flex items-center gap-2',
    status: 'w-4 h-4 bg-red rounded-full',
    section: 'flex flex-col gap-6 justify-around',
    actions: 'flex justify-center gap-2',
    observation: 'w-[200px] break-words',
  },
  variants: {
    paid: {
      true: {
        status: 'bg-green-500',
      },
    },
  },
})

interface ParcelsDetailsModalProps {
  parcels: IParcel[]
  transactionId: number
}

const {
  container,
  parcelSection,
  statusSpan,
  status,
  section,
  actions,
  observation,
} = parcelsDetailsModal()

export const ParcelsDetailsModal = ({
  parcels,
  transactionId,
}: ParcelsDetailsModalProps) => {
  const { removeParams, params } = useUrlParams()
  const isOpen = params.has(`parcels_details_${transactionId}`)

  const handleCloseModal = useCallback(() => {
    removeParams([`parcels_details_${transactionId}`])
  }, [removeParams, transactionId])

  return (
    <Modal.Root isOpen={isOpen} onClose={handleCloseModal}>
      <Modal.Header>Parcelas</Modal.Header>

      <Modal.Content>
        {parcels.map((parcel) => {
          return (
            <div key={parcel.id} className={container()}>
              <section className={parcelSection()}>
                <span className={statusSpan()}>
                  <strong>Parcela:</strong>
                  <p>{parcel.parcel}</p>
                </span>
                <span className={statusSpan()}>
                  <strong>Valor:</strong>
                  <p>{formatCurrency(parcel.value)}</p>
                </span>
                <span className={statusSpan()}>
                  <strong>Status</strong>
                  <div
                    className={status({ paid: parcel.paymentDate !== null })}
                  />
                </span>
              </section>
              <section className={section()}>
                <span>
                  <strong>Observação</strong>
                  <p className={observation()}>{parcel.observation}</p>
                </span>
                <span className={section()}>
                  <span>
                    <strong>Vencimento</strong>
                    <p>{formatDate(parcel.dueDate)}</p>
                  </span>
                </span>
              </section>
              <section className={section()}>
                <span>
                  <strong>Pago em</strong>
                  <p>{formatDate(parcel.paymentDate) ?? '-'}</p>
                </span>
                <span className={actions()}>
                  <ModalButton
                    params={{
                      pay_parcel: true,
                      parcel: parcel.id,
                      parcel_number: parcel.parcel,
                      transaction_id: transactionId,
                    }}
                  >
                    <FiCheck size={30} className="text-green-500" />
                  </ModalButton>
                  <ModalButton
                    params={{
                      rollback_parcel: true,
                      parcel: parcel.id,
                      parcel_number: parcel.parcel,
                      transaction_id: transactionId,
                    }}
                  >
                    <FiX size={30} className="text-red" />
                  </ModalButton>
                </span>
              </section>
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

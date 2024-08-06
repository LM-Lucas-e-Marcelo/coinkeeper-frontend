/* eslint-disable @next/next/no-img-element */
'use client'

import { Modal } from '../modal'
import { Button } from '@/components/form/button'
import { useCallback } from 'react'
import { useUrlParams } from '@/hooks/use-params'
import { tv } from 'tailwind-variants'

const customerDocumentsModal = tv({
  slots: {
    emptyState: 'p-2 text-xl mt-4',
    container: 'flex gap-4 items-center justify-center',
    button: 'w-52 h-52',
    image: 'w-full h-full object-contain',
  },
})

interface CustomerDocumentsModalProps {
  documentUrl?: string
  proofAddressUrl?: string
}

const { emptyState, container, button, image } = customerDocumentsModal()

export const CustomerDocumentsModal = ({
  documentUrl,
  proofAddressUrl,
}: CustomerDocumentsModalProps) => {
  const { removeParams, params } = useUrlParams()
  const isOpen = params.has('customer_documents')

  const handleCloseModal = useCallback(() => {
    removeParams(['customer_documents'])
  }, [removeParams])

  const handleRedirectToDocumentUrl = (url: string) => {
    window.open(url, '_blank')
  }

  return (
    <Modal.Root isOpen={isOpen} onClose={handleCloseModal}>
      <Modal.Header>Documentos</Modal.Header>
      {!documentUrl && !proofAddressUrl && (
        <h1 className={emptyState()}>Nenhum documento encontrado</h1>
      )}
      <Modal.Content>
        <div className={container()}>
          {documentUrl && (
            <button
              onClick={() => handleRedirectToDocumentUrl(documentUrl)}
              className={button()}
            >
              <img
                className={image()}
                src={documentUrl}
                alt="customer document"
              />
            </button>
          )}

          {proofAddressUrl && (
            <button
              onClick={() => handleRedirectToDocumentUrl(proofAddressUrl)}
              className={button()}
            >
              <img
                className={image()}
                src={proofAddressUrl}
                alt="proof address document"
              />
            </button>
          )}
        </div>
      </Modal.Content>
      <Modal.Actions>
        <Button type="button" onClick={handleCloseModal} variant="danger">
          Fechar
        </Button>
      </Modal.Actions>
    </Modal.Root>
  )
}

/* eslint-disable @next/next/no-img-element */
'use client'
import { IMedia } from '@/http/customers/get-customer-by-id'
import { FiTrash2 } from '@/assets/icons'
import { ModalButton } from '@/components/modal-button'

interface CustomerDocumentsProps {
  medias: IMedia[]
  customerId: number
}

export const CustomerDocuments = ({
  medias,
  customerId,
}: CustomerDocumentsProps) => {
  const handleRedirectToFile = (url: string) => {
    window.open(url, '_blank')
  }

  return (
    <div className="pt-3">
      <h1 className="text-2xl mb-3 block text-center">Documentos</h1>
      <section className="flex gap-3 flex-wrap items-center justify-center">
        {medias.map((media) => (
          <div
            key={media.id}
            className="cursor-pointer relative"
            onClick={() => handleRedirectToFile(media.fileUrl)}
          >
            <span className="absolute top-3 right-3 cursor-pointer text-red">
              <ModalButton
                params={{
                  [`delete_file_${media.id}`]: true,
                  file_name: media.file,
                  file_id: media.id,
                  customer_id: customerId,
                }}
              >
                <FiTrash2 size={24} />
              </ModalButton>
            </span>
            <img
              className="max-w-[200px] object-contain rounded-md"
              src={media.fileUrl}
              alt="documentos"
            />
            <p>{media.file}</p>
          </div>
        ))}
      </section>
    </div>
  )
}

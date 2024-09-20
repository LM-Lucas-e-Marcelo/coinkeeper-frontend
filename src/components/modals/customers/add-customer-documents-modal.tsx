'use client'

import { ButtonGroup } from '@/components/form/button-group'
import { Modal } from '../modal'
import { Button } from '@/components/form/button'
import { Input } from '@/components/form/input'
import { toast } from 'react-toastify'
import { ChangeEvent, FormEvent, useCallback, useState } from 'react'
import { useUrlParams } from '@/hooks/use-params'

import { addCustomerDocumentsAction } from '@/actions/customers/add-customer-documents-action'

interface AddCustomerDocumentsModalProps {
  customerId?: number
}

export const AddCustomerDocumentsModal = ({
  customerId,
}: AddCustomerDocumentsModalProps) => {
  const [files, setFiles] = useState<FileList | null>(null)
  const { removeParams, params } = useUrlParams()
  const isOpen = params.has('add_file_modal')

  const handleCloseModal = useCallback(() => {
    removeParams(['add_file_modal'])
  }, [removeParams])

  const handleSubmit = async (event: FormEvent): Promise<void> => {
    event.preventDefault()

    if (!files) {
      toast('Adicione ao menos um documento', { type: 'error' })
      return
    }

    const formData = new FormData()

    Array.from(files).forEach((file) => {
      formData.append('files', file)
    })

    await addCustomerDocumentsAction({
      files: formData,
      customerId: customerId!,
    })

    toast('Documentos adicionados com sucesso!', {
      type: 'success',
    })
    const input = document.getElementById('fileInput') as HTMLInputElement

    input.value = ''
    handleCloseModal()
    setFiles(null)
  }

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.currentTarget

    if (files) {
      setFiles(files)
    }
  }

  if (!customerId) return

  return (
    <Modal.Root isOpen={isOpen} onClose={handleCloseModal}>
      <Modal.Header>Cadastrar Documentos</Modal.Header>
      <form onSubmit={handleSubmit}>
        <Modal.Content>
          <Input
            label="Documentos"
            type="file"
            name="files"
            multiple
            onChange={handleFileChange}
            id="fileInput"
          />
          <Input defaultValue={customerId} type="hidden" name="customerId" />
        </Modal.Content>
        <Modal.Actions>
          <ButtonGroup>
            <Button type="button" onClick={handleCloseModal} variant="danger">
              Fechar
            </Button>

            <Button type="submit">Adicionar</Button>
          </ButtonGroup>
        </Modal.Actions>
      </form>
    </Modal.Root>
  )
}

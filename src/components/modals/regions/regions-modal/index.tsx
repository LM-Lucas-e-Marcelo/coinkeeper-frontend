'use client'

import { ButtonGroup } from '@/components/form/button-group'
import { Modal } from '../../modal'
import { Button } from '@/components/form/button'
import { useCallback } from 'react'
import { useUrlParams } from '@/hooks/use-params'
import { IRegions } from '@/http/regions/get-regions'
import { RegionsTable } from './regions-table'
import { ModalButton } from '@/components/modal-button'
import { ManagementRegionModal } from '../management-region-modal'
import { DeleteRegionModal } from '../delete-region-modal'

interface RegionsModalProps {
  regions: IRegions
}

export const RegionsModal = ({ regions }: RegionsModalProps) => {
  const { removeParams, params } = useUrlParams()
  const isOpen = params.has('regions')

  const handleCloseModal = useCallback(() => {
    removeParams(['regions'])
  }, [removeParams])

  return (
    <Modal.Root isOpen={isOpen} onClose={handleCloseModal} size="lg">
      <Modal.Header>Regiões</Modal.Header>
      <Modal.Content>
        <div className="w-full flex center justify-end my-2">
          <ModalButton params={{ management_region: true }}>
            <Button>Cadastrar</Button>
          </ModalButton>
        </div>

        <RegionsTable regions={regions} />
      </Modal.Content>
      <Modal.Actions>
        <ButtonGroup>
          <Button type="button" onClick={handleCloseModal} variant="danger">
            Fechar
          </Button>
        </ButtonGroup>
      </Modal.Actions>
      <ManagementRegionModal />
      <DeleteRegionModal />
    </Modal.Root>
  )
}

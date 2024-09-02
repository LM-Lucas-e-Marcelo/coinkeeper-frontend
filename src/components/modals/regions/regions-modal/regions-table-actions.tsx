import { ButtonGroup } from '@/components/form/button-group'
import { ModalButton } from '@/components/modal-button'
import { FiEdit, FiTrash2 } from '@/assets/icons'

import { IRegion } from '@/http/regions/get-regions'

export const TableActions = ({ region }: { region: IRegion }) => {
  return (
    <ButtonGroup>
      <ModalButton
        params={{
          management_region: true,
          region: region.id,
          region_name: region.name,
        }}
      >
        <FiEdit size={20} className="text-orange" />
      </ModalButton>
      <ModalButton
        params={{
          delete_region: true,
          region: region.id,
          region_name: region.name,
        }}
      >
        <FiTrash2 size={20} className="text-red" />
      </ModalButton>
    </ButtonGroup>
  )
}

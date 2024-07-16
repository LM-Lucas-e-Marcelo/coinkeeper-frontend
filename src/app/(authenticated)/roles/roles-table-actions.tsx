import { ButtonGroup } from '@/components/form/button-group'
import { ModalButton } from '@/components/modal-button'
import { FiEdit, FiTrash2 } from '@/assets/icons'
import { IRole } from '@/http/roles/get-roles'

export const TableActions = ({ role }: { role: IRole }) => {
  return (
    <ButtonGroup>
      <ModalButton params={{ update_role: true, role: role.id }}>
        <FiEdit size={20} className="text-orange" />
      </ModalButton>
      <ModalButton
        params={{
          delete_role: true,
          role: role.id,
          name: role.name,
        }}
      >
        <FiTrash2 size={20} className="text-red" />
      </ModalButton>
    </ButtonGroup>
  )
}

import { ButtonGroup } from '@/components/form/button-group'
import { ModalButon } from '@/components/modal-button'
import { FiEdit, FiTrash2 } from '@/assets/icons'
import { IRole } from '@/types/roles/get-roles'

export const TableActions = ({ role }: { role: IRole }) => {
  return (
    <ButtonGroup>
      <ModalButon params={{ update_role: true, role: role.id }}>
        <FiEdit size={20} className="text-orange" />
      </ModalButon>
      <ModalButon
        params={{
          delete_role: true,
          user: role.id,
          name: role.name,
        }}
      >
        <FiTrash2 size={20} className="text-red" />
      </ModalButon>
    </ButtonGroup>
  )
}

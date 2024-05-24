import { ButtonGroup } from '@/components/form/button-group'
import { ModalButon } from '@/components/modal-button'
import { FiEdit, FiTrash2 } from '@/assets/icons'
import { IUser } from '@/types/users/get-users'

export const TableActions = ({ user }: { user: IUser }) => {
  return (
    <ButtonGroup>
      <ModalButon params={{ update_user: true, user: user.id }}>
        <FiEdit size={20} className="text-orange" />
      </ModalButon>
      <ModalButon
        params={{
          delete_user: true,
          user: user.id,
          name: user.name,
        }}
      >
        <FiTrash2 size={20} className="text-red" />
      </ModalButon>
    </ButtonGroup>
  )
}

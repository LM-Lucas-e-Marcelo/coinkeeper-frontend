import { ButtonGroup } from '@/components/form/button-group'
import { ModalButton } from '@/components/modal-button'
import { FiEdit, FiTrash2 } from '@/assets/icons'
import { IUser } from '@/http/users/get-users'

export const TableActions = ({ user }: { user: IUser }) => {
  return (
    <ButtonGroup>
      <ModalButton params={{ management_user: true, user: user.id }}>
        <FiEdit size={20} className="text-orange" />
      </ModalButton>
      <ModalButton
        params={{
          delete_user: true,
          user: user.id,
          name: user.name,
        }}
      >
        <FiTrash2 size={20} className="text-red" />
      </ModalButton>
    </ButtonGroup>
  )
}

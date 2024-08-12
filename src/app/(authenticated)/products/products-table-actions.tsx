import { ButtonGroup } from '@/components/form/button-group'
import { ModalButton } from '@/components/modal-button'
import { FiEdit, FiTrash2 } from '@/assets/icons'
import { IProduct } from '@/http/products/get-products'

export const TableActions = ({ product }: { product: IProduct }) => {
  return (
    <ButtonGroup>
      <ModalButton params={{ management_product: true, product: product.id }}>
        <FiEdit size={20} className="text-orange" />
      </ModalButton>
      <ModalButton
        params={{
          delete_product: true,
          product: product.id,
          name: product.name,
        }}
      >
        <FiTrash2 size={20} className="text-red" />
      </ModalButton>
    </ButtonGroup>
  )
}

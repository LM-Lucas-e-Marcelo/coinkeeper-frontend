'use client'

import { ButtonGroup } from '@/components/form/button-group'
import { Modal } from '../modal'
import { Button } from '@/components/form/button'
import { Input } from '@/components/form/input'
import { toast } from 'react-toastify'
import { useCallback, useEffect, useState } from 'react'
import { useUrlParams } from '@/hooks/use-params'
import { useFormState } from '@/hooks/use-form-state'
import { Select } from '@/components/form/select'
import { IProduct, IProducts } from '@/http/products/get-products'
import { createProductAction } from '@/actions/products/create-product-action'
import { updateProductAction } from '@/actions/products/update-product-action'

interface ManagementProductModalProps {
  products: IProducts
}

export const ManagementProductModal = ({
  products,
}: ManagementProductModalProps) => {
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null)
  const { removeParams, params } = useUrlParams()
  const isOpen = params.has('management_product')
  const productId = params.get('product')

  const handleCloseModal = useCallback(() => {
    removeParams(['management_product', 'product'])
    setSelectedProduct(null)
  }, [removeParams])

  const onSuccess = (message: string | null) => {
    toast(message, { type: 'success' })
    handleCloseModal()
  }
  const onError = (message: string | null) => {
    toast(message, { type: 'error' })
  }

  const [{ errors }, handleSubmit, isPending] = useFormState({
    action: productId ? updateProductAction : createProductAction,
    onError,
    onSuccess,
  })

  useEffect(() => {
    if (productId && isOpen) {
      const product = products?.items.find(
        (product) => product.id === +productId,
      )

      if (!product) {
        return handleCloseModal()
      }

      setSelectedProduct(product)
    }
  }, [handleCloseModal, isOpen, productId, products?.items])

  if (productId && !selectedProduct) return

  const parcelsQuantity = Array.from({ length: 60 })
  const parcelOptions = parcelsQuantity.map((_, index) => ({
    label: index + 1,
    value: index + 1,
  }))

  return (
    <Modal.Root isOpen={isOpen} onClose={handleCloseModal}>
      <Modal.Header>{productId ? 'Editar' : 'Cadastrar'} Produto</Modal.Header>
      <form onSubmit={handleSubmit}>
        <Modal.Content>
          <div className="flex gap-3 flex-col">
            <Input
              label="Nome"
              name="name"
              error={errors?.name}
              defaultValue={selectedProduct?.name}
            />
            <div className="flex gap-3 items-start">
              <Select
                options={parcelOptions}
                label="Parcelas"
                name="parcels"
                error={errors?.parcels}
                defaultValue={selectedProduct?.parcels || 1}
              />
              <Input
                label="Valor"
                name="value"
                error={errors?.value}
                defaultValue={selectedProduct?.value}
              />
            </div>

            <Input name="id" type="hidden" defaultValue={selectedProduct?.id} />
          </div>
        </Modal.Content>
        <Modal.Actions>
          <ButtonGroup>
            <Button type="button" onClick={handleCloseModal} variant="danger">
              Fechar
            </Button>

            <Button type="submit" disabled={isPending}>
              {productId ? 'Editar' : 'Cadastrar'}
            </Button>
          </ButtonGroup>
        </Modal.Actions>
      </form>
    </Modal.Root>
  )
}

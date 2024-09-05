'use client'

import { ButtonGroup } from '@/components/form/button-group'
import { Modal } from '../modal'
import { Button } from '@/components/form/button'
import { Input } from '@/components/form/input'
import { toast } from 'react-toastify'
import { FormEvent, useCallback, useRef } from 'react'
import { useUrlParams } from '@/hooks/use-params'
import { useFormState } from '@/hooks/use-form-state'
import { Select } from '@/components/form/select'
import { Textarea } from '@/components/form/textarea'
import { createTransactionAction } from '@/actions/transactions/create-transaction-action'
import { CustomerDetailsPageProps } from '@/app/(authenticated)/customers/[id]/page'
import { SUPPORTED_FILES } from '@/constants/files'
import { IProducts } from '@/http/products/get-products'

interface CreateTransactionModalProps extends CustomerDetailsPageProps {
  products: IProducts
}

export const CreateTransactionModal = ({
  params: customerParams,
  products,
}: CreateTransactionModalProps) => {
  const { removeParams, params } = useUrlParams()
  const isOpen = params.has('create_transaction')
  const formRef = useRef<HTMLFormElement>(null)

  const handleCloseModal = useCallback((): void => {
    removeParams(['create_transaction'])
  }, [removeParams])

  const handleChange = useCallback(
    (event: FormEvent<HTMLInputElement>): void => {
      const { value: inputValue } = event.currentTarget
      const form = formRef.current

      const selectedProduct = products.items.find(
        (product) => product.id === +inputValue,
      )

      const formValue = form?.elements.namedItem('value') as HTMLInputElement
      const parcel = form?.elements.namedItem(
        'totalParcels',
      ) as HTMLSelectElement
      const product = form?.elements.namedItem('products') as HTMLInputElement
      const companyExpense = form?.elements.namedItem(
        'companyExpense',
      ) as HTMLInputElement
      const differenceBetweenParcels = form?.elements.namedItem(
        'differenceBetweenParcels',
      ) as HTMLInputElement

      if (selectedProduct && formValue && parcel && product) {
        formValue.value = String(selectedProduct.value)
        parcel.value = String(selectedProduct.parcels)
        product.value = selectedProduct.name
        companyExpense.value = String(selectedProduct.companyExpense)
        differenceBetweenParcels.value = String(
          selectedProduct.differenceBetweenParcels,
        )
      }
    },
    [products.items],
  )

  const onSuccess = (message: string | null) => {
    toast(message, { type: 'success' })
    handleCloseModal()
  }
  const onError = (message: string | null) => {
    toast(message, { type: 'error' })
  }

  const [{ errors }, handleSubmit, isPending] = useFormState({
    action: createTransactionAction,
    onError,
    onSuccess,
  })

  const parcelsQuantity = Array.from({ length: 60 })
  const parcelOptions = parcelsQuantity.map((_, index) => ({
    label: index + 1,
    value: index + 1,
  }))

  const currentDate = new Date()
  const nextDay = new Date(currentDate).setDate(currentDate.getDate() + 1)
  const formattedDate = new Date(nextDay).toISOString().split('T')[0]

  return (
    <Modal.Root isOpen={isOpen} onClose={handleCloseModal}>
      <Modal.Header>Cadastrar transação</Modal.Header>
      <form onSubmit={handleSubmit} ref={formRef}>
        <Modal.Content>
          <div className="flex gap-3 flex-col">
            <Input
              name="customerId"
              type="hidden"
              defaultValue={customerParams?.id}
            />
            <Input
              label="Produtos"
              name="products"
              list="products"
              onChange={handleChange}
            />
            <datalist id="products">
              {products.items.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </datalist>
            <Input
              label="Data da primeira parcela"
              name="firstDueDate"
              type="date"
              defaultValue={formattedDate}
              error={errors?.firstDueDate}
            />

            <div className="flex gap-3 items-start">
              <Select
                label="Total de parcelas"
                name="totalParcels"
                options={parcelOptions}
                error={errors?.totalParcels}
              />
              <Input
                label="Valor"
                name="value"
                type="number"
                error={errors?.value}
              />
            </div>
            <div className="flex gap-3 items-start">
              <Input
                label="Intervalo em dias entre os pagamentos"
                name="differenceBetweenParcels"
                error={errors?.differenceBetweenParcels}
              />
              <Input
                label="Despesas"
                name="companyExpense"
                error={errors?.companyExpense}
              />
            </div>
            <Input
              type="file"
              label="Contrato"
              name="contractFile"
              error={errors?.contractFile}
              accept={SUPPORTED_FILES.toString()}
            />
            <Textarea
              label="Descrição"
              name="description"
              error={errors?.description}
            />
          </div>
        </Modal.Content>
        <Modal.Actions>
          <ButtonGroup>
            <Button type="button" onClick={handleCloseModal} variant="danger">
              Fechar
            </Button>

            <Button type="submit" disabled={isPending}>
              Cadastrar transação
            </Button>
          </ButtonGroup>
        </Modal.Actions>
      </form>
    </Modal.Root>
  )
}

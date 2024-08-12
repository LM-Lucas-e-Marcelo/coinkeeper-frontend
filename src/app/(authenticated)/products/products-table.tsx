import { Table } from '@/components/table'
import { formatCurrency } from '@/utils/format-currency'
import { TableActions } from './products-table-actions'
import { getProducts } from '@/http/products/get-products'
import { ManagementProductModal } from '@/components/modals/products/management-product-modal'
import { DeleteProductModal } from '@/components/modals/products/delete-product-modal'

interface ProductsTableProps {
  searchParams: {
    per?: string
    content?: string
  }
}

export async function ProductsTable({ searchParams }: ProductsTableProps) {
  const { products } = await getProducts(searchParams)

  return (
    <>
      <Table.Root>
        <Table.Head>
          <Table.Row>
            <Table.Cell>Nome</Table.Cell>
            <Table.Cell>Parcelas</Table.Cell>
            <Table.Cell>Valor</Table.Cell>
            <Table.Cell>Ações</Table.Cell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {products?.items.map((product) => (
            <Table.Row key={product.id}>
              <Table.Cell>{product.name}</Table.Cell>
              <Table.Cell>{product.parcels}</Table.Cell>
              <Table.Cell>{formatCurrency(product.value)}</Table.Cell>
              <Table.Cell>
                <TableActions product={product} />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      <ManagementProductModal products={products} />
      <DeleteProductModal />
    </>
  )
}

import { faker } from '@faker-js/faker'
import { formatGenericPayload } from '../utils/format-generic-payload'
import { IProduct } from '../../../src/http/products/get-products'

export function createRandomProduct(): IProduct {
  return {
    id: faker.number.int({ min: 1, max: 1000 }),
    name: faker.commerce.product(),
    value: faker.number.int({ min: 1, max: 10000 }),
    parcels: faker.number.int({ min: 1, max: 24 }),
  }
}

const productsList = faker.helpers.multiple(createRandomProduct, {
  count: 20,
})

export const Products = formatGenericPayload<IProduct[]>({
  data: productsList,
})

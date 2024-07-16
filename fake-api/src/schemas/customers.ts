import { faker } from '@faker-js/faker'
import { formatGenericPayload } from '../utils/format-generic-payload'
import { ICustomer } from '../../../src/http/customers/get-customers'
import { ICustomerById } from '../../../src/http/customers/get-customer-by-id'

export function createRandomCustomer(): ICustomer {
  return {
    id: faker.number.int({ min: 1, max: 1000 }),
    name: faker.person.fullName(),
    totalDebt: faker.number.int({ min: 1, max: 10000 }),
  }
}

function createCustomerById(): ICustomerById {
  return {
    id: faker.number.int({ min: 1, max: 1000 }),
    isActive: faker.datatype.boolean(),
    name: faker.person.fullName(),
    totalDebt: faker.number.int({ min: 1, max: 10000 }),
    document: '999.999.999-99',
    phone: faker.phone.number(),
    phoneWhatsapp: faker.phone.number(),
    address: 'Rua Manoel Mariano Ferreira, 123 - Biguaçu - SC',
    email: faker.internet.email(),
  }
}

const customersList = faker.helpers.multiple(createRandomCustomer, {
  count: 20,
})

export const Customers = formatGenericPayload<ICustomer[]>({
  data: customersList,
})

export const Customer = createCustomerById()

import { faker } from '@faker-js/faker'
import { formatGenericPayload } from '../utils/format-generic-payload'
import { ICustomer } from '../../../src/http/customers/get-customers'
import {
  ICustomerById,
  IMedia,
} from '../../../src/http/customers/get-customer-by-id'

export function createRandomCustomer(): ICustomer {
  return {
    id: faker.number.int({ min: 1, max: 1000 }),
    name: faker.person.fullName(),
    totalDebt: faker.number.int({ min: 1, max: 10000 }),
    score: faker.number.int({ min: 1, max: 1000 }),
  }
}

function createRandomMedia(): IMedia {
  return {
    id: faker.number.int({ min: 1, max: 1000 }),
    file: faker.lorem.word(),
    fileUrl:
      'https://img-cdn.pixlr.com/image-generator/history/65ba5701b4f4f4419f746bc3/806ecb58-167c-4d20-b658-a6a6b2f221e9/medium.webp',
  }
}

const mediaList = faker.helpers.multiple(createRandomMedia, {
  count: 10,
})

function createCustomerById(): ICustomerById {
  return {
    region: {
      id: faker.number.int({ min: 1, max: 1000 }),
      name: faker.location.city(),
    },
    id: faker.number.int({ min: 1, max: 1000 }),
    isActive: faker.datatype.boolean(),
    name: faker.person.fullName(),
    totalDebt: faker.number.int({ min: 1, max: 10000 }),
    score: faker.number.int({ min: 600, max: 1000 }),
    document: '999.999.999-99',
    phone: faker.phone.number(),
    phoneWhatsapp: faker.phone.number(),
    email: faker.internet.email(),
    businessAddress: 'Rua Manoel Mariano Ferreira, 123 - Biguaçu - SC',
    residentialAddress: 'Rua Manoel Mariano Ferreira, 123 - Biguaçu - SC',
    medias: mediaList,
  }
}

export function createCustomerWithDebt() {
  return {
    id: faker.number.int({ min: 1, max: 10000 }),
    name: faker.person.fullName(),
    totalDebt: faker.number.int({ min: 1, max: 10000 }),
    totalParcels: faker.number.int({ min: 1, max: 10000 }),
  }
}

const customersList = faker.helpers.multiple(createRandomCustomer, {
  count: 20,
})

export const customersWithDebtList = faker.helpers.multiple(
  createCustomerWithDebt,
  {
    count: 20,
  },
)

export const Customers = formatGenericPayload<ICustomer[]>({
  data: customersList,
})

export const Customer = createCustomerById()

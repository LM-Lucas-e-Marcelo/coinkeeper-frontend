import { ICustomer } from '../../../../src/http/pending/get-pending-customers'
import { faker } from '@faker-js/faker'

export function createRandomCustomer(): ICustomer {
  return {
    id: faker.number.int({ max: 1000, min: 1 }),
    name: faker.person.fullName(),
    totalDebt: faker.number.int({ max: 1000, min: 1 }),
  }
}

const customersList: ICustomer[] = faker.helpers.multiple(
  createRandomCustomer,
  {
    count: 20,
  },
)

export const PendingCustomers = {
  totalReceiver: faker.number.int({ max: 1000, min: 1 }),
  totalClientsInDebt: faker.number.int({ max: 1000, min: 1 }),
  customers: customersList,
}

import { faker } from '@faker-js/faker'

import {
  IParcel,
  ITransactions,
} from '../../../src/http/transactions/get-transactions'

function createRandomParcel(): IParcel {
  return {
    id: 26,
    dueDate: '2024-01-09',
    observation: faker.lorem.words(),
    parcel: faker.number.int({ min: 1, max: 10 }),
    value: 1000,
    paymentDate: '2024/01/09',
  }
}

const parcels = faker.helpers.multiple(createRandomParcel, { count: 10 })

export function createRandomTransaction(): ITransactions {
  return {
    id: faker.number.int({ min: 1, max: 1000 }),
    totalParcels: 10,
    totalParcelsPaid: faker.number.int({ min: 1, max: 9 }),
    differenceBetweenParcels: faker.number.int({ min: 1, max: 10000 }),
    description: faker.lorem.words(),
    value: faker.number.int({ min: 1, max: 10000 }),
    paymentDate: '2024/01/09',
    parcels,
  }
}

export const transactionList: ITransactions[] = faker.helpers.multiple(
  createRandomTransaction,
  {
    count: 20,
  },
)

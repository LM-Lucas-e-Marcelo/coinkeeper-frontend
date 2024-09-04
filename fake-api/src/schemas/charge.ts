import { faker } from '@faker-js/faker'
import { ICharge, ICharges } from '../../../src/http/get-charges'

function createRandomCharge(): ICharge {
  return {
    id: faker.number.int({ min: 1, max: 1000 }),
    name: faker.person.fullName(),
    totalDebt: faker.number.int({ min: 1, max: 1000 }),
    totalParcels: faker.number.int({ min: 1, max: 10 }),
    parcelActual: faker.number.int({ min: 1, max: 300 }),
  }
}

const chargesList = faker.helpers.multiple(createRandomCharge, {
  count: 20,
})

export const Charges: ICharges = {
  totalReceiver: faker.number.int({ min: 1, max: 1000 }),
  totalClientsInDebt: faker.number.int({ min: 1, max: 1000 }),
  customers: chargesList,
}

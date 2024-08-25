import { faker } from '@faker-js/faker'
import { ICompany } from '../../../src/http/companies/get-companies'

function createRandomCompany(): ICompany {
  return {
    id: faker.number.int({ min: 1, max: 1000 }),
    name: faker.commerce.department(),
  }
}

export const companiesList = faker.helpers.multiple(createRandomCompany, {
  count: 20,
})

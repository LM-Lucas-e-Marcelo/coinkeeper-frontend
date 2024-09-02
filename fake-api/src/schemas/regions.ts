import { faker } from '@faker-js/faker'
import { formatGenericPayload } from '../utils/format-generic-payload'
import { IRegion } from '../../../src/http/regions/get-regions'

export function createRandomRegion(): IRegion {
  return {
    id: faker.number.int({ min: 1, max: 1000 }),
    name: faker.location.city(),
  }
}

const regionList = faker.helpers.multiple(createRandomRegion, {
  count: 20,
})

export const Regions = formatGenericPayload<IRegion[]>({
  data: regionList,
})

import { faker } from '@faker-js/faker'
import { formatGenericPayload } from '../utils/format-generic-payload'
import { IRole } from '../../../src/http/roles/get-roles'

export function createRandomRole(): IRole {
  return {
    id: faker.number.int({ max: 1000, min: 1 }),
    name: faker.lorem.word(),
  }
}

const rolesList = faker.helpers.multiple(createRandomRole, {
  count: 20,
})

export const Roles = formatGenericPayload<IRole[]>({ data: rolesList })

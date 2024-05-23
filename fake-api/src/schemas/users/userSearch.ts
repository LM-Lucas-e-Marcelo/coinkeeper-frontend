import { IUser } from '../../../../src/types/users/get-users'
import { faker } from '@faker-js/faker'
import { formatGenericPayload } from '../../utils/format-generic-payload'

export function createRandomUser(): IUser {
  return {
    id: faker.number.int({ max: 1000, min: 1 }),
    username: faker.internet.userName(),
    name: faker.person.fullName(),
    role: {
      id: 9,
      name: 'fake-role',
    },
  }
}

const usersList = faker.helpers.multiple(createRandomUser, {
  count: 10,
})

export const Users = formatGenericPayload<IUser[]>({ data: usersList })

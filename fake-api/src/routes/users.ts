import { Elysia } from 'elysia'
import { Users } from '../schemas/users/userSearch'

const usersRoute = new Elysia()

usersRoute.get('/users/search', ({ set }) => {
  set.status = 200

  return Users
})

usersRoute.post('/users', ({ set }) => {
  set.status = 201
})

export { usersRoute }

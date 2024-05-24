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

usersRoute.patch('/users/:id', ({ set }) => {
  set.status = 204
})

usersRoute.delete('/users/:id', ({ set }) => {
  set.status = 204
})

export { usersRoute }

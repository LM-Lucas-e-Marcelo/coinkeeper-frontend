import { Elysia } from 'elysia'
import { Roles } from '../schemas/roles'

const rolesRoute = new Elysia()

rolesRoute.get('/roles/search', ({ set }) => {
  set.status = 200

  return Roles
})

rolesRoute.post('/roles', ({ set }) => {
  set.status = 201
})

// usersRoute.patch('/users/:id', ({ set }) => {
//   set.status = 204
// })

rolesRoute.delete('/roles/:id', ({ set }) => {
  set.status = 204
})

export { rolesRoute }

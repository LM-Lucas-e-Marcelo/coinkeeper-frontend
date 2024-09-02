import { Elysia } from 'elysia'
import { Regions } from '../schemas/regions'

const regionsRoute = new Elysia()

regionsRoute.get('/regions/search', ({ set }) => {
  set.status = 200

  return Regions
})

regionsRoute.post('/regions', ({ set }) => {
  set.status = 201
})

regionsRoute.patch('/regions/:id', ({ set }) => {
  set.status = 204
})

regionsRoute.delete('/regions/:id', ({ set }) => {
  set.status = 204
})

export { regionsRoute }

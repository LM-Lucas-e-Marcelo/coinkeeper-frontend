import { Elysia } from 'elysia'
import { Customer, Customers } from '../schemas/customers'

const customersRoute = new Elysia()

customersRoute.get('/customers/search', ({ set }) => {
  set.status = 200

  return Customers
})

customersRoute.get('/customers/:id', ({ set }) => {
  set.status = 200

  return Customer
})

customersRoute.post('/customers', ({ set }) => {
  set.status = 201
})

customersRoute.patch('/customers/:id', ({ set }) => {
  set.status = 204
})

customersRoute.delete('/customers/:id', ({ set }) => {
  set.status = 204
})

export { customersRoute }

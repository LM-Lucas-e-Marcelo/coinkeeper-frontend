import { Elysia } from 'elysia'
import {
  Customer,
  Customers,
  customersWithDebtList,
} from '../schemas/customers'

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

customersRoute.post('/customers/:customerId/medias', ({ set }) => {
  set.status = 201
})

customersRoute.post('/customers/pay-many-parcels', ({ set }) => {
  set.status = 201
})

customersRoute.patch('/customers/inform-parcels-not-paid', ({ set }) => {
  set.status = 204
})

customersRoute.patch('/customers/:id', ({ set }) => {
  set.status = 204
})

customersRoute.delete('/customers/:id', ({ set }) => {
  set.status = 204
})

customersRoute.delete('/customers/:id/media/:mediaId', ({ set }) => {
  set.status = 204
})

customersRoute.get('/customers/with-debt', ({ set }) => {
  set.status = 200

  return customersWithDebtList
})

export { customersRoute }

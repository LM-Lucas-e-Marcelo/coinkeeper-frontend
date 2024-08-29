import { Elysia } from 'elysia'
import { PendingCustomers } from '../../schemas/pending/pending-customers'

const pendingCustomersRoute = new Elysia()

pendingCustomersRoute.get('/pendings/customers', ({ set }) => {
  set.status = 200

  return PendingCustomers
})

export { pendingCustomersRoute }

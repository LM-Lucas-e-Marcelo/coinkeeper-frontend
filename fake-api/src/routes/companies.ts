import { Elysia } from 'elysia'
import { companiesList } from '../schemas/companies'

const companiesRoute = new Elysia()

companiesRoute.get('/organizations/user/my-organizations', ({ set }) => {
  set.status = 200

  return companiesList
})

companiesRoute.post('/auth/sign-in/organization', ({ set }) => {
  set.status = 200

  return {
    token: 'company-token',
    organization: {
      name: 'Loja do relampago Marquinhos',
    },
  }
})

// customersRoute.post('/customers', ({ set }) => {
//   set.status = 201
// })

// customersRoute.patch('/customers/:id', ({ set }) => {
//   set.status = 204
// })

// customersRoute.delete('/customers/:id', ({ set }) => {
//   set.status = 204
// })

export { companiesRoute }

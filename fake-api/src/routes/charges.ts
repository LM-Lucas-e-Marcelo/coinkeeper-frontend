import { Elysia } from 'elysia'
import { Charges } from '../schemas/charge'

const chargesRoute = new Elysia()

chargesRoute.get('/pendings/customers/charge', ({ set }) => {
  set.status = 200

  return Charges
})

// companiesRoute.post('/auth/sign-in/organization', ({ set }) => {
//   set.status = 200

//   return {
//     token: 'company-token',
//     organization: {
//       name: 'Loja do relampago Marquinhos',
//     },
//   }
// })

export { chargesRoute }

import { Elysia } from 'elysia'
import { usersRoute } from './routes/users'
import { rolesRoute } from './routes/roles'
import { authRoute } from './routes/auth'
import { customersRoute } from './routes/customers'
import { transactionsRoute } from './routes/transactions'
import { productsRoute } from './routes/products'

const app = new Elysia()

app.use(usersRoute)
app.use(rolesRoute)
app.use(authRoute)
app.use(customersRoute)
app.use(transactionsRoute)
app.use(productsRoute)

export { app }

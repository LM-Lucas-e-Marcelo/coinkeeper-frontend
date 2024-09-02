import { Elysia } from 'elysia'
import { usersRoute } from './routes/users'
import { rolesRoute } from './routes/roles'
import { authRoute } from './routes/auth'
import { customersRoute } from './routes/customers'
import { transactionsRoute } from './routes/transactions'
import { productsRoute } from './routes/products'
import { organizationExpensesRoute } from './routes/organization-expenses'
import { pendingCustomersRoute } from './routes/pendings/customers'
import { pendingExpensesRoute } from './routes/pendings/expenses'
import { companiesRoute } from './routes/companies'
import { dashboardRoutes } from './routes/dashboard'
import { whatsappRoute } from './routes/whatsapp'
import { regionsRoute } from './routes/regions'

const app = new Elysia()

app.use(usersRoute)
app.use(rolesRoute)
app.use(authRoute)
app.use(customersRoute)
app.use(transactionsRoute)
app.use(productsRoute)
app.use(organizationExpensesRoute)
app.use(pendingCustomersRoute)
app.use(pendingExpensesRoute)
app.use(companiesRoute)
app.use(dashboardRoutes)
app.use(whatsappRoute)
app.use(regionsRoute)

export { app }

import { Elysia } from 'elysia'
import { usersRoute } from './routes/users'
import { rolesRoute } from './routes/roles'
import { authRoute } from './routes/auth'

const app = new Elysia()

app.use(usersRoute)
app.use(rolesRoute)
app.use(authRoute)

export { app }

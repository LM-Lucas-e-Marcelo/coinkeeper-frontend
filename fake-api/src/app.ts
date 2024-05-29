import { Elysia } from 'elysia'
import { usersRoute } from './routes/users'
import { rolesRoute } from './routes/roles'

const app = new Elysia()

app.use(usersRoute)
app.use(rolesRoute)

export { app }

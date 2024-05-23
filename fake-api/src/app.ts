import { Elysia } from 'elysia'
import { usersRoute } from './routes/users'

const app = new Elysia()

app.use(usersRoute)

export { app }

import { Elysia } from 'elysia'
import { MonthData, TotalData } from '../schemas/dashboard'

const dashboardRoutes = new Elysia()

dashboardRoutes.get('/dashboard/month', ({ set }) => {
  set.status = 200

  return MonthData
})

dashboardRoutes.get('/dashboard/total', ({ set }) => {
  set.status = 200

  return TotalData
})

export { dashboardRoutes }

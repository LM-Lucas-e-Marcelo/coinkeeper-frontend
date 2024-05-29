import { z } from 'zod'

export const createRoleSchema = z.object({
  name: z.string().min(1, { message: 'Nome é obrigatório' }),
})

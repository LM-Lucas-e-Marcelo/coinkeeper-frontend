import { z } from 'zod'

export const updateUserSchema = z.object({
  name: z.string().min(1, { message: 'Nome é obrigatório' }),
  username: z.string().min(1, { message: 'Usuário é obrigatório' }),
  password: z.string().nullish(),
})

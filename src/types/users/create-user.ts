import { createUserSchema } from '@/schemas/users/create-user-schema'
import { z } from 'zod'

export type CreateUserData = z.infer<typeof createUserSchema>

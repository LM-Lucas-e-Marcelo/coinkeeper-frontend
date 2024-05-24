import { updateUserSchema } from '@/schemas/users/update-user-schema'
import { z } from 'zod'

export type UpdateUserData = z.infer<typeof updateUserSchema>

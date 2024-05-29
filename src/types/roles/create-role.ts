import { createRoleSchema } from '@/schemas/roles/create-role-schema'
import { z } from 'zod'

export type CreateRoleData = z.infer<typeof createRoleSchema>

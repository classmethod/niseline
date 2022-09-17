import { z } from 'zod'

export const userDdbItemSchema = z.object({
  pk: z.string().min(1).startsWith('User#'),
  sk: z.literal('Profile'),
})

export type UserDdbItem = z.infer<typeof userDdbItemSchema>

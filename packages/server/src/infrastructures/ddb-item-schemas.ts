import { z } from 'zod'

export const userDdbItemSchema = z.object({
  channelUserId: z.string().min(1),
  accessToken: z.string().min(1),
  idToken: z.string().min(1),
  email: z.string().email(),
  name: z.string().min(1),
  picture: z.string().url(),
  channelId: z.string().min(1),
})

export type UserDdbItem = z.infer<typeof userDdbItemSchema>

import { z } from 'zod'

export const channelDdbItemSchema = z.object({
  id: z.string().min(1),
})

export type ChannelDdbItem = z.infer<typeof channelDdbItemSchema>

export const userDdbItemSchema = z.object({
  id: z.string().min(1),
  accessToken: z.string().min(1),
  idToken: z.string().min(1),
  email: z.string().email(),
  name: z.string().min(1),
  picture: z.string().url(),
  channelId: z.string().min(1),
})

export type UserDdbItem = z.infer<typeof userDdbItemSchema>
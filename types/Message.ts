import Bot from '@/types/Bot'

type Message = {
  id: number
  url: string
  bot: Bot | undefined
  content: string
  is_edited: boolean
  is_read: boolean
  is_starred: boolean
  created_at: string
  updated_at: string
}

type MessageRequiredFields = Omit<
  Message,
  'id' | 'url' | 'user' | 'created_at' | 'updated_at'
>

export default Message
export type { MessageRequiredFields }

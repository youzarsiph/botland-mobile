import Bot from '@/types/Bot'
import Message from '@/types/Message'

type Chat = {
  id: number
  url: string
  bot: Bot
  title: string
  messages: Message[] | undefined
  is_pinned: boolean
  message_count: number
  unread_message_count: number
  created_at: string
  updated_at: string
}

type ChatRequiredFields = Omit<
  Chat,
  | 'id'
  | 'url'
  | 'user'
  | 'messages'
  | 'message_count'
  | 'unread_message_count'
  | 'created_at'
  | 'updated_at'
>

export default Chat
export type { ChatRequiredFields }

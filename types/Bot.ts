type Bot = {
  id: number
  url: string
  name: string
  model: string
  description: string
  chat_count: number
  created_at: string
  updated_at: string
}

type BotRequiredFields = Omit<
  Bot,
  'id' | 'url' | 'chat_count' | 'created_at' | 'updated_at'
>

export default Bot
export type { BotRequiredFields }

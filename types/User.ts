/**
 * Users
 */

type User = {
  id: number
  url: string
  image: string | undefined
  username: string
  email: string
  first_name: string
  last_name: string
  chat_count: number
  date_joined: string | undefined
  last_login: string | undefined
}

type UserRequiredFields = Omit<
  User,
  | 'id'
  | 'url'
  | 'image'
  | 'chat_count'
  | 'date_joined'
  | 'last_login'
  | 'articles'
>

export default User
export type { UserRequiredFields }

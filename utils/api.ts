/**
 * API utils
 */

import {
  APIResponse,
  Bot,
  BotRequiredFields,
  Chat,
  ChatRequiredFields,
  Message,
  MessageRequiredFields,
  User,
  UserRequiredFields,
} from '@/types'

const API_URL = 'http://127.0.0.1:8000'

/**
 * Helper functions
 */
const Utils = {
  /**
   * Sends a delete request
   * @param url URL to fetch
   * @param token Authorization token
   * @param callback onFullFilled callback
   * @param errorCallback onRejected callback
   * @returns Promise
   */
  delete: async (
    url: string,
    token: string,
    callback: (data: any) => void,
    errorCallback: (error: Error) => void,
  ) =>
    await fetch(url, {
      method: 'DELETE',
      headers: Utils.headers(token),
    })
      .then((response) => Utils.handleResponse(response))
      .then((data) => callback(data))
      .catch((error) => errorCallback(error)),

  /**
   * Sends a get request
   * @param url URL to fetch data from
   * @param token Authorization token
   * @param callback onFullFilled callback
   * @param errorCallback onRejected callback
   * @returns Promise
   */
  get: async (
    url: string,
    token: string,
    callback: (data: any) => void,
    errorCallback: (error: Error) => void,
  ) =>
    await fetch(url, {
      method: 'GET',
      headers: Utils.headers(token),
    })
      .then((response) => Utils.handleResponse(response))
      .then((data) => callback(data))
      .catch((error) => errorCallback(error)),

  /**
   * Sends a post request
   * @param url URL to post data to
   * @param token Authorization token
   * @param data Request body
   * @param callback onFullFilled callback
   * @param errorCallback onRejected callback
   * @returns Promise
   */
  post: async (
    url: string,
    token: string,
    data: any,
    callback: (data: any) => void,
    errorCallback: (error: Error) => void,
  ) =>
    await fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers:
        token === ''
          ? {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            }
          : Utils.headers(token),
    })
      .then((response) => Utils.handleResponse(response))
      .then((data) => callback(data))
      .catch((error) => errorCallback(error)),

  /**
   * Sends a put request
   * @param url URL to send data to
   * @param token Authorization token
   * @param data Request body
   * @param callback onFullFilled callback
   * @param errorCallback onRejected callback
   * @returns Promise
   */
  put: async (
    url: string,
    token: string,
    data: any,
    callback: (data: any) => void,
    errorCallback: (error: Error) => void,
  ) =>
    await fetch(url, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: Utils.headers(token),
    })
      .then((response) => Utils.handleResponse(response))
      .then((data) => callback(data))
      .catch((error) => errorCallback(error)),

  /**
   * Checks if response is ok to return json data, else throws a Error
   * @param response Response to handle
   * @returns Promise
   */
  handleResponse: (response: Response) =>
    response.ok
      ? response.json()
      : Utils.throwError(
          response.status,
          `${response.statusText} ${JSON.stringify(response.json())}`,
        ),

  /**
   * Get Request headers
   * @param token Authorization token
   * @returns Request headers
   */
  headers: (token: string) => {
    return {
      Accept: 'application/json',
      Authorization: `Token ${token}`,
      'Content-Type': 'application/json',
    }
  },

  /**
   * Throws a error
   * @param code Response status
   * @param text Response statusText
   */
  throwError: (code: number, text: string) => {
    throw new Error(`${code}: ${text}`)
  },

  /**
   * Constructs URL search params
   * @param params URL search parameters
   * @returns string
   */
  toUrlSearchParams: (params: {
    bot?: number
    chat?: number
    user?: number
    name?: string
    ordering?: string
    search?: string
  }) => {
    let p = ''

    Object.entries(params).map((entry) => (p += `${entry[0]}=${entry[1]}&`))

    return p.slice(0, p.length - 1)
  },
}

/**
 * Bots operations
 */
const Bots = {
  /**
   * Creates a new bot
   * @param bot Request body as a Bot object
   * @param callback onFullFilled callback
   * @param errorCallback onRejected callback
   * @returns Promise
   */
  create: async (
    token: string,
    bot: BotRequiredFields,
    callback: (data: any) => void,
    errorCallback: (error: Error) => void,
  ) =>
    await Utils.post(
      `${API_URL}/bots/`,
      token,
      bot,
      (data: any) => callback(data),
      (error: Error) => errorCallback(error),
    ),

  /**
   * Deletes a bot
   * @param id Bot ID
   * @param callback onFullFilled callback
   * @param errorCallback onRejected callback
   * @returns Promise
   */
  delete: async (
    token: string,
    id: number,
    callback: (data: any) => void,
    errorCallback: (error: Error) => void,
  ) =>
    await Utils.delete(
      `${API_URL}/bots/${id}/`,
      token,
      (data: any) => callback(data),
      (error: Error) => errorCallback(error),
    ),

  /**
   * Get a bot
   * @param id Bot ID
   * @param callback onFullFilled callback
   * @param errorCallback onRejected callback
   * @returns Promise
   */
  get: async (
    token: string,
    id: number,
    callback: (data: Bot) => void,
    errorCallback: (error: Error) => void,
  ) =>
    await Utils.get(
      `${API_URL}/bots/${id}/`,
      token,
      (data: Bot) => callback(data),
      (error: Error) => errorCallback(error),
    ),

  /**
   * List bots
   * @param callback onFullFilled callback
   * @param errorCallback onRejected callback
   * @returns Promise
   */
  list: async (
    token: string,
    callback: (data: APIResponse<Bot>) => void,
    errorCallback: (error: Error) => void,
  ) =>
    await Utils.get(
      `${API_URL}/bots/`,
      token,
      (data: APIResponse<Bot>) => callback(data),
      (error: Error) => errorCallback(error),
    ),

  /**
   * Updates a bot
   * @param id Bot ID
   * @param bot Request body as a bot
   * @param callback onFullFilled callback
   * @param errorCallback onRejected callback
   * @returns Promise
   */
  update: async (
    token: string,
    id: number,
    bot: BotRequiredFields,
    callback: (data: any) => void,
    errorCallback: (error: Error) => void,
  ) =>
    await Utils.put(
      `${API_URL}/bots/${id}/`,
      token,
      bot,
      (data: any) => callback(data),
      (error: Error) => errorCallback(error),
    ),

  /**
   * Search Bots
   * @param query Search term
   * @param callback onFullFilled callback
   * @param errorCallback onRejected callback
   * @returns Promise
   */
  search: async (
    token: string,
    query: string,
    callback: (data: APIResponse<Bot>) => void,
    errorCallback: (error: Error) => void,
  ) =>
    await Utils.get(
      `${API_URL}/bots/?${Utils.toUrlSearchParams({ search: query })}`,
      token,
      (data: APIResponse<Bot>) => callback(data),
      (error: Error) => errorCallback(error),
    ),

  /**
   * Filter Bots
   * @param params URL search params
   * @param callback onFullFilled callback
   * @param errorCallback onRejected callback
   * @returns Promise
   */
  filter: async (
    token: string,
    params: { name: string },
    callback: (data: APIResponse<Bot>) => void,
    errorCallback: (error: Error) => void,
  ) =>
    await Utils.get(
      `${API_URL}/bots/?${Utils.toUrlSearchParams(params)}`,
      token,
      (data: APIResponse<Bot>) => callback(data),
      (error: Error) => errorCallback(error),
    ),
}

/**
 * Chats operations
 */
const Chats = {
  /**
   * Creates a new chat
   * @param chat Request body as a Chat object
   * @param callback onFullFilled callback
   * @param errorCallback onRejected callback
   * @returns Promise
   */
  create: async (
    token: string,
    chat: Omit<ChatRequiredFields, 'bot'> & { bot: number },
    callback: (data: any) => void,
    errorCallback: (error: Error) => void,
  ) =>
    await Utils.post(
      `${API_URL}/chats/`,
      token,
      chat,
      (data: any) => callback(data),
      (error: Error) => errorCallback(error),
    ),

  /**
   * Deletes a chat
   * @param id Chat ID
   * @param callback onFullFilled callback
   * @param errorCallback onRejected callback
   * @returns Promise
   */
  delete: async (
    token: string,
    id: number,
    callback: (data: any) => void,
    errorCallback: (error: Error) => void,
  ) =>
    await Utils.delete(
      `${API_URL}/chats/${id}/`,
      token,
      (data: any) => callback(data),
      (error: Error) => errorCallback(error),
    ),

  /**
   * Get a chat
   * @param id Chat ID
   * @param callback onFullFilled callback
   * @param errorCallback onRejected callback
   * @returns Promise
   */
  get: async (
    token: string,
    id: number,
    callback: (data: Chat) => void,
    errorCallback: (error: Error) => void,
  ) =>
    await Utils.get(
      `${API_URL}/chats/${id}/`,
      token,
      (data: Chat) => callback(data),
      (error: Error) => errorCallback(error),
    ),

  /**
   * List chats
   * @param callback onFullFilled callback
   * @param errorCallback onRejected callback
   * @returns Promise
   */
  list: async (
    token: string,
    callback: (data: APIResponse<Chat>) => void,
    errorCallback: (error: Error) => void,
  ) =>
    await Utils.get(
      `${API_URL}/chats/`,
      token,
      (data: APIResponse<Chat>) => callback(data),
      (error: Error) => errorCallback(error),
    ),

  /**
   * Updates a chat
   * @param id Chat ID
   * @param chat Request body as a chat
   * @param callback onFullFilled callback
   * @param errorCallback onRejected callback
   * @returns Promise
   */
  update: async (
    token: string,
    id: number,
    chat: ChatRequiredFields,
    callback: (data: any) => void,
    errorCallback: (error: Error) => void,
  ) =>
    await Utils.put(
      `${API_URL}/chats/${id}/`,
      token,
      chat,
      (data: any) => callback(data),
      (error: Error) => errorCallback(error),
    ),

  /**
   * Search Chats
   * @param query Search term
   * @param callback onFullFilled callback
   * @param errorCallback onRejected callback
   * @returns Promise
   */
  search: async (
    token: string,
    query: string,
    callback: (data: APIResponse<Chat>) => void,
    errorCallback: (error: Error) => void,
  ) =>
    await Utils.get(
      `${API_URL}/chats/?${Utils.toUrlSearchParams({ search: query })}`,
      token,
      (data: APIResponse<Chat>) => callback(data),
      (error: Error) => errorCallback(error),
    ),

  /**
   * Filter Chats
   * @param params URL search params
   * @param callback onFullFilled callback
   * @param errorCallback onRejected callback
   * @returns Promise
   */
  filter: async (
    token: string,
    params: { bot: number },
    callback: (data: APIResponse<Chat>) => void,
    errorCallback: (error: Error) => void,
  ) =>
    await Utils.get(
      `${API_URL}/chats/?${Utils.toUrlSearchParams(params)}`,
      token,
      (data: APIResponse<Chat>) => callback(data),
      (error: Error) => errorCallback(error),
    ),
}

/**
 * Messages operations
 */
const Messages = {
  /**
   * Creates a new message
   * @param id Chat id
   * @param message Request body as a Message object
   * @param callback onFullFilled callback
   * @param errorCallback onRejected callback
   * @returns Promise
   */
  create: async (
    token: string,
    id: number,
    message: MessageRequiredFields,
    callback: (data: any) => void,
    errorCallback: (error: Error) => void,
  ) =>
    await Utils.post(
      `${API_URL}/chats/${id}/messages/`,
      token,
      message,
      (data: any) => callback(data),
      (error: Error) => errorCallback(error),
    ),

  /**
   * Deletes a message
   * @param id Message ID
   * @param callback onFullFilled callback
   * @param errorCallback onRejected callback
   * @returns Promise
   */
  delete: async (
    token: string,
    id: number,
    callback: (data: any) => void,
    errorCallback: (error: Error) => void,
  ) =>
    await Utils.delete(
      `${API_URL}/messages/${id}/`,
      token,
      (data: any) => callback(data),
      (error: Error) => errorCallback(error),
    ),

  /**
   * Get a message
   * @param id Message ID
   * @param callback onFullFilled callback
   * @param errorCallback onRejected callback
   * @returns Promise
   */
  get: async (
    token: string,
    id: number,
    callback: (data: Message) => void,
    errorCallback: (error: Error) => void,
  ) =>
    await Utils.get(
      `${API_URL}/messages/${id}/`,
      token,
      (data: Message) => callback(data),
      (error: Error) => errorCallback(error),
    ),

  /**
   * List messages
   * @param callback onFullFilled callback
   * @param errorCallback onRejected callback
   * @returns Promise
   */
  list: async (
    token: string,
    callback: (data: APIResponse<Message>) => void,
    errorCallback: (error: Error) => void,
  ) =>
    await Utils.get(
      `${API_URL}/messages/`,
      token,
      (data: APIResponse<Message>) => callback(data),
      (error: Error) => errorCallback(error),
    ),

  /**
   * Updates a message
   * @param id Message ID
   * @param message Request body as a chat
   * @param callback onFullFilled callback
   * @param errorCallback onRejected callback
   * @returns Promise
   */
  update: async (
    token: string,
    id: number,
    message: MessageRequiredFields,
    callback: (data: any) => void,
    errorCallback: (error: Error) => void,
  ) =>
    await Utils.put(
      `${API_URL}/chats/${id}/`,
      token,
      message,
      (data: any) => callback(data),
      (error: Error) => errorCallback(error),
    ),

  /**
   * Search messages
   * @param query Search term
   * @param callback onFullFilled callback
   * @param errorCallback onRejected callback
   * @returns Promise
   */
  search: async (
    token: string,
    query: string,
    callback: (data: APIResponse<Message>) => void,
    errorCallback: (error: Error) => void,
  ) =>
    await Utils.get(
      `${API_URL}/chats/?${Utils.toUrlSearchParams({ search: query })}`,
      token,
      (data: APIResponse<Message>) => callback(data),
      (error: Error) => errorCallback(error),
    ),

  /**
   * Filter messages
   * @param params URL search params
   * @param callback onFullFilled callback
   * @param errorCallback onRejected callback
   * @returns Promise
   */
  filter: async (
    token: string,
    params: { bot?: number; user?: number; chat?: number },
    callback: (data: APIResponse<Message>) => void,
    errorCallback: (error: Error) => void,
  ) =>
    await Utils.get(
      `${API_URL}/chats/?${Utils.toUrlSearchParams(params)}`,
      token,
      (data: APIResponse<Message>) => callback(data),
      (error: Error) => errorCallback(error),
    ),
}

/**
 * Users operations
 */
const Users = {
  /**
   * Creates a new user
   * @param user Request body as a User object
   * @param callback onFullFilled callback
   * @param errorCallback onRejected callback
   * @returns Promise
   */
  create: async (
    user: UserRequiredFields & { password: string },
    callback: (data: any) => void,
    errorCallback: (error: Error) => void,
  ) =>
    await Utils.post(
      `${API_URL}/auth/users/`,
      '',
      user,
      (data: any) => callback(data),
      (error: Error) => errorCallback(error),
    ),

  /**
   * Deletes a user
   * @param id User ID
   * @param callback onFullFilled callback
   * @param errorCallback onRejected callback
   * @returns Promise
   */
  delete: async (
    token: string,
    id: number,
    callback: (data: any) => void,
    errorCallback: (error: Error) => void,
  ) =>
    await Utils.delete(
      `${API_URL}/auth/users/${id}/`,
      token,
      (data: any) => callback(data),
      (error: Error) => errorCallback(error),
    ),

  /**
   * Get a user
   * @param id User ID
   * @param callback onFullFilled callback
   * @param errorCallback onRejected callback
   * @returns Promise
   */
  get: async (
    token: string,
    id: number,
    callback: (data: User) => void,
    errorCallback: (error: Error) => void,
  ) =>
    await Utils.get(
      `${API_URL}/users/${id}/`,
      token,
      (data: User) => callback(data),
      (error: Error) => errorCallback(error),
    ),

  /**
   * List users
   * @param callback onFullFilled callback
   * @param errorCallback onRejected callback
   * @returns Promise
   */
  list: async (
    token: string,
    callback: (data: APIResponse<User>) => void,
    errorCallback: (error: Error) => void,
  ) =>
    await Utils.get(
      `${API_URL}/users/`,
      token,
      (data: APIResponse<User>) => callback(data),
      (error: Error) => errorCallback(error),
    ),

  /**
   * Updates a user
   * @param id User ID
   * @param user Request body as a user
   * @param callback onFullFilled callback
   * @param errorCallback onRejected callback
   * @returns Promise
   */
  update: async (
    token: string,
    id: number,
    user: UserRequiredFields,
    callback: (data: any) => void,
    errorCallback: (error: Error) => void,
  ) =>
    await Utils.put(
      `${API_URL}/auth/users/${id}/`,
      token,
      user,
      (data: any) => callback(data),
      (error: Error) => errorCallback(error),
    ),

  /**
   * Log a user in
   * @param username Username
   * @param password User password
   * @param callback onFullFilled callback
   * @param errorCallback onRejected callback
   * @returns Promise
   */
  login: async (
    username: string,
    password: string,
    callback: (data: any) => void,
    errorCallback: (error: Error) => void,
  ) =>
    await Utils.post(
      `${API_URL}/auth/token/login/`,
      '',
      { username, password },
      (data: any) => callback(data),
      (error: Error) => errorCallback(error),
    ),

  /**
   * Log a user out
   * @param callback onFullFilled callback
   * @param errorCallback onRejected callback
   * @returns Promise
   */
  logout: async (
    token: string,
    callback: (data: any) => void,
    errorCallback: (error: Error) => void,
  ) =>
    await Utils.post(
      `${API_URL}/auth/token/logout/`,
      token,
      {},
      (data: any) => callback(data),
      (error: Error) => errorCallback(error),
    ),

  /**
   * Get a user's profile data
   * @param callback onFullFilled callback
   * @param errorCallback onRejected callback
   * @returns Promise
   */
  me: async (
    token: string,
    callback: (data: any) => void,
    errorCallback: (error: Error) => void,
  ) =>
    await Utils.get(
      `${API_URL}/auth/users/me/`,
      token,
      (data: any) => callback(data),
      (error: Error) => errorCallback(error),
    ),
}

/**
 * API operations
 */
const API = {
  bots: Bots,
  chats: Chats,
  messages: Messages,
  users: Users,
}

export default API

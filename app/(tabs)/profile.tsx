import { router } from 'expo-router'
import React from 'react'
import { Button, Surface, Text } from 'react-native-paper'

import { LoadingIndicator } from '@/components'
import { User } from '@/types'
import { API } from '@/utils'

const BotDetails = () => {
  const [user, setUser] = React.useState<User>()

  // Fetch the data
  React.useEffect(() => {
    ;(async () => {
      await API.users.me(
        '5fbf7e29043200a972e46ac8922166ce2421ea5a',
        (data) => setUser(data),
        (error) => console.error(error),
      )
    })()
  }, [])

  return (
    <Surface style={{ flex: 1, gap: 16, padding: 16 }}>
      {user ? (
        <>
          <Surface style={{ flex: 1 }} elevation={0}>
            <Text variant="headlineSmall">{user.first_name}</Text>
            <Text variant="titleSmall">@{user.username}</Text>
            <Text variant="bodyLarge">{user.chat_count} chats</Text>
          </Surface>

          <Button mode="contained" icon="chat" onPress={() => router.push('/')}>
            {user.chat_count} Chat
          </Button>
        </>
      ) : (
        <LoadingIndicator />
      )}
    </Surface>
  )
}

export default BotDetails

import { Stack, useLocalSearchParams } from 'expo-router'
import React from 'react'
import { Button, List, Surface, Text, TextInput } from 'react-native-paper'

import { LoadingIndicator } from '@/components'
import { Chat } from '@/types'
import { API } from '@/utils'

const ChatInfo = () => {
  const [chat, setChat] = React.useState<Chat>()
  const params = useLocalSearchParams<{ id: string }>()

  // Fetch the data
  React.useEffect(() => {
    ;(async () => {
      await API.chats.get(
        '5fbf7e29043200a972e46ac8922166ce2421ea5a',
        parseInt(`${params.id}`, 10),
        (data) => setChat(data),
        (error) => console.error(error),
      )
    })()
  }, [params.id])

  return (
    <Surface style={{ flex: 1, gap: 16 }}>
      {chat ? (
        <Surface elevation={0} style={{ gap: 16, padding: 16 }}>
          <Stack.Screen options={{ title: chat.title }} />

          <Text variant="headlineSmall">{chat.bot.name}</Text>
          <Text>{chat.bot.description}</Text>

          <TextInput
            label="Title"
            mode="outlined"
            value={chat.title}
            placeholder="Enter chat title"
            onChangeText={(value) => setChat({ ...chat, title: value })}
          />

          <List.Section title="Details" style={{ marginHorizontal: -16 }}>
            <List.Item
              title="Messages"
              description={`${chat.message_count} messages`}
              left={(props) => <List.Icon icon="message" {...props} />}
            />
            <List.Item
              title="Unread Messages"
              description={`${chat.unread_message_count} messages`}
              left={(props) => <List.Icon icon="message-badge" {...props} />}
            />
            <List.Item
              title="Pin this chat"
              description={`The chat is ${chat.is_pinned ? 'pinned' : 'not pinned'}`}
              onPress={() => setChat({ ...chat, is_pinned: !chat.is_pinned })}
              left={(props) => (
                <List.Icon
                  icon={
                    chat.is_pinned
                      ? 'checkbox-blank-outline'
                      : 'checkbox-marked'
                  }
                  {...props}
                />
              )}
            />
          </List.Section>

          <Button
            mode="contained"
            onPress={() =>
              API.chats.update(
                '5fbf7e29043200a972e46ac8922166ce2421ea5a',
                chat.id,
                chat,
                (data) => console.log(data),
                (error) => console.error(error),
              )
            }
          >
            Save changes
          </Button>
        </Surface>
      ) : (
        <LoadingIndicator />
      )}
    </Surface>
  )
}

export default ChatInfo

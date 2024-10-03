import { AnimatedFlashList } from '@shopify/flash-list'
import { router, Stack, useLocalSearchParams } from 'expo-router'
import React from 'react'
import {
  Appbar,
  Card,
  IconButton,
  Menu,
  Searchbar,
  Surface,
  Text,
} from 'react-native-paper'

import { LoadingIndicator } from '@/components'
import { Chat, Message } from '@/types'
import { API } from '@/utils'

const ChatDetails = () => {
  const [chat, setChat] = React.useState<Chat>()
  const [message, setMessage] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [messages, setMessages] = React.useState<Message[]>()
  const [display, setDisplay] = React.useState(false)
  const params = useLocalSearchParams<{ id: string }>()

  // Fetch the data
  React.useEffect(() => {
    ; (async () => {
      await API.chats.get(
        '5fbf7e29043200a972e46ac8922166ce2421ea5a',
        parseInt(`${params.id}`, 10),
        (data) => {
          setChat(data)
          setMessages(chat?.messages)
        },
        (error) => console.error(error),
      )
    })()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id])

  // Websocket connection
  const socket = new WebSocket(`http://127.0.0.1:8000/chat/${params.id}/`)

  // On Message receive
  socket.onmessage = (event) => {
    const ms = messages
    ms?.push(JSON.parse(event.data))

    setMessages(ms)

    // Stop displaying loading
    setLoading(false)
  }

  // On connection close
  socket.onclose = (e) => {
    // Stop displaying loading
    setLoading(false)
    console.error(`Chat socket closed unexpectedly: ${e}`)
  }

  return (
    <Surface style={{ flex: 1, gap: 16 }}>
      <Stack.Screen
        options={{
          title: chat ? chat.title : 'Chat',
          headerRight: () => (
            <Menu
              visible={display}
              onDismiss={() => setDisplay(false)}
              anchor={
                <Appbar.Action
                  icon="dots-vertical"
                  onPress={() => setDisplay(true)}
                />
              }
            >
              <Menu.Item
                title="Details"
                leadingIcon="information"
                onPress={() => router.push(`/chats/${params.id}/details`)}
              />
              <Menu.Item
                title="View chatbot"
                leadingIcon="robot-excited"
                onPress={() => router.push(`/bots/${chat?.bot.id}`)}
              />
              <Menu.Item leadingIcon="magnify" title="Search" />
              <Menu.Item leadingIcon="home" title="Clear history" />
              <Menu.Item leadingIcon="delete" title="Delete chat" />
            </Menu>
          ),
        }}
      />

      {chat ? (
        <>
          <Surface style={{ flex: 1 }} elevation={1}>
            {messages?.length !== 0 ? (
              <AnimatedFlashList
                data={messages}
                estimatedItemSize={350}
                contentContainerStyle={{ padding: 16 }}
                renderItem={({ item }: { item: Message }) => {
                  const date = new Date(item.created_at)

                  return (
                    <Card
                      mode={item.bot ? 'outlined' : 'contained'}
                      style={{
                        marginBottom: 16,
                        marginRight: item.bot ? 16 : undefined,
                        marginLeft: !item.bot ? 16 : undefined,
                      }}
                    >
                      <Card.Title
                        title="You"
                        titleStyle={{ fontWeight: 'semibold' }}
                        subtitle={date.toLocaleTimeString()}
                      />
                      <Card.Content>
                        <Text>{item.content}</Text>
                      </Card.Content>
                      <Card.Actions>
                        <IconButton
                          size={16}
                          onPress={() => { }}
                          mode={item.bot ? 'contained' : 'outlined'}
                          icon={item.is_starred ? 'star' : 'star-outline'}
                        />
                        {item.bot ? undefined : (
                          <IconButton
                            size={16}
                            mode="outlined"
                            onPress={() => { }}
                            icon="pencil"
                          />
                        )}
                      </Card.Actions>
                    </Card>
                  )
                }}
              />
            ) : (
              <Surface
                style={{
                  gap: 16,
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Text variant="headlineLarge">Start Chatting</Text>
                <Text>Start by typing a message...</Text>
              </Surface>
            )}
          </Surface>

          <Surface
            elevation={0}
            style={{ paddingBottom: 8, paddingHorizontal: 8 }}
          >
            <Searchbar
              icon="message"
              value={message}
              loading={loading}
              placeholder="Message..."
              onChangeText={(m) => setMessage(m)}
              right={(props) => (
                <IconButton
                  {...props}
                  icon="send"
                  disabled={message === ''}
                  onPress={() => {
                    // Display loading
                    setLoading(true)

                    // Send json data
                    socket.send(
                      JSON.stringify({
                        content: message,
                        is_pinned: false,
                        is_starred: false,
                      }),
                    )

                    // Clear message field
                    setMessage('')
                  }}
                />
              )}
            />
          </Surface>
        </>
      ) : (
        <LoadingIndicator />
      )}
    </Surface>
  )
}

export default ChatDetails

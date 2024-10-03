import { AnimatedFlashList } from '@shopify/flash-list'
import { router } from 'expo-router'
import React from 'react'
import { Button, Chip, FAB, List, Surface, Text } from 'react-native-paper'

import { LoadingIndicator } from '@/components'
import { Bot, Chat } from '@/types'
import { API } from '@/utils'

const TabsHome = () => {
  const [chats, setChats] = React.useState<Chat[]>()

  // Load the data
  React.useEffect(() => {
    ;(async () => {
      await API.chats.list(
        '5fbf7e29043200a972e46ac8922166ce2421ea5a',
        (data) => setChats(data.results),
        (error) => console.error(error),
      )
    })()
  }, [])

  return (
    <Surface style={{ flex: 1, gap: 16 }}>
      {chats ? (
        chats.length !== 0 ? (
          <List.Section title="Chats">
            <AnimatedFlashList
              estimatedItemSize={350}
              data={chats}
              renderItem={({ item }: { item: Chat }) => {
                const bot = item.bot as Bot

                return (
                  <List.Item
                    title={item.title}
                    description={`${bot.name}, ${item.message_count} messages`}
                    onPress={() => router.push(`/chats/${item.id}`)}
                    right={(props) =>
                      item.unread_message_count !== 0 ? (
                        <Chip {...props}>{item.unread_message_count}</Chip>
                      ) : (
                        <List.Icon {...props} icon="chevron-right" />
                      )
                    }
                    left={(props) => (
                      <List.Image
                        {...props}
                        style={{ ...props.style, borderRadius: 16 }}
                        source={require('@/assets/images/icon.png')}
                      />
                    )}
                  />
                )
              }}
            />
          </List.Section>
        ) : (
          <Surface
            elevation={0}
            style={{
              gap: 16,
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text variant="headlineLarge">Start chatting</Text>
            <Text>Message privately with your selected bots</Text>

            <Button
              icon="message"
              mode="contained"
              onPress={() => router.push('/chats/new')}
            >
              Chat now
            </Button>
          </Surface>
        )
      ) : (
        <LoadingIndicator />
      )}

      <FAB
        icon="message-plus"
        onPress={() => router.push('/chats/new')}
        style={{ position: 'absolute', bottom: 16, right: 16 }}
      />
    </Surface>
  )
}

export default TabsHome

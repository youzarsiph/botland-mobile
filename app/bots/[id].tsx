import { router, Stack, useLocalSearchParams } from 'expo-router'
import React from 'react'
import { Button, Surface, Text, useTheme } from 'react-native-paper'

import { LoadingIndicator } from '@/components'
import { Bot } from '@/types'
import { API } from '@/utils'

const BotDetails = () => {
  const theme = useTheme()
  const [bot, setBot] = React.useState<Bot>()
  const params = useLocalSearchParams<{ id: string }>()

  // Fetch the data
  React.useEffect(() => {
    ;(async () => {
      await API.bots.get(
        '5fbf7e29043200a972e46ac8922166ce2421ea5a',
        parseInt(`${params.id}`, 10),
        (data) => setBot(data),
        (error) => console.error(error),
      )
    })()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id])

  return (
    <Surface style={{ flex: 1, gap: 16 }}>
      <Stack.Screen options={{ title: bot ? bot.name : 'Bot details' }} />

      {bot ? (
        <>
          <Surface
            style={{
              gap: 16,
              paddingHorizontal: 16,
              paddingVertical: 64,
              backgroundColor: theme.colors.onPrimary,
            }}
          >
            <Text variant="displayMedium">{bot.name}</Text>
            <Text variant="titleSmall">@{bot.model}</Text>
          </Surface>

          <Surface elevation={0} style={{ gap: 16, padding: 16 }}>
            <Text variant="bodyLarge">{bot.description}</Text>

            <Button
              icon="message"
              mode="contained"
              onPress={() => router.push('chats/new')}
            >
              Let's Chat
            </Button>
          </Surface>
        </>
      ) : (
        <LoadingIndicator />
      )}
    </Surface>
  )
}

export default BotDetails

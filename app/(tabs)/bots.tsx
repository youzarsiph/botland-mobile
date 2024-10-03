import { AnimatedFlashList } from '@shopify/flash-list'
import { router } from 'expo-router'
import React from 'react'
import { Icon, List, Surface } from 'react-native-paper'

import { LoadingIndicator } from '@/components'
import { Bot } from '@/types'
import { API } from '@/utils'

const Bots = () => {
  const [bots, setBots] = React.useState<Bot[]>()

  // Load the data
  React.useEffect(() => {
    ;(async () => {
      await API.bots.list(
        '5fbf7e29043200a972e46ac8922166ce2421ea5a',
        (data) => setBots(data.results),
        (error) => console.error(error),
      )
    })()
  }, [])

  return (
    <Surface style={{ flex: 1, gap: 16 }}>
      {bots ? (
        bots.length !== 0 ? (
          <List.Section title="Bots">
            <AnimatedFlashList
              estimatedItemSize={350}
              data={bots}
              renderItem={({ item }: { item: Bot }) => (
                <List.Item
                  title={item.name}
                  description={`@${item.model}, ${item.chat_count} chats`}
                  onPress={() => router.push(`/bots/${item.id}`)}
                  right={(props) => (
                    <List.Icon {...props} icon="chevron-right" />
                  )}
                  left={(props) => (
                    <List.Image
                      {...props}
                      style={{ ...props.style, borderRadius: 16 }}
                      source={require('@/assets/images/icon.png')}
                    />
                  )}
                />
              )}
            />
          </List.Section>
        ) : (
          <Surface
            elevation={0}
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          >
            <Icon source="robot-excited" size={32} color="white" />
          </Surface>
        )
      ) : (
        <LoadingIndicator />
      )}
    </Surface>
  )
}

export default Bots

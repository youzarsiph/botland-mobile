import { AnimatedFlashList } from '@shopify/flash-list'
import { router } from 'expo-router'
import React from 'react'
import { List, Searchbar, Surface } from 'react-native-paper'

import { Bot } from '@/types'
import { API } from '@/utils'

const NewChat = () => {
  const [query, setQuery] = React.useState('')
  const [results, setResults] = React.useState<Bot[]>([])

  // Fetch the data
  React.useEffect(() => {
    ;(async () => {
      await API.bots.search(
        '5fbf7e29043200a972e46ac8922166ce2421ea5a',
        query,
        (data) => setResults(data.results),
        (error) => console.error(error),
      )
    })()
  }, [query])

  return (
    <Surface style={{ flex: 1, gap: 16 }}>
      <Surface elevation={0} style={{ paddingHorizontal: 8, paddingTop: 8 }}>
        <Searchbar
          value={query}
          onChangeText={(q) => setQuery(q)}
          placeholder="Type here to search bots..."
        />
      </Surface>

      <List.Section title="Results">
        {results.length !== 0 ? (
          <AnimatedFlashList
            data={results}
            estimatedItemSize={350}
            renderItem={({ item }: { item: Bot }) => (
              <List.Item
                title={item.name}
                description={`@${item.model}, ${item.chat_count} chats`}
                right={(props) => <List.Icon {...props} icon="chevron-right" />}
                left={(props) => (
                  <List.Image
                    {...props}
                    style={{ ...props.style, borderRadius: 16 }}
                    source={require('@/assets/images/icon.png')}
                  />
                )}
                onPress={() =>
                  API.chats.create(
                    '5fbf7e29043200a972e46ac8922166ce2421ea5a',
                    {
                      bot: item.id,
                      is_pinned: false,
                      title: 'Untitled chat',
                    },
                    (data) => router.push(`/chats/${data.id}`),
                    (error) => console.error(error),
                  )
                }
              />
            )}
          />
        ) : (
          <List.Item
            title="Not found"
            description="No bots matching the search term"
          />
        )}
      </List.Section>
    </Surface>
  )
}

export default NewChat

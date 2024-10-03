import { AnimatedFlashList } from '@shopify/flash-list'
import React from 'react'
import { List, Searchbar, Surface } from 'react-native-paper'

import { Chat } from '@/types'
import { API } from '@/utils'

const Search = () => {
  const [query, setQuery] = React.useState('')
  const [results, setResults] = React.useState<Chat[]>([])

  // Fetch the data
  React.useEffect(() => {
    ;(async () => {
      await API.chats.search(
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
          placeholder="Type here to search..."
        />
      </Surface>

      <List.Section title={query === '' ? 'Chats' : 'Results'}>
        {results.length !== 0 ? (
          <AnimatedFlashList
            estimatedItemSize={350}
            data={results}
            renderItem={({ item }) => <List.Item title={item.title} />}
          />
        ) : (
          <List.Item
            title="Not found"
            description="No chats matching the search term"
          />
        )}
      </List.Section>
    </Surface>
  )
}

export default Search

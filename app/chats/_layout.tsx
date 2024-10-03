import { Stack } from 'expo-router'

import { StackHeader } from '@/components'

const Layout = () => (
  <Stack
    screenOptions={{
      animation: 'ios',
      header: (props) => <StackHeader navProps={props} children={undefined} />,
    }}
  >
    <Stack.Screen name="new" options={{ title: 'New chat' }} />
    <Stack.Screen name="search" options={{ title: 'Search' }} />
    <Stack.Screen name="[id]" options={{ headerShown: false }} />
  </Stack>
)

export default Layout

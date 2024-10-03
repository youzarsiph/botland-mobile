import { Stack } from 'expo-router'

import { StackHeader } from '@/components'

const Layout = () => (
  <Stack
    screenOptions={{
      animation: 'ios',
      header: (props) => <StackHeader navProps={props} children={undefined} />,
    }}
  >
    <Stack.Screen name="details" options={{ title: 'Chat details' }} />
    <Stack.Screen name="index" options={{ title: 'Chat' }} />
  </Stack>
)

export default Layout

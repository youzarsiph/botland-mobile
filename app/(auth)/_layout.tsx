import { Stack } from 'expo-router'

import { StackHeader } from '@/components'

const Layout = () => (
  <Stack
    screenOptions={{
      animation: 'ios',
      header: (props) => <StackHeader navProps={props} children={undefined} />,
    }}
  >
    <Stack.Screen
      name="login"
      options={{ title: 'Login', headerShown: false }}
    />
    <Stack.Screen
      name="signup"
      options={{ title: 'Sign up', headerShown: false }}
    />
  </Stack>
)

export default Layout

import { router } from 'expo-router'
import React from 'react'
import {
  Button,
  IconButton,
  Surface,
  Text,
  TextInput,
} from 'react-native-paper'

import { API } from '@/utils'

const Login = () => {
  const [credentials, setCredentials] = React.useState<{
    username: string
    password: string
  }>({ username: '', password: '' })

  return (
    <Surface style={{ flex: 1, gap: 16, padding: 16 }}>
      <Text variant="displayMedium">Login</Text>
      <Text variant="titleLarge">Welcome to BotLand</Text>
      <Text variant="bodyLarge">The lands of chat bots</Text>

      <TextInput
        label="Username"
        mode="outlined"
        placeholder="Enter your username"
        value={credentials.username}
        onChangeText={(value) =>
          setCredentials({ ...credentials, username: value })
        }
      />

      <TextInput
        label="Password"
        mode="outlined"
        placeholder="Enter your password"
        value={credentials.password}
        onChangeText={(value) =>
          setCredentials({ ...credentials, password: value })
        }
      />

      <Button
        mode="contained"
        icon="login"
        onPress={() =>
          API.users.login(
            credentials.username,
            credentials.password,
            () => {},
            () => {},
          )
        }
      >
        Login
      </Button>

      <IconButton
        size={32}
        icon="close"
        onPress={() => router.push('/')}
        style={{ position: 'absolute', right: 16, top: 16 }}
      />
    </Surface>
  )
}

export default Login

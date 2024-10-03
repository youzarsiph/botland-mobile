import { router } from 'expo-router'
import React from 'react'
import {
  Button,
  IconButton,
  Surface,
  Text,
  TextInput,
} from 'react-native-paper'

import { UserRequiredFields } from '@/types'
import { API } from '@/utils'

const SignUp = () => {
  const [user, setUser] = React.useState<
    UserRequiredFields & { password: string }
  >({
    username: '',
    password: '',
    first_name: '',
    last_name: '',
    email: '',
  })

  return (
    <Surface style={{ flex: 1, gap: 16, padding: 16 }}>
      <Text variant="displayMedium">Sign Up</Text>
      <Text variant="titleLarge">Welcome to BotLand</Text>
      <Text variant="bodyLarge">The lands of chat bots, you look like new</Text>

      <TextInput
        label="Username"
        mode="outlined"
        placeholder="Enter your username"
        value={user.username}
        onChangeText={(value) => setUser({ ...user, username: value })}
      />

      <TextInput
        label="Email"
        mode="outlined"
        placeholder="Enter your email"
        value={user.password}
        onChangeText={(value) => setUser({ ...user, email: value })}
      />

      <TextInput
        label="Password"
        mode="outlined"
        placeholder="Enter your password"
        value={user.password}
        onChangeText={(value) => setUser({ ...user, password: value })}
      />

      <TextInput
        label="First name"
        mode="outlined"
        placeholder="Enter your first name"
        value={user.password}
        onChangeText={(value) => setUser({ ...user, first_name: value })}
      />

      <TextInput
        label="Last name"
        mode="outlined"
        placeholder="Enter your last name"
        value={user.password}
        onChangeText={(value) => setUser({ ...user, last_name: value })}
      />

      <Button
        mode="contained"
        icon="login"
        onPress={() =>
          API.users.create(
            user,
            () => router.push('/login'),
            () => {},
          )
        }
      >
        Sign Up
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

export default SignUp

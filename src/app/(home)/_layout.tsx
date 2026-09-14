import { useAuth } from '@clerk/expo'
import { Redirect, Stack } from 'expo-router'

export const Layout = () => {
  const { isSignedIn, isLoaded } = useAuth()

  if (!isLoaded) {
    return null
  }

  if (!isSignedIn) {
    return <Redirect href='/(auth)/signin' />
  }

  return <Stack screenOptions={{ headerShown: false }} />
// return <Stack />
}

export default Layout;
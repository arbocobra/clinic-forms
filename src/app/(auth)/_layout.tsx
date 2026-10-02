import { useAuth } from '@clerk/expo'
import { Redirect, Stack, useRouter } from 'expo-router'

export const AuthRoutesLayout = () => {
  const { isSignedIn, isLoaded } = useAuth()
  const router = useRouter()

  if (!isLoaded) {
    return null
  }

  if (isSignedIn) {
    // return <Redirect href={'/'} />
    return router.replace('/')
  }

  return <Stack />
}

export default AuthRoutesLayout;
import { useAuth } from '@clerk/expo'
import { Redirect, Stack } from 'expo-router'
import { View, Text } from 'react-native'

const Layout = () => {
   
   const { isSignedIn, isLoaded } = useAuth()

   if (!isLoaded) {
      return (
         <View><Text>Loading...</Text></View>
      )
   }

   if (!isSignedIn) {
      return <Redirect href='/(auth)/signin' />
   }

   return (
      <Stack screenOptions={{ headerShown: false }}>
         <Stack.Screen name='(bottom-tabs)' />
         <Stack.Screen name='index' />
      </Stack>
   )
}

export default Layout;
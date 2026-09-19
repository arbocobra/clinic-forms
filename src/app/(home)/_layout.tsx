import { useAuth, useClerk } from '@clerk/expo'
import { Redirect, Stack } from 'expo-router'
import { Pressable, useColorScheme, View } from 'react-native'

const Layout = () => {
   const colorScheme = useColorScheme();
   const headerBg = colorScheme === 'light' ? 'rgb(250,250,250)' : 'rgb(38,38,38)'
   const headerTitle = colorScheme === 'light' ? 'rgb(38,38,38)' : 'rgb(250,250,250)'

   const { isSignedIn, orgRole } = useAuth()
   const { user } = useClerk()
   const canWrite = orgRole === 'org:practitioner_admin'

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
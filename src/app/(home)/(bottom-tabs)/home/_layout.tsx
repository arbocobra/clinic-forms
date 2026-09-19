import { useAuth } from '@clerk/expo';
import { Stack } from 'expo-router';
import { headerStyles } from '@/src/constants/styles'

const Layout = () => {
   const { orgRole } = useAuth()

   const isPracticeAdmin = orgRole === 'org:practitioner_admin'
   const isPracticeMember = orgRole === 'org:practitioner_member'
   const isClient = orgRole === 'org:client'

   const { background, tint } = headerStyles

   return (
      <Stack screenOptions={{ headerShown: false }}>
         <Stack.Protected guard={isPracticeAdmin}>
            <Stack.Screen name='(practice-admin)' />
         </Stack.Protected>
         <Stack.Protected guard={isPracticeMember}>
            <Stack.Screen name='(practice-member)' />
         </Stack.Protected>
         <Stack.Protected guard={isClient}>
            <Stack.Screen name='(practice-client)' />
         </Stack.Protected>
         <Stack.Screen name='error' options={{headerShown: true, headerTitle:'Error', headerTintColor:tint, headerStyle: {backgroundColor: background}}} />
      </Stack>
   )
}

export default Layout;
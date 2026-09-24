import { useAuth } from '@clerk/expo';
import { Stack } from 'expo-router';

const Layout = () => {
   const { orgRole } = useAuth()

   const isPracticeAdmin = orgRole === 'org:practitioner_admin'
   const isPracticeMember = orgRole === 'org:practitioner_member'
   const isClient = orgRole === 'org:client'

   const headerOptions = { 
      headerShown: true, 
      headerTitle: 'Error', 
      // headerTintColor: tint, 
      // headerStyle: { backgroundColor: background } 
   }

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
         <Stack.Screen name='error' options={headerOptions} />
      </Stack>
   )
}

export default Layout;
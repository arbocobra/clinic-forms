import { useAuth } from '@clerk/expo';
import { Redirect, Stack, useSegments, type Href } from 'expo-router';
import { Spinner } from '@ui/spinner';
import { Center } from '@ui/center';
import { useUserRoles } from '@/hooks/useUserRoles';

const Layout = () => {
   const { isLoaded, destination, isRedirect, roles } = useUserRoles();
   const { isAdmin, isPracticeAdmin, isPracticeMember, isClient } = roles

   if (!isLoaded) {
      return (
         <Center>
            <Spinner />
         </Center>
      )
   }

   if (isRedirect) {
      return <Redirect href={destination as Href} />
   }

   return (
      <Stack screenOptions={{ headerShown: false }}>
         { isAdmin && <Stack.Screen name='(admin)' /> }
         { isPracticeAdmin && <Stack.Screen name='(practice-admin)' /> }
         { isPracticeMember && <Stack.Screen name='(practice-member)' /> }
         { isClient && <Stack.Screen name='(practice-client)' /> }
         <Stack.Screen name='error' options={{headerShown: true, headerTitle: 'Error', }} />
      </Stack>
   )
}

export default Layout;
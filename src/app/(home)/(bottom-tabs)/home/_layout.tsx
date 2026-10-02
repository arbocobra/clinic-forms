import { useAuth, useUser, useOrganizationList, useOrganization } from '@clerk/expo';
import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { Spinner } from '@/components/ui/spinner';
import { Center } from '@/components/ui/center';
import { Container } from '@/components/custom/wrapper';

const Layout = () => {
   const { orgRole, sessionClaims, isLoaded } = useAuth()
   const [role, setRole] = useState<string | undefined>(undefined)
   // const { organization: currentOrg } = useOrganization()
   // const { isLoaded, setActive, userMemberships } = useOrganizationList({ userMemberships: { infinite: true }});

   const assignRole = ({activeOrganization, memberships}:CustomJwtSessionClaims):void => {
      
      if (Object.values(memberships).includes('org:admin')) {
         setRole('admin')
         return
      }
      if (activeOrganization.role === 'org:practitioner_admin') {
         setRole('practiceAdmin')
         return
      }
      if (activeOrganization.role === 'org:practitioner_member') {
         setRole('practiceMember')
         return
      }
      if (activeOrganization.role === 'org:client') {
         setRole('client')
         return
      }

      setRole('unknown')
      return
   }

   // const isPracticeAdmin = role === 'practiceAdmin'
   // const isPracticeMember = role === 'practiceMember'
   // const isClient = role === 'client'
   // const isAdmin = role === 'admin'

   const isPracticeAdmin = orgRole === 'org:practitioner_admin'
   const isPracticeMember = role === 'org:practitioner_member'
   const isClient = role === 'org:client'
   // const isAdmin = role === 'admin'

   useEffect(() => {
      if (!!sessionClaims) {
         const { activeOrganization, memberships } = sessionClaims
         if (memberships) {
            assignRole({activeOrganization, memberships})
         }
      }
   }, [isLoaded])

   useEffect(() => {
      console.log('role: ', role)
   }, [role])

   if (!isLoaded) {
      return (
         <Center>
            <Spinner />
         </Center>
      )
   }

   return (
      <Stack screenOptions={{ headerShown: false }}>
         { isPracticeAdmin && <Stack.Screen name='(practice-admin)' /> }
         { isPracticeMember && <Stack.Screen name='(practice-member)' /> }
         { isClient && <Stack.Screen name='(practice-client)' /> }
         {/* { isAdmin && <Stack.Screen name='(admin)' /> } */}
         <Stack.Screen name='error' options={{headerShown: true, headerTitle: 'Error', }} />

         {/* <Stack.Protected guard={isPracticeAdmin}>
            <Stack.Screen name='(practice-admin)' />
         </Stack.Protected>
         <Stack.Protected guard={isPracticeMember}>
            <Stack.Screen name='(practice-member)' />
         </Stack.Protected>
         <Stack.Protected guard={isClient}>
            <Stack.Screen name='(practice-client)' />
         </Stack.Protected> */}
         {/* <Stack.Protected guard={role === 'admin'}>
            <Stack.Screen name='(admin)' />
         </Stack.Protected> */}
         {/* <Stack.Protected guard={isAdmin}>
            <Stack.Screen name='error' options={{headerShown: true, headerTitle: 'Error', }} />
         </Stack.Protected> */}
         

      </Stack>
   )
}

export default Layout;
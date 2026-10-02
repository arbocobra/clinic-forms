import { useAuth, useUser, useOrganizationList, useOrganization } from '@clerk/expo';
import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';

const Layout = () => {
   const { orgRole } = useAuth()
   const { organization: currentOrg } = useOrganization()
   const { isLoaded, setActive, userMemberships } = useOrganizationList({ userMemberships: { infinite: true }});

   const handleClearOrg = async () => {
      console.log('userMemberships.count:', userMemberships?.count)
      if (setActive) {
         await setActive({ organization: null });
         userMemberships.revalidate()
      }
   };

   useEffect(() => {
      if (!userMemberships.isLoading) {
         console.log('userMemberships.isLoading: ', userMemberships.isLoading)
         if (userMemberships.count && userMemberships.count > 1) {
            handleClearOrg()
         }
      }
   }, [userMemberships.isLoading])

   useEffect(() => {
      console.log(currentOrg?.name)
   }, [currentOrg])


   // const { organization: currentOrg } = useOrganization()

   // const { user } = useUser()
   // const orgData = user?.organizationMemberships.map(org => ({name: org.organization.name, role: org.role, roleName: org.roleName }))

   // const { userMemberships } = useOrganizationList({
   //    userMemberships: { infinite: true, }
   // })

   // const role = { isPracticeAdmin: false, isPracticeMember: false, isClient: false, isMulti }
   // const count = userMemberships && userMemberships?.count ? userMemberships.count : 0

   // if (count === 1) {
   //    role.isPracticeAdmin = orgRole === 'org:practitioner_admin'
   //    role.isPracticeMember = orgRole === 'org:practitioner_member'
   //    role.isClient = orgRole === 'org:client'
   // } 

   // console.log(JSON.stringify(memberships, null, 2))
   // console.log('Current Org: ', currentOrg?.name)

   const isPracticeAdmin = orgRole === 'org:practitioner_admin'
   const isPracticeMember = orgRole === 'org:practitioner_member'
   const isClient = orgRole === 'org:client'


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
         <Stack.Screen name='error' options={{headerShown: true, headerTitle: 'Error', }} />
      </Stack>
   )
}

export default Layout;
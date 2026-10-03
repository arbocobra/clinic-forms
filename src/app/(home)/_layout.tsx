import { useAuth, useUser, useOrganizationList, useOrganization } from '@clerk/expo'
import { Redirect, Stack, useRouter, useRootNavigationState  } from 'expo-router'
import { View, Text } from 'react-native'
import { useEffect, useState } from 'react';
import type { UserResource } from '@clerk/expo/types'
import type { UserOrgData } from '@/types'

const Layout = () => {

   const { isSignedIn, isLoaded, sessionClaims, userId  } = useAuth()
   const router = useRouter();

   const [isLoading, setIsLoading] = useState(true);
   const [userOrgData, setUserOrgData] = useState<UserOrgData | undefined>(undefined);

   useEffect(() => {
      // console.log('isSignedIn: ', isSignedIn, ' | isLoaded: ', isLoaded)
      // checkOrganizationStatus()
      if (isLoaded && sessionClaims) {
         console.log('userId: ', userId)
         console.log('memberships: ', Object.values(sessionClaims.memberships))
         console.log('activeOrganization: ', sessionClaims.activeOrganization)
      }
   },[isLoaded, isSignedIn, userId])


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

/* old

   useEffect(() => {
      console.log('isLoading: ', isLoading)
   }, [isLoading])

   const testCheckOrgStatus = () => {
      setIsLoading(true);
      // console.log('sessionClaims: ', !!sessionClaims)
      if (!!sessionClaims) {
         const activeOrgId = sessionClaims.activeOrganization.id;
         const userOrgs = sessionClaims.memberships || {};
         const count = Object.keys(userOrgs).length;

         console.log('activeOrgId: ', activeOrgId)
         console.log('count: ', count)
         
         if (count === 0) {
            console.log('User has no organizations');
            setIsLoading(false);
            return;
         }

         if (count === 1) {
            console.log('User has 1 organization')
            setIsLoading(false)
            return
         }

         if (count > 1) {
            console.log('User has multiple organizations')
            setIsLoading(false)
            return
         }

      }
   }

   const checkOrganizationStatus = async () => {
      setIsLoading(true);

      try {
         // redirect away if not signed in yet
         if (!isSignedIn) {
            router.replace('/(auth)/sign-in');
            return;
         }
         console.log('sessionClaims: ', !!sessionClaims, ' | isLoaded: ', isLoaded)
       }
   }
   
   
   const updateOrgData = (data:CustomJwtSessionClaims):void => {
      const result = {
         count: Object.keys(data.memberships).length,
         memberships: data.memberships
      }
   
      if (data.activeOrganization.id) {
         setUserOrgData(() => ({
            ...result,
            isActive:true,
            currentOrg: data.activeOrganization.name,
            currentRole: data.activeOrganization.role.slice(4),
            currentId: data.activeOrganization.id,
         }))
      } else {
         setUserOrgData(() => ({
            ...result,
            isActive:false
         }))
      }
   }
   

   useEffect(() => {
      console.log('isLoaded: ', isLoaded)
      if (isLoaded && sessionClaims) {
         const { activeOrganization, memberships } = sessionClaims
         updateOrgData({activeOrganization, memberships})
      }
   },[isLoaded])

  


  const checkOrganizationStatus = async () => {
   setIsLoading(true);

   try {
      if (!isSignedIn) {
        router.replace('/(auth)/sign-in');
        return;
      }

      const userOrgs = userMemberships?.data || [];

      if (userOrgs.length === 0) {
         console.warn('User has no organizations');
         setIsLoading(false);
         return;
      }
      if (userOrgs.length === 1) {
        // Auto-select the only organization
        const orgId = userOrgs[0].organization?.id;
        if (orgId && !activeOrgId) {
          await setActive?.({ organization: orgId });
        }
        setHasActiveOrg(true);
      }
   }
  }


 useEffect(() => {
      console.log(userOrgData)
   },[userOrgData])
*/
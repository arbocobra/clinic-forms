import { useAuth } from '@clerk/expo'
import { Redirect, Stack, useRootNavigationState  } from 'expo-router'
import { View, Text } from 'react-native'
import { useEffect } from 'react';

const Layout = () => {
   // const rootState = useRootNavigationState()
   const { isSignedIn, isLoaded } = useAuth()

//    useEffect(() => {
//       if (rootState?.routes) {
//       // Logs an array of all active route objects in the current history stack
//       console.log('(home) - Current Navigation Stack:', rootState.routes);
      
//       // If you only want a clean list of the screen names:
//       const screenNames = rootState.routes.map(route => route.name);
//       console.log('(home) - Active Stack Screen Names:', screenNames);
//     }
//   }, [rootState]);


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
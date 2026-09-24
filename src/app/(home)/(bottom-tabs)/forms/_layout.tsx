import { useAuth } from '@clerk/expo';
import { Tabs } from 'expo-router';

const Layout = () => {
   const { orgRole } = useAuth()

   const canRead = orgRole === 'org:practitioner_admin' || orgRole === 'org:practitioner_member'
   const canWrite = orgRole === 'org:practitioner_admin'
   const canSubmit = orgRole === 'org:client'

   return (
      <Tabs screenOptions={{
         tabBarPosition: 'top',
         tabBarStyle: { height: 130, paddingTop: 70 },
         tabBarActiveTintColor: '#009689',
         tabBarInactiveTintColor: '#101828',
         tabBarLabelPosition: 'beside-icon',
         tabBarIcon: () => null, 
      }}>
         <Tabs.Screen name='index' options={{ title: 'Forms Home', headerShown: false, tabBarItemStyle: {} }} />
         <Tabs.Protected guard={canWrite}>
            <Tabs.Screen name='write' options={{ title: 'Write Forms', headerShown: false, tabBarItemStyle: {} }} />
         </Tabs.Protected>
         <Tabs.Protected guard={canRead}>
            <Tabs.Screen name='read' options={{ title: 'Read Forms', headerShown: false, tabBarItemStyle: {} }} />
         </Tabs.Protected>
         <Tabs.Protected guard={canSubmit}>
            <Tabs.Screen name='submit' options={{ title: 'Submit Forms', headerShown: false, tabBarItemStyle: {} }} />
         </Tabs.Protected>
         {/* <Tabs.Protected guard={canWrite}>
            <Tabs.Screen name='create' options={{ href: null, title: 'New Form' }} />
         </Tabs.Protected> */}
      </Tabs>
   )
}

export default Layout;
import { useAuth, useClerk } from '@clerk/expo';
import { Tabs } from 'expo-router'
import { StyleSheet } from 'react-native';

const Layout = () => {
   const { user } = useClerk()
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
         <Tabs.Screen name='index' options={{ title: 'Home', headerShown: false, tabBarItemStyle: styles.tab }} />
         <Tabs.Screen name='page-two' options={{ title: 'Page Two', headerShown: false, tabBarItemStyle: styles.tab }} />
      </Tabs>
   )
}

export default Layout;

const styles = StyleSheet.create({
   tab: {}
})
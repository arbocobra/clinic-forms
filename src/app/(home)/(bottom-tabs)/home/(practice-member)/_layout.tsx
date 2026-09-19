import { Tabs } from 'expo-router';

const Layout = () => {

   return (
      <Tabs screenOptions={{
         tabBarPosition: 'top',
         tabBarStyle: { height: 130, paddingTop: 70 },
         tabBarActiveTintColor: '#009689',
         tabBarInactiveTintColor: '#101828',
         tabBarLabelPosition: 'beside-icon',
         tabBarIcon: () => null, 
      }}>
         <Tabs.Screen name='index' options={{ title: 'Member Home', headerShown: false }} />
         <Tabs.Screen name='page-two' options={{ title: 'Page Two', headerShown: false }} />
      </Tabs>
   )
}

export default Layout;
import { Tabs } from 'expo-router';
import { BookOpenCheck, House, User } from 'lucide-react-native';


const BottomTabsLayout = () => {
   const screenOptions = {
      tabBarInactiveBackgroundColor: '#e5e7eb',
      tabBarActiveTintColor: '#009689',
      tabBarInactiveTintColor: '#99a1af',
      tabBarStyle: {
         backgroundColor: '#fff'
      }
   }
   
   return (
      <Tabs screenOptions={screenOptions}>
         <Tabs.Screen name='home' options={{
            title: 'Home', headerShown: false, tabBarIcon: ({ color }) => (
               <House size={28} title='Home' color={color} />
            ),
         }} />
         <Tabs.Screen name='forms' options={{
            title: 'Forms', headerShown: false, tabBarIcon: ({ color }) => (
               <BookOpenCheck size={28} title='Forms' color={color} />
            ),
         }} />
         <Tabs.Screen name='profile' options={{
            title: 'Profile', headerShown: false, tabBarIcon: ({ color }) => (
               <User size={28} title='Profile' color={color} />
            ),
         }} />
      </Tabs>

   )
}

export default BottomTabsLayout;
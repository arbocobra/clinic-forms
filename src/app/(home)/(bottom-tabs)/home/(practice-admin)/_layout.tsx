// import { Tabs } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Pressable } from '@/components/ui/pressable'
import { Tabs, TabSlot, TabList, TabTrigger, type TabTriggerSlotProps  } from 'expo-router/ui';
import { CustomTopTabList, CustomTopTabButton } from '@/components/custom/tabs';
import { VStack } from '@/components/ui/vstack'

const Layout = () => {

   return (
      <Tabs>
         <TabList asChild>
            <CustomTopTabList>
               <TabTrigger name='index' href='/home' asChild>
                  <CustomTopTabButton label='Home' />
               </TabTrigger>
               <TabTrigger name='page-two' href='/home/page-two' asChild>
                  <CustomTopTabButton label='Page Two' />
               </TabTrigger>
            </CustomTopTabList>
         </TabList>
         <TabSlot />
      </Tabs>
   )
}

// const CustomTabSlotWrapper = () => (
//    <TabSlot renderFn={(descriptor, {isFocused, loaded}) => {
//       if (!loaded) return null;
//       return (
         // <ScrollView keyboardShouldPersistTaps='handled' className='flex-1'>
         //    <VStack space='md' className='flex-1 min-h-full bg-background p-5 items-center'>
         //        { descriptor.render() }
         //    </VStack>
         // </ScrollView>
//       )
//    }} />
// )

export default Layout;

/* OLD
<Tabs screenOptions={{
         tabBarPosition: 'top',
         tabBarIconStyle: { display: 'none' },
         tabBarLabel: ({focused, children}) => <CustomLabel focused={focused} children={children} />,
         // tabBarStyle: { height: 130, paddingTop: 70 },
         // tabBarActiveTintColor: '',
         // tabBarInactiveTintColor: '',
         tabBarIcon: () => null, 
         tabBarBackground: () => <View className='bg-background w-full h-30'  />,
         tabBarButton: (props) => {
            const isFocused = props.accessibilityState?.selected;
            return <CustomTabButton { ...props } />
         }
      }}>
         <Tabs.Screen name='index' options={{ title: 'Admin Home', headerShown: false, }} />
         <Tabs.Screen name='page-two' options={{ title: 'Page Two', headerShown: false }} />
      </Tabs>
*/
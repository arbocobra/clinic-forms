import { Tabs, TabSlot, TabList, TabTrigger } from 'expo-router/ui';
import { CustomTopTabList, CustomTopTabButton } from '@/components/custom/tabs';

const Layout = () => {
   return (
      <Tabs>
         <TabList asChild>
            <CustomTopTabList>
               <TabTrigger name='index' href='/profile' asChild>
                  <CustomTopTabButton label='Profile' />
               </TabTrigger>
            </CustomTopTabList>
         </TabList>
         <TabSlot />
      </Tabs>
   )
}

export default Layout;
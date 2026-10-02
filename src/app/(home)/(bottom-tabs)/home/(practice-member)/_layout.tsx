import { Tabs, TabSlot, TabList, TabTrigger } from 'expo-router/ui';
import { CustomTopTabList, CustomTopTabButton } from '@/components/custom/tabs';

const Layout = () => (
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

export default Layout;
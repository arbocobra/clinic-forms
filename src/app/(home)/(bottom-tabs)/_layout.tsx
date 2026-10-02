import { Tabs, TabSlot, TabList, TabTrigger } from 'expo-router/ui';
import { CustomBottomTabList, CustomBottomTabButton } from '@/components/custom/tabs';
import { BookOpenCheck, House, User } from 'lucide-react-native';

const BottomTabsLayout = () => (
   <Tabs>
      <TabSlot />
      <TabList asChild>
         <CustomBottomTabList>
            <TabTrigger name='home' href='/home' asChild>
               <CustomBottomTabButton label='Home' icon={House} />
            </TabTrigger>
            <TabTrigger name='forms' href='/forms' asChild>
               <CustomBottomTabButton label='Forms' icon={BookOpenCheck} />
            </TabTrigger>
            <TabTrigger name='profile' href='/profile' asChild>
               <CustomBottomTabButton label='Profile' icon={User} />
            </TabTrigger>
         </CustomBottomTabList>
      </TabList>
   </Tabs>
)

export default BottomTabsLayout;
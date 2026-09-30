import { useAuth } from '@clerk/expo';
import { Tabs, TabSlot, TabList, TabTrigger } from 'expo-router/ui';
import { CustomTopTabList, CustomTopTabButton } from '@/components/custom/tabs';

const Layout = () => {
   const { orgRole } = useAuth()

   const canRead = orgRole === 'org:practitioner_admin' || orgRole === 'org:practitioner_member'
   const canWrite = orgRole === 'org:practitioner_admin'
   const canSubmit = orgRole === 'org:client'

   return (
      <Tabs>
         <TabList asChild>
            <CustomTopTabList>
               <TabTrigger name='index' href='/home' asChild>
                  <CustomTopTabButton label='Home' />
               </TabTrigger>
               
               { canWrite && 
                  <TabTrigger name='write' href='/forms/write' asChild>
                     <CustomTopTabButton label='Write Forms' />
                  </TabTrigger>
               }
               { canRead && 
                  <TabTrigger name='read' href='/forms/read' asChild>
                     <CustomTopTabButton label='Page Two' />
                  </TabTrigger>
               }
               { canSubmit && 
                  <TabTrigger name='submit' href='/forms/submit' asChild>
                     <CustomTopTabButton label='Page Two' />
                  </TabTrigger>
               }
            </CustomTopTabList>
         </TabList>
         <TabSlot />
      </Tabs>
   )
}

export default Layout;
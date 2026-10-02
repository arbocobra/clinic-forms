import { useAuth } from '@clerk/expo';
import { Tabs, TabSlot, TabList, TabTrigger } from 'expo-router/ui';
import { CustomTopTabList, CustomTopTabButton } from '@/components/custom/tabs';
import { useSegments } from 'expo-router';

const Layout = () => {
   const { orgRole } = useAuth()
   const segments = useSegments();

   const canRead = orgRole === 'org:practitioner_admin' || orgRole === 'org:practitioner_member'
   const canWrite = orgRole === 'org:practitioner_admin'
   const canSubmit = orgRole === 'org:client'

   return (
      <Tabs>
         <TabList asChild>
            <CustomTopTabList route={segments.at(-1)}>
               <TabTrigger name='index' href='/home' asChild>
                  <CustomTopTabButton label='Home' />
               </TabTrigger>
               
               { canWrite && 
                  <TabTrigger name='index' href='/forms/write' asChild>
                     <CustomTopTabButton label='Write Forms' />
                  </TabTrigger>
               }
               { canRead && 
                  <TabTrigger name='read' href='/forms/read' asChild>
                     <CustomTopTabButton label='Read Forms' />
                  </TabTrigger>
               }
               { canSubmit && 
                  <TabTrigger name='submit' href='/forms/submit' asChild>
                     <CustomTopTabButton label='Submit Forms' />
                  </TabTrigger>
               }
               
            </CustomTopTabList>
         </TabList>
         <TabSlot />
      </Tabs>
   )
}

export default Layout;
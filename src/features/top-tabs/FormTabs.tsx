import { Tabs, TabSlot, TabList, TabTrigger } from 'expo-router/ui';
import { CustomTopTabList, CustomTopTabButton } from '@components/tabs';
import { useAdminSwitch } from '@/src/hooks/useAdminSwitch';
import { useUserRoles } from '@/src/hooks/useUserRoles';
import { SwitchSheet, SwitchButton } from '@features/top-tabs/OrganizationSwitch';

export const FormTabs = () => {
   const { canSwitchOrganizations, isOpen, openSwitch, closeSwitch, switchOrganization, memberData } = useAdminSwitch()
   const { segments, roles: {isPracticeAdmin, isPracticeMember, isClient} } = useUserRoles();

   const canRead = isPracticeAdmin || isPracticeMember
   const canWrite = isPracticeAdmin
   const canSubmit = isClient

   return (
      <Tabs>
         <TabList asChild>
            <CustomTopTabList route={segments.at(-1)}>
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
                     <CustomTopTabButton label='Read Forms' />
                  </TabTrigger>
               }
               { canSubmit && 
                  <TabTrigger name='submit' href='/forms/submit' asChild>
                     <CustomTopTabButton label='Submit Forms' />
                  </TabTrigger>
               }
               { canSwitchOrganizations && <SwitchButton isOpen={isOpen} action={openSwitch} /> }
               { canSwitchOrganizations && <SwitchSheet isOpen={isOpen} data={memberData} handleClose={closeSwitch} handlePress={switchOrganization} /> }
               
            </CustomTopTabList>
         </TabList>
         <TabSlot />
      </Tabs>
   )
}
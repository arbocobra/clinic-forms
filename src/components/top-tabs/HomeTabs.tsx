import { Tabs, TabSlot, TabList, TabTrigger } from 'expo-router/ui';
import { CustomTopTabList, CustomTopTabButton } from '@/components/custom/tabs';
import { useAdminSwitch } from '@/src/hooks/useAdminSwitch';
import { SwitchSheet, SwitchButton } from '@/features/top-tabs/OrganizationSwitch';

export const HomeTabs = () => {

   const { canSwitchOrganizations, isOpen, openSwitch, closeSwitch, switchOrganization, memberData } = useAdminSwitch()

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
               { canSwitchOrganizations && <SwitchButton isOpen={isOpen} action={openSwitch} /> }
               { canSwitchOrganizations && <SwitchSheet isOpen={isOpen} data={memberData} handleClose={closeSwitch} handlePress={switchOrganization} /> }
            </CustomTopTabList>
         </TabList>
         <TabSlot />
      </Tabs>
   )
}
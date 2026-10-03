import { Tabs, TabSlot, TabList, TabTrigger } from 'expo-router/ui';
import { CustomTopTabList, CustomTopTabButton } from '@/components/custom/tabs';
import { useAdminSwitch } from '@/src/hooks/useAdminSwitch';
import { SwitchSheet, SwitchButton } from '@/features/top-tabs/OrganizationSwitch';

export const ProfileTabs = () => {
   const { canSwitchOrganizations, isOpen, openSwitch, closeSwitch, memberData, switchOrganization } = useAdminSwitch()

   return (
      <Tabs>
         <TabList asChild>
            <CustomTopTabList>
               <TabTrigger name='index' href='/profile' asChild>
                  <CustomTopTabButton label='Profile' />
               </TabTrigger>
               { canSwitchOrganizations && <SwitchButton isOpen={isOpen} action={openSwitch} /> }
               { canSwitchOrganizations && <SwitchSheet isOpen={isOpen} data={memberData} handleClose={closeSwitch} handlePress={switchOrganization} /> }
            </CustomTopTabList>
         </TabList>
         <TabSlot />
      </Tabs>
   )
}
import { useState, useEffect } from 'react';
import { useAuth, useOrganizationList } from '@clerk/expo';

export const useAdminSwitch = () => {
   const { sessionClaims } = useAuth()
   
   const canSwitchOrganizations = Object.values(
      sessionClaims?.memberships ?? {}
   ).includes('org:admin')
   
   const { isLoaded, setActive, userMemberships } = useOrganizationList({
      userMemberships: { infinite: true },
   })
   
   const [isOpen, setIsOpen] = useState(false)
   const [switchingOrgId, setSwitchingOrgId] = useState<string>()
   const [switchError, setSwitchError] = useState<string>()

   const toggleSwitch = ():void => setIsOpen((current:boolean) => !current)

   const openSwitch = ():void => setIsOpen(true)
   const closeSwitch = ():void => setIsOpen(false)

   const switchOrganization = async (orgId:string) => {
      if (!setActive) {
         setSwitchError('Organization switching is unavailable.')
         return false
      }
      setSwitchingOrgId(orgId)
      setSwitchError(undefined)

      try {
         await setActive({ organization: orgId })
         setIsOpen(false)
         return true
      } catch (e) {
         console.error('Failed to switch organization:', e)
         setSwitchError(e instanceof Error ? e.message : 'Could not switch organization.' )
         return false
      } finally {
         setSwitchingOrgId(undefined)
      }
   }

   const memberData = userMemberships.data ? userMemberships.data.map(data => ({
      id: data.organization.id, 
      roleName: data.roleName,
      role: data.role
   })) : [];

   return {
      canSwitchOrganizations, isOpen, toggleSwitch, memberData, openSwitch, closeSwitch, switchOrganization
   }
}
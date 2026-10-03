import { useAuth } from '@clerk/expo';
import { useSegments } from 'expo-router';

export const useUserRoles = () => {
   const { orgRole, sessionClaims, isLoaded } = useAuth()
   const segments = useSegments()

   const hasAdminMembership = Object.values(
      sessionClaims?.memberships ?? {}
   ).includes('org:admin')

   /* const isAdmin = Object.values(sessionClaims?.memberships ?? {}).includes('org:admin')
   const isPracticeAdmin = !isAdmin && orgRole === 'org:practitioner_admin'
   const isPracticeMember = !isAdmin && orgRole === 'org:practitioner_member'
   const isClient = !isAdmin && orgRole === 'org:client' */

   
   const isAdmin = orgRole === 'org:admin'
   const isPracticeAdmin = orgRole === 'org:practitioner_admin'
   const isPracticeMember = orgRole === 'org:practitioner_member'
   const isClient = orgRole === 'org:client'

   const roleSegment = isAdmin
      ? '(admin)'
      : isPracticeAdmin
         ? '(practice-admin)'
         : isPracticeMember
            ? '(practice-member)'
            : isClient
               ? '(practice-client)'
               : undefined

   const destination = roleSegment
         ? `/(home)/(bottom-tabs)/home/${roleSegment}`
         : '/(home)/(bottom-tabs)/home/error'

   const isRedirect = !segments.some((s) => s === (roleSegment ?? 'error'))

   const roleTest = `Org: ${sessionClaims?.activeOrganization.name} | Role: ${sessionClaims?.activeOrganization.role}`

   return { isLoaded, destination, isRedirect, segments, roles: {isAdmin, isPracticeAdmin, isPracticeMember, isClient}, roleTest }
}
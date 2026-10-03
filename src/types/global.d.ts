type Roles = 'admin' | 'client' | 'practiceMember' | 'practiceAdmin'

declare global {

   interface CustomJwtSessionClaims {
      activeOrganization: {
         id:string,
         name:string,
         role:string
      },
      memberships: {
         [key:string]:string
      }
  }
}

export {}
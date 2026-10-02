# Temp Update suggestions

## How User Org Works

1.  User logs in  via  `/(auth)/sign-in`
2.  `(home)/_layout.tsx`  checks organization status:
    -   If 1 org: Auto-selects it and goes to home
    -   If multiple orgs and none active: Redirects to  `select-organization`
    -   If multiple orgs and one is active: Goes to home
3.  User selects organization  on  `select-organization`  screen
4.  Redirects to home with active organization set

## How Drawer Works

1.  Single organization: User goes directly to  `/(home)/(tabs)`  —  no drawer
2.  Multiple organizations (none selected): User redirected to  `select-organization`screen
3.  Multiple organizations (selected): User goes to  `/(home)/(drawer)/(tabs)`  —  drawer appears
4.  Organization switching: Tapping an org in the drawer calls  `setActiveOrganization()`  and refreshes the view
5.  Drawer automatically shows/hides  based on organization count using  `useUser()`

This approach keeps the routing clean and only loads the drawer when needed!
```
app/
├── _layout.tsx
├── (auth)/
│   └── sign-in.tsx
├── (home)/
│   ├── _layout.tsx
│   ├── select-organization.tsx
│   ├── (tabs)/                    # Single org route
│   │   ├── _layout.tsx
│   │   ├── home/
│   │   ├── profile-a/
│   │   └── profile-b/
│   └── (drawer)/                  # Multiple org route with drawer
│       ├── _layout.tsx
│       └── (tabs)/
│           ├── _layout.tsx
│           ├── home/
│           ├── profile-a/
│           └── profile-b/
└── components/
    └── OrganizationDrawer.tsx
```

> Written with [StackEdit](https://stackedit.io/).
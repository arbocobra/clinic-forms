// app/(home)/_layout.tsx
import { useAuth, useUser } from '@clerk/expo'
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Stack, useRouter } from 'expo-router';

export default function HomeLayout() {
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [hasActiveOrg, setHasActiveOrg] = useState(false);

  useEffect(() => {
    checkOrganizationStatus();
  }, [isSignedIn, user]);

  const checkOrganizationStatus = async () => {
    setIsLoading(true);

    try {
      if (!isSignedIn) {
        router.replace('/(auth)/sign-in');
        return;
      }

      // Get active organization from Clerk session
      const activeOrgId = user?.primaryOrgId;
      const userOrgs = user?.organizationMemberships || [];

      if (userOrgs.length === 0) {
        // User has no organizations (shouldn't happen per your settings)
        console.warn('User has no organizations');
        setIsLoading(false);
        return;
      }

      if (userOrgs.length === 1) {
        // Auto-select the only organization
        const orgId = userOrgs[0].organization?.id;
        if (orgId && !activeOrgId) {
          await user?.setActiveOrganization({ organization: orgId });
        }
        setHasActiveOrg(true);
      } else if (userOrgs.length > 1 && !activeOrgId) {
        // Multiple organizations and none selected yet
        router.replace('/(home)/select-organization');
        setIsLoading(false);
        return;
      } else {
        // Active organization is already set
        setHasActiveOrg(true);
      }
    } catch (error) {
      console.error('Error checking organization status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!isSignedIn) {
    return null; // Router will handle redirect
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="select-organization" />
      <Stack.Screen name="(bottom-tabs)" />
    </Stack>
  );
}

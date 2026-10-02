// app/(home)/select-organization.tsx
import { useAuth } from '@clerk/clerk-expo';
import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';

export default function SelectOrganizationScreen() {
  const { getToken, sessionId } = useAuth();
  const router = useRouter();
  const [organizations, setOrganizations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserOrganizations();
  }, []);

  const fetchUserOrganizations = async () => {
    try {
      // Get organizations from Clerk session
      const token = await getToken();
      const response = await fetch('https://api.clerk.com/v1/organizations', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const orgs = await response.json();
      setOrganizations(orgs);
    } catch (error) {
      console.error('Failed to fetch organizations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectOrganization = async (orgId: string) => {
    try {
      // Set active organization in Clerk session
      const token = await getToken();
      await fetch(`https://api.clerk.com/v1/organizations/${orgId}/set-active`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      // Redirect to home
      router.replace('/(home)/(bottom-tabs)/home');
    } catch (error) {
      console.error('Failed to set active organization:', error);
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>
        Select Your Organization
      </Text>
      
      <FlatList
        data={organizations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handleSelectOrganization(item.id)}
            style={{
              padding: 16,
              marginBottom: 12,
              borderRadius: 8,
              backgroundColor: '#f0f0f0',
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: '600' }}>
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

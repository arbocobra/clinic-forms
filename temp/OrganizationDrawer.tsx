// app/components/OrganizationDrawer.tsx
import { useUser } from '@clerk/clerk-expo';
import { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

export function OrganizationDrawer() {
  const { user } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const organizations = user?.organizationMemberships || [];
  const activeOrgId = user?.primaryOrgId;

  const handleSelectOrganization = async (orgId: string) => {
    if (orgId === activeOrgId) {
      return;
    }

    setLoading(true);
    try {
      await user?.setActiveOrganization({ organization: orgId });
      // Optional: trigger a refresh or navigation
      router.push('/(home)/(drawer)/(tabs)/home');
    } catch (error) {
      console.error('Failed to switch organization:', error);
    } finally {
      setLoading(false);
    }
  };

  // Only show drawer if user has multiple organizations
  if (organizations.length <= 1) {
    return (
      <View style={styles.container}>
        <Text style={styles.emptyText}>No other organizations</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="business" size={24} color="#007AFF" />
        <Text style={styles.headerText}>Switch Organization</Text>
      </View>

      {loading && <ActivityIndicator size="large" style={styles.loader} />}

      <FlatList
        data={organizations}
        keyExtractor={(item) => item.organization?.id || ''}
        scrollEnabled={false}
        renderItem={({ item }) => {
          const orgId = item.organization?.id;
          const isActive = orgId === activeOrgId;

          return (
            <TouchableOpacity
              onPress={() => handleSelectOrganization(orgId)}
              disabled={loading || isActive}
              style={[
                styles.orgButton,
                isActive && styles.activeOrgButton,
              ]}
              activeOpacity={isActive ? 1 : 0.7}
            >
              <View style={styles.orgButtonContent}>
                <Text
                  style={[
                    styles.orgButtonText,
                    isActive && styles.activeOrgButtonText,
                  ]}
                >
                  {item.organization?.name}
                </Text>
                {isActive && (
                  <Ionicons
                    name="checkmark-circle"
                    size={20}
                    color="#fff"
                    style={styles.checkmark}
                  />
                )}
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 16,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 12,
    color: '#333',
  },
  emptyText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    marginTop: 32,
  },
  loader: {
    marginVertical: 16,
  },
  orgButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginHorizontal: 12,
    marginVertical: 6,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
  },
  activeOrgButton: {
    backgroundColor: '#007AFF',
  },
  orgButtonContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orgButtonText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
    flex: 1,
  },
  activeOrgButtonText: {
    color: '#fff',
  },
  checkmark: {
    marginLeft: 8,
  },
});

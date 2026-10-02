// app/(home)/(drawer)/_layout.tsx
import { useUser } from '@clerk/clerk-expo';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { View, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import { OrganizationDrawer } from '../../components/OrganizationDrawer';

function DrawerContent() {
  return <OrganizationDrawer />;
}

export default function DrawerLayout() {
  const { user } = useUser();
  const showDrawer = (user?.organizationMemberships || []).length > 1;

  if (!showDrawer) {
    // If only one organization, render tabs without drawer
    return null; // Will be handled at parent level
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <Drawer
        drawerContent={DrawerContent}
        screenOptions={{
          headerShown: true,
          drawerType: 'front',
          swipeEnabled: true,
          drawerActiveTintColor: '#007AFF',
          drawerInactiveTintColor: '#666',
        }}
      >
        <Drawer.Screen
          name="(tabs)"
          options={{
            title: 'Home',
            drawerLabel: 'Home',
            headerShown: false,
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

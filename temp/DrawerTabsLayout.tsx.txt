// app/(home)/(drawer)/(tabs)/_layout.tsx
import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useUser } from '@clerk/clerk-expo';
import { TouchableOpacity } from 'react-native';
import { useDrawerStatus } from '@react-navigation/drawer';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useNavigation } from 'expo-router';

export default function TabsLayout() {
  const { user } = useUser();
  const showDrawer = (user?.organizationMemberships || []).length > 1;
  const navigation = useNavigation<DrawerNavigationProp<any>>();

  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerRight: showDrawer
          ? () => (
              <TouchableOpacity
                onPress={() => navigation.openDrawer()}
                style={{ marginRight: 16 }}
              >
                <Ionicons name="menu" size={24} color="#007AFF" />
              </TouchableOpacity>
            )
          : undefined,
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'home';

          if (route.name === 'profile-a') {
            iconName = 'person';
          } else if (route.name === 'profile-b') {
            iconName = 'settings';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#666',
      })}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarLabel: 'Home',
        }}
      />
      <Tabs.Screen
        name="profile-a"
        options={{
          title: 'Profile A',
          tabBarLabel: 'Profile A',
        }}
      />
      <Tabs.Screen
        name="profile-b"
        options={{
          title: 'Profile B',
          tabBarLabel: 'Profile B',
        }}
      />
    </Tabs>
  );
}

// app/(home)/(tabs)/_layout.tsx
import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'home';

          if (route.name === 'profile-a') {
            iconName = 'person';
          } else if (route.name === 'profile-b') {
            iconName = 'settings';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007Aff',
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

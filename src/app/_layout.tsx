import { GluestackUIProvider } from '@ui/gluestack-ui-provider';
import '@/src/global.css';
import { ClerkProvider } from '@clerk/expo';
import { tokenCache } from '@clerk/expo/token-cache';
import { Slot } from 'expo-router';
import { SplashScreen } from '@features/splash-screen/index';
import * as SplashScreenExpo from 'expo-splash-screen';
import { AppThemeProvider, useAppTheme } from '@/contexts/app-theme-context';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View } from 'react-native';


const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!

if (!publishableKey) {
  throw new Error('Add your Clerk Publishable Key to the .env file')
}

const AppContent = () => {
  const { colorMode } = useAppTheme();
  
  return (
    <View className='bg-card flex-1'>
      <StatusBar style={ colorMode == 'dark' ? 'light' : 'dark' } />
      <GluestackUIProvider mode={ colorMode }>
        <SafeAreaView edges={['left', 'right', 'top']} style={{flex:1}}>
          <Slot />
        </SafeAreaView>
      </GluestackUIProvider>
    </View>
  )
}

export const RootLayout = () => {
  const [isReady, setIsReady] = useState(false)
  
  useEffect(() => {
    SplashScreenExpo.hideAsync()

    const timer = setTimeout(() => {
      setIsReady(true);
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  if (!isReady) {
    return <SplashScreen />
  }

  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <AppThemeProvider>
        <AppContent />
      </AppThemeProvider>
    </ClerkProvider>
  )
}

export default RootLayout;
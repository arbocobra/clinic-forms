import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import '@/src/global.css';
import { ClerkProvider } from '@clerk/expo';
import { tokenCache } from '@clerk/expo/token-cache';
import { Slot } from 'expo-router';
import SplashScreen from '@/components/custom/splash-screen/index';
import * as SplashScreenExpo from 'expo-splash-screen';
import { AppThemeProvider, useAppTheme } from '@/src/contexts/app-theme-context';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!

if (!publishableKey) {
  throw new Error('Add your Clerk Publishable Key to the .env file')
}

const AppContent = () => {
  const { colorMode } = useAppTheme();
  
  return (
    <>
      <StatusBar style={ colorMode == 'dark' ? 'light' : 'dark' } />
      <GluestackUIProvider mode={ colorMode }>
        <Slot />
      </GluestackUIProvider>
    </>
  )
}

export const RootLayout = () => {
  const [isReady, setIsReady] = useState(false)
  
  useEffect(() => {
    SplashScreenExpo.hideAsync()

    const timer = setTimeout(() => {
      setIsReady(true);
    }, 1000)

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
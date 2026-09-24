import { ThemeName, ColorMode, getThemeVars, themeConfigs } from '@/src/constants/theme';
import { VariableContextProvider } from 'nativewind';
import { Appearance, ColorSchemeName, useColorScheme, View } from 'react-native';
import { createContext, useState, useMemo, useContext, useEffect, ReactNode, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AppThemeContextType {
  currentTheme: ThemeName;
  colorMode: ColorMode;
  resolvedColorMode: 'light' | 'dark';
  isLight: boolean;
  isDark: boolean;
  setTheme: (theme: ThemeName) => void;
  setColorMode: (mode: ColorMode) => void;
  toggleColorMode: () => void;
  availableThemes: { name: ThemeName; display: string }[];
}

const AppThemeContext = createContext<AppThemeContextType | undefined>(undefined);

export const AppThemeProvider:React.FC<{ children: ReactNode }> = ({ children }) => {
   const colorScheme = useColorScheme()
   const setColorScheme = (val:ColorSchemeName):void => { Appearance.setColorScheme(val)} 
   const [currentTheme, setCurrentTheme] = useState<ThemeName>('default');
   const [colorMode, setColorMode] = useState<ColorMode>('system');
   const [isThemeLoaded, setIsThemeLoaded] = useState(false);

   const THEME_STORAGE_KEY = '@app_theme';
   const COLOR_MODE_STORAGE_KEY = '@app_color_mode';

   useEffect(() => {
      const loadTheme = async () => {
         try {
            const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
            const savedMode = await AsyncStorage.getItem(COLOR_MODE_STORAGE_KEY)
            
            if (savedTheme) {
               setCurrentTheme(savedTheme as ThemeName)
            }
            if (savedMode && (savedMode == 'light' || savedMode == 'dark' || savedMode == 'system')) {
               setColorMode(savedMode as ColorMode)
               if (savedMode != 'system') {
                  const mode = savedMode as 'light' | 'dark';
                  setColorMode(mode)
               }
            }
         } catch (error) {
            console.error('Error loading theme:', error);
         } finally {
            setIsThemeLoaded(true);
         }
      }
      loadTheme();
   },[colorScheme])

   const resolvedColorMode = useMemo<'light' | 'dark'>(() => {
      if (colorMode == 'system') {
         return colorScheme == 'dark' ? 'dark' : 'light';
      }
      return colorMode;
   }, [colorMode, colorScheme])

   const isLight = useMemo(() => 
      resolvedColorMode == 'light',
   [resolvedColorMode])

   const isDark = useMemo(() => 
      resolvedColorMode == 'dark',
   [resolvedColorMode])

   const setTheme = useCallback(async (newTheme:ThemeName) => {
      setCurrentTheme(newTheme)
      try {
         await AsyncStorage.setItem(THEME_STORAGE_KEY, newTheme)
      } catch (error) {
         console.error('Error saving theme:', error);
      }
   }, [])

   const handleSetColorMode = useCallback(async (newMode:ColorMode) => {
      setColorMode(newMode);
      if (newMode != 'system') {
         setColorScheme(newMode)
      } else {
         setColorScheme('light')
      }
      try {
         await AsyncStorage.setItem(COLOR_MODE_STORAGE_KEY, newMode)
      } catch (error) {
         console.error('Error saving color mode:', error);
      }
   }, [setColorScheme, colorScheme])

   const toggleColorMode = useCallback(async () => {
      let newMode:ColorMode
      if (colorMode == 'system') {
         newMode = resolvedColorMode === 'light' ? 'dark' : 'light';
      } else {
         newMode = colorMode === 'light' ? 'dark' : 'light';
      }
      handleSetColorMode(newMode)
   },[colorMode,resolvedColorMode, handleSetColorMode])

   const availableThemes = useMemo(() => {
      return Object.entries(themeConfigs).map(([key, config]) => ({
         name: key as ThemeName,
         display: config.name
      }))
   },[])

   const themeVars = useMemo(() => {
      return getThemeVars(currentTheme, colorMode, colorScheme)
   }, [currentTheme, colorMode, colorScheme])

   const value = useMemo(() => ({
      currentTheme,
      colorMode,
      resolvedColorMode,
      isLight,
      isDark,
      setTheme,
      setColorMode: handleSetColorMode,
      toggleColorMode,
      availableThemes,
   }), [currentTheme, colorMode, resolvedColorMode, isLight, isDark, setTheme, handleSetColorMode, toggleColorMode, availableThemes])

   if (!isThemeLoaded) {
      return null
   }

   return (
      <AppThemeContext.Provider value={value}>
         <VariableContextProvider value={themeVars}>
            <View className='flex-1'>{ children }</View>
         </VariableContextProvider>
      </AppThemeContext.Provider>
   )
}

export const useAppTheme = () => {
   const context = useContext(AppThemeContext)
   if (!context) {
      throw new Error('useAppTheme must be used within AppThemeProvider');
   }
   return context;
}

/*
currentTheme -> State:: string: default / test
colorMode -> State: string: light / dark / system
resolvedColorMode -> Memo: the theme that actually displays (ie. if system). string: light / dark
isLight -> Memo: true if RCM is light
isDark -> Memo: true if RCM is dark
setTheme -> Callback: setCurrentTheme > async save theme
handleSetColorMode -> Callback: setColorMode(mode) > setColorScheme(Appearance.setColorScheme(mode | if system = light)) > async save mode
toggleColorMode -> Callback: new color = opposite of colorMode | RCM > handleSetColorMode
availableThemes -> Memo: {name: 'name', display: 'Name' }
*/
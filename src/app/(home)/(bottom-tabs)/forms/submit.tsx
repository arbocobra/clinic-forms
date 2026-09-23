import { useAuth, useClerk, useUser } from '@clerk/expo'
import { ScrollView, StyleSheet, Text, useColorScheme } from 'react-native'
import { VStack } from '@/components/ui/vstack'
import { Center } from '@/components/ui/center'

const Page = () => {
  const colourMode = useColorScheme();
  const colourScheme = {
    dark: {
      primeFore: 'rgb(250, 250, 250)', // more white
      primeBack: 'rgb(38, 38, 38)', // less black
      secondFore: 'rgb(245, 245, 245)', // less white
      secondBack: 'rgb(23, 23, 23)' // more black
    },
    light: {
      primeFore: 'rgb(23, 23, 23)', // more black
      primeBack: 'rgb(245, 245, 245)', // less white
      secondFore: 'rgb(38, 38, 38)', // less black
      secondBack: 'rgb(250, 250, 250)' // more white
    }
  }
  const styles = createStyles(colourScheme[colourMode])

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps='handled'>
      <Center className='flex-1 basis-full'>
        <VStack space='md'>
          <Text style={styles.title}>Forms - Page Two!</Text>
        </VStack>
      </Center>
    </ScrollView>
  )
}

const createStyles = (themeColors:{primeFore:string, primeBack:string, secondFore:string, secondBack:string}) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      paddingTop: 60,
      gap: 16,
      backgroundColor: themeColors.primeBack,
    },
    text: {
      color: themeColors.primeFore,
      fontSize: 16
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: themeColors.primeFore
    },
    button: {
      backgroundColor: themeColors.secondBack,
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 8,
      alignItems: 'center',
    },
    buttonText: {
      color: themeColors.secondFore,
      fontWeight: '600',
    },
    linkText: {
      color: 'blue',
      fontSize: 16
    }
})

export default Page;
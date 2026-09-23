import { useClerk } from '@clerk/expo'
import { Appearance, ScrollView, Text, useColorScheme } from 'react-native'
// import { useColorSch}
import { VStack } from '@/components/ui/vstack'
import { Center } from '@/components/ui/center'
import { Heading } from '@/components/ui/heading'
import { Switch } from '@/components/ui/switch'
import { HStack } from '@/components/ui/hstack'
import { colours, styles } from '@/src/constants/styles'
import { Button, ButtonText } from '@/components/ui/button'
import { useState } from 'react'

export const Page = () => {

  const { signOut } = useClerk()
  const currentScheme = useColorScheme();

  const isDarkMode = currentScheme === 'dark'

  const toggleTheme = () => {
    console.log(currentScheme)
    const nextTheme = isDarkMode ? 'light' : 'dark';
    Appearance.setColorScheme(nextTheme);
  };

  if (!currentScheme) {
    return (
      <ScrollView style={colours.container} keyboardShouldPersistTaps='handled'>
        <Center className={styles.container}>
          <Text style={colours.text}>Loading...</Text>
        </Center>
      </ScrollView>
    )
  }

  return (
    <ScrollView style={colours.container} keyboardShouldPersistTaps='handled'>
      <Center className={styles.container}>
        <VStack space='lg'>
          <Heading size='xl' style={colours.title}>Profile Page</Heading>
          <VStack space='md'>
            <Text className='bold' style={colours.text}>Change Colour Mode</Text>
            <HStack space='md'>
              <Switch value={isDarkMode} onValueChange={toggleTheme} />
              <Text className='capitalize' style={colours.text}>{currentScheme}</Text>
            </HStack>
          </VStack>
          <Button className={styles.button} size='lg' style={colours.buttonTeal} onPress={() => signOut()}>
            <ButtonText className={styles.buttonText} style={colours.buttonTeal}>
              Sign out
            </ButtonText>
          </Button>
        </VStack>
      </Center>
    </ScrollView>
  )
}

export default Page;
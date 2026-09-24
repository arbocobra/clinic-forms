import { useClerk } from '@clerk/expo'
import { Appearance, ScrollView, Text, useColorScheme } from 'react-native'
import { VStack } from '@/components/ui/vstack'
import { Center } from '@/components/ui/center'
import { Heading } from '@/components/ui/heading'
import { Switch } from '@/components/ui/switch'
import { HStack } from '@/components/ui/hstack'
import { styles } from '@/src/constants/styles'
import { Button, ButtonText } from '@/components/ui/button'

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
      <ScrollView keyboardShouldPersistTaps='handled'>
        <Center className={styles.container}>
          <Text>Loading...</Text>
        </Center>
      </ScrollView>
    )
  }

  return (
    <ScrollView keyboardShouldPersistTaps='handled'>
      <Center className={styles.container}>
        <VStack space='lg'>
          <Heading size='xl'>Profile Page</Heading>
          <VStack space='md'>
            <Text className='bold'>Change Colour Mode</Text>
            <HStack space='md'>
              <Switch value={isDarkMode} onValueChange={toggleTheme} />
              <Text className='capitalize'>{currentScheme}</Text>
            </HStack>
          </VStack>
          <Button className={styles.button} size='lg' onPress={() => signOut()}>
            <ButtonText className={styles.buttonText}>
              Sign out
            </ButtonText>
          </Button>
        </VStack>
      </Center>
    </ScrollView>
  )
}

export default Page;
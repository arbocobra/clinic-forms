import { useClerk } from '@clerk/expo'
import { Appearance, ScrollView, StyleSheet, Text, useColorScheme, Pressable } from 'react-native'
import { VStack } from '@/gluestack/vstack'
import { Center } from '@/gluestack/center'
import { Heading } from '@/gluestack/heading'
import { colours, colourMode, styles } from '@/src/constants/styles'
import { Button, ButtonText } from '@/gluestack/button'
import TabWrapper from '@/src/app/(home)/(bottom-tabs)/_layout'

export const Page = () => {
   const { signOut } = useClerk()
  return (
    <ScrollView style={colours.container} keyboardShouldPersistTaps='handled'>
      <Center className={styles.container}>
        <VStack space='lg'>
          <Heading size='xl' style={colours.title}>Profile Page</Heading>
          <Text style={colours.text}>Colour Mode: {colourMode}</Text>
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
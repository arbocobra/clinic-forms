import { ScrollView, Text } from 'react-native'
import { VStack } from '@/components/ui/vstack'
import { Heading } from '@/components/ui/heading'
import { Center } from '@/components/ui/center'
import { styles, colours } from '@/src/constants/styles'
import { Button, ButtonText } from '@/components/ui/button'
import { useClerk } from '@clerk/expo'

const Page = () => {
   const { signOut } = useClerk()
   return (
    <ScrollView style={colours.container} keyboardShouldPersistTaps='handled'>
      <Center className={styles.container}>
        <VStack space='md'>
          <Heading size='xl' style={colours.title}>Oops!</Heading>
          <Text className={styles.text} style={colours.text}>Member role not found</Text>
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
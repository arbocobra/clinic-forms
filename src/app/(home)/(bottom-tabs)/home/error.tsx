import { ScrollView, Text } from 'react-native'
import { VStack } from '@/components/ui/vstack'
import { Heading } from '@/components/ui/heading'
import { Center } from '@/components/ui/center'
import { styles } from '@/src/constants/styles'
import { Button, ButtonText } from '@/components/ui/button'
import { useClerk } from '@clerk/expo'

const Page = () => {
   const { signOut } = useClerk()
   return (
    <ScrollView keyboardShouldPersistTaps='handled'>
      <Center className={styles.container}>
        <VStack space='md'>
          <Heading size='xl'>Oops!</Heading>
          <Text className={styles.text}>Member role not found</Text>
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
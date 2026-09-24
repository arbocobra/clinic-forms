import { useUser } from '@clerk/expo'
import { ScrollView, Text } from 'react-native'
import { VStack } from '@/components/ui/vstack'
import { Heading } from '@/components/ui/heading'
import { Center } from '@/components/ui/center'
import { styles } from '@/src/constants/styles'

const Page = () => {
   const { user } = useUser()
   return (
    <ScrollView keyboardShouldPersistTaps='handled'>
      <Center className={styles.container}>
        <VStack space='md'>
          <Heading size='xl'>Welcome {user?.fullName}!</Heading>
          <Text className={styles.text}>You are an member-level practitioner</Text>
          <Text className={styles.text}>You can read forms</Text>
        </VStack>
      </Center>
    </ScrollView>
   )
}
export default Page;
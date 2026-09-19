import { useUser } from '@clerk/expo'
import { ScrollView, Text } from 'react-native'
import { VStack } from '@/gluestack/vstack'
import { Heading } from '@/gluestack/heading'
import { Center } from '@/gluestack/center'
import { styles, colours } from '@/src/constants/styles'

const Page = () => {
   const { user } = useUser()
   return (
    <ScrollView style={colours.container} keyboardShouldPersistTaps='handled'>
      <Center className={styles.container}>
        <VStack space='md'>
          <Heading size='xl' style={colours.title}>Welcome {user?.fullName}!</Heading>
          <Text className={styles.text} style={colours.text}>You are an member-level practitioner</Text>
          <Text className={styles.text} style={colours.text}>You can read forms</Text>
        </VStack>
      </Center>
    </ScrollView>
   )
}
export default Page;
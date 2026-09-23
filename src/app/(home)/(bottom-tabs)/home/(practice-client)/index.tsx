import { useUser } from '@clerk/expo'
import { ScrollView, Text } from 'react-native'
import { VStack } from '@/components/ui/vstack'
import { Heading } from '@/components/ui/heading'
import { Center } from '@/components/ui/center'
import { styles, colours } from '@/src/constants/styles'

const Page = () => {
   const { user } = useUser()
   return (
    <ScrollView style={colours.container} keyboardShouldPersistTaps='handled'>
      <Center className={styles.container}>
        <VStack space='md'>
          <Heading size='xl' style={colours.title}>Welcome {user?.fullName}!</Heading>
          <Text className={styles.text} style={colours.text}>You are a client user</Text>
          <Text className={styles.text} style={colours.text}>You can submit forms</Text>
        </VStack>
      </Center>
    </ScrollView>
   )
}
export default Page;
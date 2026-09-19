import { useUser } from '@clerk/expo'
import { ScrollView, Text } from 'react-native'
import { VStack } from '@/gluestack/vstack'
import { Heading } from '@/gluestack/heading'
import { Center } from '@/gluestack/center'
import { styles, colours, colourMode } from '@/src/constants/styles'

const Page = () => {
   const { user } = useUser()
   return (
    <ScrollView style={colours.container} keyboardShouldPersistTaps='handled'>
      <Center className={styles.container}>
        <VStack space='md'>
          <Heading size='xl' style={colours.title}>Welcome {user?.fullName}!</Heading>
          <Text className={styles.text} style={colours.text}>You are an admin-level practitioner</Text>
          <Text className={styles.text} style={colours.text}>You can create forms, read forms</Text>
          <Text className={`bold capitalize ${styles.text}`} style={colours.text}>Colour Theme: {colourMode}</Text>
        </VStack>
      </Center>
      {/* <QuestionContainer /> */}
    </ScrollView>
)}
export default Page;
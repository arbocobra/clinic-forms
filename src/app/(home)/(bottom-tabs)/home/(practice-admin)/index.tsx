import { useUser } from '@clerk/expo'
import { ScrollView, Text, useColorScheme, Appearance, View } from 'react-native'
import { VStack } from '@/components/ui/vstack'
import { Heading } from '@/components/ui/heading'
import { Center } from '@/components/ui/center'
import { Button, ButtonText } from '@/components/ui/button'
import { styles } from '@/src/constants/styles'

const Page = () => {

  const toggleTheme = () => {
    console.log('boop')
  }

   const { user } = useUser()
   return (
    <ScrollView keyboardShouldPersistTaps='handled'>
      <Center className={styles.container}>
        <VStack space='md'>
          <Heading size='xl'>Welcome {user?.fullName}!</Heading>
          <Text className={styles.text}>You are an admin-level practitioner</Text>
          <Text className={styles.text}>You can create forms, read forms</Text>
          <View className='bg-primary p-5 h-40 w-40 border'><Text className='text-primary-foreground bold'>Primary</Text></View>
          <View className='bg-secondary p-5 h-40 w-40 border'><Text className='text-secondary-foreground bold'>Secondary</Text></View>
          <View className='bg-lime-500 p-5 h-40 w-40 border'><Text className='text-purple-800 bold'>Custom</Text></View>
          <Button size='lg' onPress={toggleTheme}>
            <ButtonText>Toggle Colour Scheme</ButtonText>
          </Button>
        </VStack>
      </Center>
      {/* <QuestionContainer /> */}
    </ScrollView>
)}
export default Page;
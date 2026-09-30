import { useUser } from '@clerk/expo'
import { View } from 'react-native'
import { Heading } from '@/components/ui/heading'
import { Button, ButtonText } from '@/components/ui/button'
import { Text } from '@/components/custom/text'
import { Container } from '@/components/custom/wrapper'
import { useAppTheme } from '@/src/contexts/app-theme-context'

const Page = () => {

  const { toggleColorMode } = useAppTheme()

   const { user } = useUser()
   return (
    <Container>
      <Heading size='xl'>Welcome {user?.fullName}!</Heading>
      <Text>You are an admin-level practitioner</Text>
      <Text>You can create forms, read forms</Text>
      <View className='bg-primary p-5 h-40 w-40 border'><Text className='text-primary-foreground bold'>Primary</Text></View>
      <View className='bg-secondary p-5 h-40 w-40 border'><Text className='text-secondary-foreground bold'>Secondary</Text></View>
      <View className='bg-lime-500 p-5 h-40 w-40 border'><Text className='text-purple-800 bold'>Custom</Text></View>
      <Button size='lg' onPress={toggleColorMode}>
        <ButtonText>Toggle Colour Scheme</ButtonText>
      </Button>
    {/* <QuestionContainer /> */}
    </Container>
)}
export default Page;
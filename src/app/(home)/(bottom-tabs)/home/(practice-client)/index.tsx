import { useUser } from '@clerk/expo'
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
      <Text>You are a client user</Text>
      <Text>You can submit forms</Text>

      <Button size='lg' onPress={toggleColorMode}>
        <ButtonText>Toggle Colour Scheme</ButtonText>
      </Button>
    </Container>
)}

export default Page;
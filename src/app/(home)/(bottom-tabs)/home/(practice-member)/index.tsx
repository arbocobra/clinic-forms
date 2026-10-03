import { useUser } from '@clerk/expo'
import { Heading } from '@/components/ui/heading'
import { Button, ButtonText } from '@/components/ui/button'
import { Text } from '@components/text'
import { Container } from '@components/wrappers'
import { useAppTheme } from '@/src/contexts/app-theme-context'

const Page = () => {

  const { toggleColorMode } = useAppTheme()

   const { user } = useUser()
   return (
    <Container>
      <Heading size='xl'>Welcome {user?.fullName}!</Heading>
      <Text>You are an member-level practitioner</Text>
      <Text>You can read forms</Text>

      <Button size='lg' onPress={toggleColorMode}>
        <ButtonText>Toggle Colour Scheme</ButtonText>
      </Button>
    </Container>
)}
export default Page;
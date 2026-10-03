import { useColorScheme } from 'react-native'
import { Heading } from '@/components/ui/heading'
import { Container } from '@components/wrappers'
import { Text } from '@components/text'

export const PageTwo = ({ userType }: { userType: string }) => {
  const colourMode = useColorScheme();

  return (
    <Container>
      <Heading size='xl'>{userType} - Page Two!</Heading>
      <Text>Colour Theme: <Text className='font-bold'>{colourMode}</Text></Text>
    </Container>
  )
}

export default PageTwo;
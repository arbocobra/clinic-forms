import { useClerk } from '@clerk/expo'
import { VStack } from '@ui/vstack'
import { Heading } from '@ui/heading'
import { Switch } from '@ui/switch'
import { HStack } from '@ui/hstack'
import { Button, ButtonText } from '@ui/button'
import { useAppTheme } from '@/contexts/app-theme-context'
import { Container } from '@components/wrappers'
import { Text } from '@components/text'
import { useUserRoles } from '@/hooks/useUserRoles'

export const Page = () => {

  const { signOut } = useClerk()
  const { resolvedColorMode, toggleColorMode } = useAppTheme()

  const isDarkMode = resolvedColorMode === 'dark'
  const { roleTest, segments } = useUserRoles()

  return (
    <Container>
      <Heading size='xl'>Profile Page</Heading>
      <VStack space='md'>
        <Text className='bold'>Change Colour Mode</Text>
        <Text>{roleTest}</Text>
        <Text>{segments.map(s => s)}</Text>
        <HStack space='md' className='items-center'>
          <Switch value={isDarkMode} onValueChange={toggleColorMode} />
          <Text className='capitalize text-secondary-foreground'>{resolvedColorMode}</Text>
        </HStack>
      </VStack>
      <Button className='mt-3' size='lg' onPress={() => signOut()}>
        <ButtonText className='font-medium text-md text-primary-foreground'>
          Sign out
        </ButtonText>
      </Button>
    </Container>
  )
}

export default Page;
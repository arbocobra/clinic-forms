import { useClerk } from '@clerk/expo'
import { VStack } from '@/components/ui/vstack'
import { Heading } from '@/components/ui/heading'
import { Switch } from '@/components/ui/switch'
import { HStack } from '@/components/ui/hstack'
import { Button, ButtonText } from '@/components/ui/button'
import { useAppTheme } from '@/src/contexts/app-theme-context'
import { Container } from '@/components/custom/wrapper'
import { Text } from '@/components/custom/text'
import { useUserRoles } from '@/src/hooks/useUserRoles'

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
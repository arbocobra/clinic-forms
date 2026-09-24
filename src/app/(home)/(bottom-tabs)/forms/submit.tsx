import { useAuth, useClerk, useUser } from '@clerk/expo'
import { ScrollView, StyleSheet, Text, useColorScheme } from 'react-native'
import { VStack } from '@/components/ui/vstack'
import { Center } from '@/components/ui/center'

const Page = () => {

  return (
    <ScrollView keyboardShouldPersistTaps='handled'>
      <Center className='flex-1 basis-full'>
        <VStack space='md'>
          <Text>Forms - Page Two!</Text>
        </VStack>
      </Center>
    </ScrollView>
  )
}

export default Page;
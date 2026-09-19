import { ScrollView, Text, useColorScheme } from 'react-native'
import { VStack } from '@/gluestack/vstack'
import { Center } from '@/gluestack/center'
import { Heading } from '@/gluestack/heading'
import { colours } from '@/src/constants/styles'
import Container from '@/src/components/forms/Container'

export const Page = () => {
  const colourMode = useColorScheme();

  return (
    <ScrollView style={colours.container} keyboardShouldPersistTaps='handled'>
      <Center className='flex-1 basis-full'>
        <VStack space='md'>
          <Heading size='xl' style={colours.title}>Profile Page</Heading>
          <Text style={colours.title}>Home - Page Two!</Text>
          <Text style={colours.text}>Colour Mode: {colourMode}</Text>
        </VStack>
      </Center>
    </ScrollView>
    // <VStack space='md'>
    //       <Heading size='xl' style={colours.title}>Profile Page</Heading>
    //       <Text style={colours.title}>Home - Page Two!</Text>
    //       <Text style={colours.text}>Colour Mode: {colourMode}</Text>
    //     </VStack>
  )
}

export default Page;
import { ScrollView, Text, useColorScheme } from 'react-native'
import { VStack } from '@/gluestack/vstack'
import { Center } from '@/gluestack/center'
import { Heading } from '@/gluestack/heading'
import { colours, styles } from '@/src/constants/styles'

export const PageTwo = ({userType}:{userType:string}) => {
  const colourMode = useColorScheme();

  return (
    <ScrollView style={colours.container} keyboardShouldPersistTaps='handled'>
      <Center className={styles.container}>
        <VStack space='md'>
          <Heading size='xl' style={colours.title}>{userType} - Page Two!</Heading>
          <Text className={`bold capitalize ${styles.text}`} style={colours.text}>Colour Theme: {colourMode}</Text>
        </VStack>
      </Center>
    </ScrollView>
  )
}

export default PageTwo;
import { ScrollView, Text, useColorScheme } from 'react-native'
import { VStack } from '@/components/ui/vstack'
import { Center } from '@/components/ui/center'
import { Heading } from '@/components/ui/heading'
import { styles } from '@/src/constants/styles'

export const PageTwo = ({userType}:{userType:string}) => {
  const colourMode = useColorScheme();
  
  return (
    <ScrollView keyboardShouldPersistTaps='handled'>
      <Center className={styles.container}>
        <VStack className='bg-pink-200 dark:bg-blue-800' space='md'>
          <Heading size='xl'>{userType} - Page Two!</Heading>
          <Text className={`bold capitalize ${styles.text}`}>Colour Theme: {colourMode}</Text>
        </VStack>
      </Center>
    </ScrollView>
  )
}

export default PageTwo;
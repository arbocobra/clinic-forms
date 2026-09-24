import { View } from 'react-native'
import { Heading } from '@/components/ui/heading'

const SplashScreen = () => {
   return (
      <View className='bg-red-500 flex-1'>
         <Heading className='text-white' size='2xl'>Splash Screen</Heading>
      </View>
   )
}

export default SplashScreen;
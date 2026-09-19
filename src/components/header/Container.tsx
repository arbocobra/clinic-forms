import { HStack } from '@/gluestack/hstack'
import { Button, ButtonText, ButtonIcon } from '@/gluestack/button'
import { Icon } from '@/gluestack/icon';
import { Heading } from '@/gluestack/heading'
import { Pressable } from '@/gluestack/pressable'
import { Menu, House } from 'lucide-react-native';
import { View } from 'react-native'

const Container = () => {
   <HStack>
      <Pressable className='border border-amber-500'>
         <Icon size='lg' as={House} />
         <Heading>Home</Heading>
      </Pressable>
      <View className='flex-1 border border-red-500'>
         <Heading></Heading>
      </View>
      <View className='border border-purple-600'>
         <Button size='lg' className='p-3.5 rounded-full'>
            <ButtonIcon as={Menu} />
         </Button>
      </View>
   </HStack>
}
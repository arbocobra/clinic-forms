import { Heading } from '@ui/heading'
import { Center } from '@ui/center'

export const SplashScreen = () => {
   return (
      <Center className='bg-[#00b6c7] dark:bg-[#ffba00] flex-1'>
         <Heading className='text-[#fafafa] dark:text-[#0a0a0a]' size='4xl'>Our Practice</Heading>
         <Heading className='text-[#fafafa] dark:text-[#0a0a0a]' size='2xl'>Clinic Form Manager</Heading>
      </Center>
   )
}
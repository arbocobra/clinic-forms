import { ScrollView, StyleSheet, type ScrollViewProps } from 'react-native';
import { VStack } from '@/components/ui/vstack'

interface ContainerProps extends ScrollViewProps {
  children: React.ReactNode;
}

export const Container = ({children, ...props}:ContainerProps) => {
   
   return (
      <ScrollView keyboardShouldPersistTaps='handled' 
         style={{flex:1}} 
         contentContainerStyle={{flexGrow: 1}} 
         className='bg-background pt-8 pr-5 pb-5 pl-5'
         {...props}
      >
         <VStack space='lg' className='items-start w-full'>
         { children }
         </VStack>
      </ScrollView>
   )
}
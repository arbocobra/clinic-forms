import { View } from 'react-native'
import { HStack } from '@ui/hstack'
import { Heading } from '@ui/heading'
import { Stack, useRouter } from 'expo-router';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import type { DefaultValues } from 'react-hook-form';
import type { Form } from '@/types';
import {FormControl, FormControlError, FormControlErrorIcon, FormControlErrorText, FormControlLabel, FormControlLabelText} from '@ui/form-control'
import { Input, InputField } from '@ui/input'
import { CircleAlert } from 'lucide-react-native';
import { IconButton } from '@components/buttons'
import { Container } from '@components/wrappers'
import { MoveLeft } from 'lucide-react-native';


const formDefault:DefaultValues<Form> = { id:'', title: '', description:'', questions:[], date: new Date(), authorIds:[]}
const Page = () => {
  const { handleSubmit, control } = useForm<Form>({defaultValues: formDefault})
  const {fields, append, remove, replace} = useFieldArray<Form, 'questions'>({control, name:'questions', rules: { minLength: 1 }})
   const router = useRouter();
  return (
   <>
      <Stack.Screen options={{ title:'New Form', headerBackVisible: true, headerShown: true, header: () => (
         <Header backRoute={ () => router.replace('/forms/write') } />
      )}} />
      <Container>
         <NameForm control={control} />
      </Container>
   </>
  )
}

const Header = ({backRoute}) => (
   <HStack className='bg-card'>
      <View className='basis-1/4 grow-0 shrink-0 justify-center items-center'>
         <IconButton className='' onPress={backRoute} variant='link' size='lg' icon={MoveLeft} />
      </View>
      <View className='basis-1/2 grow-0 shrink-0 p-2 justify-center items-center'>
         <Heading className='' size='sm'>New Form</Heading>
      </View>
   </HStack>
)

const NameForm = ({control}) => {
  return (
      <Controller
         name='label'
         control={control}
         rules={{ required: 'Question text required', minLength: {value: 3, message: 'Must be more than 3 characters'}}}
         render={({ field: { onChange, value }, fieldState: { error } }) => (
            <FormControl isRequired isInvalid={!!error}>
               <FormControlLabel>
                  <FormControlLabelText className=''>Form Title</FormControlLabelText>
               </FormControlLabel>
               <Input className='bg-white'>
                  <InputField placeholder='Title...' value={value} onChangeText={onChange} />
               </Input>
               <Error error={error} />
            </FormControl>
         )}
      />
   )
}
const Error = ({error}) => {
   return (
      <FormControlError>
         <FormControlErrorIcon as={CircleAlert} /> 
         <FormControlErrorText>{error?.message}</FormControlErrorText>
      </FormControlError>
   )
}
export default Page;
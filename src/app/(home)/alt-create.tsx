import { ScrollView } from 'react-native'
import { VStack } from '@/components/ui/vstack'
import { Stack } from 'expo-router';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import type { DefaultValues } from 'react-hook-form';
import type { Form } from '@/src/types';
import {FormControl, FormControlError, FormControlErrorIcon, FormControlErrorText, FormControlLabel, FormControlLabelText} from '@/components/ui/form-control'
import { Input, InputField } from '@/components/ui/input'
import { CircleAlert } from 'lucide-react-native';


const formDefault:DefaultValues<Form> = { id:'', title: '', description:'', questions:[], date: new Date(), authorId:''}
const Page = () => {
  const { handleSubmit, control } = useForm<Form>({defaultValues: formDefault})
  const {fields, append, remove, replace} = useFieldArray<Form, 'questions'>({control, name:'questions', rules: { minLength: 1 }})

  return (
    <ScrollView keyboardShouldPersistTaps='handled'>
      <Stack.Screen options={{ title:'New Form', headerBackVisible: true, headerShown: true, headerBackTitle:'Back' }} />
      <VStack space='lg' className='pt-10 pb-0 pl-5 pr-5'>
        <NameForm control={control} />
      </VStack>
    </ScrollView>
  )
}

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
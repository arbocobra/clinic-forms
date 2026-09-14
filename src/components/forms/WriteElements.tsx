// import WriteOption from '@/components/forms/WriteOption';
import { Button, ButtonText, Card, Checkbox, CheckboxIcon, CheckboxIndicator, CheckboxLabel, FormControl, FormControlError, FormControlErrorIcon, FormControlErrorText, FormControlLabel, FormControlLabelText, HStack, Icon, Input, InputField, Textarea, TextareaInput } from '@/gluestack/index';
import { Check, CircleAlert, CirclePlus } from 'lucide-react-native';
import { Controller } from 'react-hook-form';
import { Pressable, Text } from 'react-native';

export const QuestionTextInput = ({control, handleQuestionChange, error}) => {
   return (
      <FormControl isRequired={true} isInvalid={!!error}>
         <FormControlLabel>
            <FormControlLabelText>Enter question text</FormControlLabelText>
         </FormControlLabel>
         <Controller
            name='label'
            control={control}
            rules={{ required: 'Question text required', }}
            render={({ field: { onChange, value } }) => (
               <Input className='bg-white'>
                  <InputField placeholder='Question...' value={value} onChangeText={(text) => {
                     handleQuestionChange(text, 'label')
                     onChange(text)
                  }} />
               </Input>
            )}
         />
         { error && <Error message={error.message} /> }
      </FormControl>
   )
}

export const AddDescriptionCheckbox = ({control, setDisplayDescription}) => {
   return (
      <Controller 
         name='showDesc'
         control={control}
         render={({ field: { onChange, value } }) => (
            <Checkbox className='' 
               isChecked={value} 
               value='show-description' 
               onChange={(checked) => {
                  setDisplayDescription(checked)
                  onChange(checked)
               }}>
               <CheckboxIndicator>
                  <CheckboxIcon as={Check} />
               </CheckboxIndicator>
               <CheckboxLabel>Add description text</CheckboxLabel>
            </Checkbox>
         )}
      />
   )
}

export const IsRequiredCheckbox = ({control, handleQuestionChange}) => {
   return (
      <Controller 
         name='required'
         control={control}
         render={({ field: { onChange, value } }) => (
            <Checkbox className='' 
               isChecked={value} 
               value='is-required' 
               onChange={(checked) => {
                  handleQuestionChange(checked, 'required')
                  onChange(checked)
               }}>
               <CheckboxIndicator>
                  <CheckboxIcon as={Check} />
               </CheckboxIndicator>
               <CheckboxLabel>Required Question</CheckboxLabel>
            </Checkbox>
         )}
      />
   )
}

export const DescriptionTextInput = ({control, handleQuestionChange, error}) => {
   return (
      <FormControl isRequired={true} isInvalid={!!error}>
         <Controller 
            name='description'
            control={control}
            rules={{ required: 'Description text required', }}
            render={({ field: { onChange, value } }) => (
               <Textarea className='bg-white'>
                  <TextareaInput placeholder='Add description...' value={value} onChangeText={(text) => {
                     handleQuestionChange(text, 'description')
                     onChange(text)
                  }} />
               </Textarea>
            )}
         /> 
         { error && <Error message={error.message} /> }
      </FormControl>
   )
}

export const SubmitOrCancelButtons = ({handleSubmit, submit, cancel}) => {
   return (
      <HStack space='lg'>
         <Button size='sm' onPress={handleSubmit(submit)}>
            <ButtonText>Submit</ButtonText>
         </Button>
         <Button size='sm' onPress={cancel}>
            <ButtonText>Cancel</ButtonText>
         </Button>
      </HStack>
   )
}

export const Error = ({message}) => {
   return (
      <FormControlError>
         <FormControlErrorIcon as={CircleAlert} /> 
         <FormControlErrorText>{message}</FormControlErrorText>
      </FormControlError>
   )
}


export const AddOptionRow = ({setDisplayOptionInput}) => {
   return (
      <Pressable onPress={() => setDisplayOptionInput(true)}>
         <HStack space='lg' className='pt-4 pb-4'>
            <Icon as={CirclePlus} />
            <Text>Add answer option</Text>
         </HStack>
      </Pressable>
   )
}

export const OptionTextInput = ({current, control, appendOption, setDisplayOptionInput, error}) => {
   
   return (
      <Card>
         <FormControl isRequired={true} isInvalid={!!error}>
         <FormControlLabel>
            <FormControlLabelText>Enter option</FormControlLabelText>
         </FormControlLabel>
         <Controller
            name='options[0].label'
            control={control}
            rules={{ required: 'Option text required',}}
            render={({ field: { value, onChange } }) => (
               <Input className='bg-white'>
                  <InputField placeholder='Option...' value={value} onChangeText={onChange} />
               </Input>
            )}
         />
         { error && <Error message={error.message} /> }
      </FormControl>
         {/* <SubmitOrCancelButtons handleSubmit={handleSubmit} submit={appendOption} cancel={() => setDisplayOptionInput(false)} /> */}
      </Card>
   )
}
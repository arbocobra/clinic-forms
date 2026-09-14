import { HStack, VStack } from '@/gluestack/index';
import { AddDescriptionCheckbox, DescriptionTextInput, IsRequiredCheckbox, QuestionTextInput, SubmitOrCancelButtons } from '@/src/components/forms/WriteElements';
import WriteOption from '@/src/components/forms/WriteOption';
import type { QuestionFormInput } from '@/src/types';
import { useEffect, useState } from 'react';
import { useFieldArray, useForm, type DefaultValues } from 'react-hook-form';

const WriteQuestion = ({setIsSelecting, selection, handleQuestionChange, onSubmit}) => {
   const formDefault:DefaultValues<QuestionFormInput> = selection?.id < 3 ? { label: '', showDesc: false, required: true, description: '' } : { label: '', showDesc: false, required: true, description: '', options: [] }

   const [displayDescription, setDisplayDescription] = useState(false)
   const { handleSubmit, control, resetField, reset, getValues, watch, formState: { errors } } = useForm({ defaultValues: formDefault });
   const {fields, append, remove, replace} = useFieldArray({control, name:'options', rules: { minLength: 2 }})
   // const options = watch('options')

   // const appendOption = (op:Option) => append(op)
  
  useEffect(() => { 
      if (!displayDescription) {
         resetField('description')
         handleQuestionChange('', 'description') 
      }
   }, [displayDescription])
   
   useEffect(() => {
      if (!selection) { reset() }
   }, [selection])

   // useEffect(() => {
   //    console.log(opWatch)
   // }, [opWatch])
   
   return (
      <VStack space='md'>
         <QuestionTextInput control={control} handleQuestionChange={handleQuestionChange} error={errors?.label} />
         <HStack space='lg'>
            <AddDescriptionCheckbox control={control} setDisplayDescription={setDisplayDescription} />
            <IsRequiredCheckbox control={control} handleQuestionChange={handleQuestionChange} />
         </HStack>
         { displayDescription && <DescriptionTextInput control={control} handleQuestionChange={handleQuestionChange} error={errors?.description} /> }
         { selection.id > 2 && <WriteOption current={getValues('options')} fields={fields} selection={selection} append={append} />}
         {/* { selection.id > 2 && (
            <VStack space='md'>
               { displayOptionInput ? <OptionTextInput current={getValues('options')} appendOption={appendOption} setDisplayOptionInput={setDisplayOptionInput} control={control} error={errors?.label} />
               : <AddOptionRow setDisplayOptionInput={setDisplayOptionInput} /> }
            </VStack>
         )} */}
         <SubmitOrCancelButtons handleSubmit={handleSubmit} submit={onSubmit} cancel={() => setIsSelecting(true)} />
      </VStack>
   )
}

// const QuestionTextInput = ({control, handleQuestionChange, error}) => {
//    return (
//       <FormControl isRequired={true} isInvalid={!!error}>
//          <FormControlLabel>
//             <FormControlLabelText>Enter question text</FormControlLabelText>
//          </FormControlLabel>
//          <Controller
//             name='label'
//             control={control}
//             rules={{ required: 'Question text required', }}
//             render={({ field: { onChange, value } }) => (
//                <Input className=''>
//                   <InputField className='bg-white' placeholder='Question...' value={value} onChangeText={(text) => {
//                      handleQuestionChange(text, 'label')
//                      onChange(text)
//                   }} />
//                </Input>
//          )}
//          />
//          { error && <Error message={error.message} /> }
//       </FormControl>
//    )
// }

// const AddDescriptionCheckbox = ({control, setDisplayDescription}) => {
//    return (
//       <Controller 
//          name='showDesc'
//          control={control}
//          render={({ field: { onChange, value } }) => (
//             <Checkbox className='' 
//                isChecked={value} 
//                value='show-description' 
//                onChange={(checked) => {
//                   setDisplayDescription(checked)
//                   onChange(checked)
//                }}>
//                <CheckboxIndicator>
//                   <CheckboxIcon as={Check} />
//                </CheckboxIndicator>
//                <CheckboxLabel>Add description text</CheckboxLabel>
//             </Checkbox>
//          )}
//       />
//    )
// }

// const IsRequiredCheckbox = ({control, handleQuestionChange}) => {
//    return (
//       <Controller 
//          name='required'
//          control={control}
//          render={({ field: { onChange, value } }) => (
//             <Checkbox className='' 
//                isChecked={value} 
//                value='is-required' 
//                onChange={(checked) => {
//                   handleQuestionChange(checked, 'required')
//                   onChange(checked)
//                }}>
//                <CheckboxIndicator>
//                   <CheckboxIcon as={Check} />
//                </CheckboxIndicator>
//                <CheckboxLabel>Required Question</CheckboxLabel>
//             </Checkbox>
//          )}
//       />
//    )
// }

// const DescriptionTextInput = ({control, handleQuestionChange, error}) => {
//    return (
//       <FormControl isRequired={true} isInvalid={!!error}>
//          <Controller 
//             name='description'
//             control={control}
//             rules={{ required: 'Description text required', }}
//             render={({ field: { onChange, value } }) => (
//                <Textarea size='md'>
//                   <TextareaInput className='bg-white' placeholder='Add description...' value={value} onChangeText={(text) => {
//                      handleQuestionChange(text, 'description')
//                      onChange(text)
//                   }} />
//                </Textarea>
//             )}
//          /> 
//          { error && <Error message={error.message} /> }
//       </FormControl>
//    )
// }

// export const SubmitOrCancelButtons = ({handleSubmit, submit, cancel}) => {
//    return (
//       <HStack space='lg'>
//          <Button size='sm' onPress={handleSubmit(submit)}>
//             <ButtonText>Submit</ButtonText>
//          </Button>
//          <Button size='sm' onPress={cancel}>
//             <ButtonText>Cancel</ButtonText>
//          </Button>
//       </HStack>
//    )
// }

// export const Error = ({message}) => {
//    return (
//       <FormControlError>
//          <FormControlErrorIcon as={CircleAlert} /> 
//          <FormControlErrorText>{message}</FormControlErrorText>
//       </FormControlError>
//    )
// }

// const WriteOption = ({selection}) => {
//    const formDefault:DefaultValues<{ label:string }> = { label: '' }
//    const [displayOptionInput, setDisplayOptionInput] = useState(false)
//    const { handleSubmit, control, formState: { errors } } = useForm({ defaultValues: formDefault });

//    const submitTest = () => {
//       console.log('test')
//    }

//    return (
//       <VStack space='md'>
//          <Pressable onPress={() => setDisplayOptionInput(true)}>
//          <HStack space='lg' className='pt-4 pb-4'>
//             <Icon as={CirclePlus} />
//             <Text>Add answer option</Text>
//          </HStack>
//       </Pressable>
//       {/* { displayOptionInput && <SubmitOrCancelButtons handleSubmit={handleSubmit} submit={submitTest} cancel={() => setDisplayOptionInput(false)} /> } */}
//          { displayOptionInput && <OptionTextInput handleSubmit={handleSubmit} submitTest={submitTest} setDisplayOptionInput={setDisplayOptionInput} />}
//          {/* <AddOptionRow setDisplayOptionInput={setDisplayOptionInput} /> */}
//       </VStack>
//    )
// }


// const AddOptionRow = ({setDisplayOptionInput}) => {
//    return (
//       <Pressable onPress={setDisplayOptionInput(true)}>
//          <HStack space='lg' className='pt-4 pb-4'>
//             <Icon as={CirclePlus} />
//             <Text>Add answer option</Text>
//          </HStack>
//       </Pressable>
//    )
// }

// const OptionTextInput = ({handleSubmit, submitTest, setDisplayOptionInput}) => {

//    return (
//       <>
//          <Text>Hello</Text>
//          <SubmitOrCancelButtons handleSubmit={handleSubmit} submit={submitTest} cancel={() => setDisplayOptionInput(false)} />
//       </>
//    )
// }

export default WriteQuestion;
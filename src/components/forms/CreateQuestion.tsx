// import WriteOption from '@/src/components/forms/WriteOption';
import type { QuestionFormInput, OptionFormInput, QuestionBase, Option } from '@/src/types';
import { useEffect, useState, Dispatch, SetStateAction } from 'react';
import { Controller, useFieldArray, useForm, useFormContext, FormProvider } from 'react-hook-form';
import type { DefaultValues, SubmitHandler, FieldArrayWithId, UseFieldArrayAppend, FieldValues, Field } from 'react-hook-form';
import { Button, ButtonText, ButtonIcon } from '@/components/ui/button'
import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack'; 
import {FormControl, FormControlError, FormControlErrorIcon, FormControlErrorText, FormControlLabel, FormControlLabelText} from '@/components/ui/form-control'
import { Input, InputField } from '@/components/ui/input'
import { Checkbox, CheckboxIcon, CheckboxIndicator, CheckboxLabel } from '@/components/ui/checkbox'
import { Textarea, TextareaInput } from '@/components/ui/textarea'
import { Icon } from '@/components/ui/icon';
import { Card } from '@/components/ui/card';
import { Check, CircleAlert, CirclePlus, SquarePen, Trash } from 'lucide-react-native';
import { Pressable, Text, View, KeyboardAvoidingView } from 'react-native';

type CreateQuestionsProps = { setIsSelecting: Dispatch<SetStateAction<boolean>>, selection:QuestionBase, onSubmit: (i:QuestionFormInput) => void, openPreview:(i:QuestionFormInput) => void, resetQuestion: () => void }
type WriteOptionProps = { fields:FieldArrayWithId<QuestionFormInput, 'options'>[], inputType:string, append:(obj:Option) => void, remove:(index:number)=>void, replace:(obj:Option) => void }
type DisplayOptionsRowProps = Pick<WriteOptionProps, 'fields' | 'remove'> & { updateIsEdit: (i:number) => void }
type OptionTextInputProps = {field:null | FieldArrayWithId<QuestionFormInput, 'options', 'id'> }

const formDefault:DefaultValues<QuestionFormInput> = { label: '', showDesc: false, required: true, description: '', options: [] }
const optionFormDefault:DefaultValues<OptionFormInput> = { label: '' }

const CreateQuestions = ({ setIsSelecting, selection, onSubmit, openPreview, resetQuestion }:CreateQuestionsProps) => {

   const methodsOne = useForm<QuestionFormInput>({ mode: 'onChange', defaultValues: formDefault });
   const methodsTwo = useForm<OptionFormInput>({ mode: 'onChange', defaultValues: optionFormDefault });
   const {fields, append, remove, replace} = useFieldArray<QuestionFormInput, 'options'>({control:methodsOne.control, name:'options', rules: { minLength: 2 }})
   // 5
   const reset = () => { 
      // console.log('reset forms')
      methodsOne.reset();
      methodsTwo.reset();
      resetQuestion();
      setIsSelecting(true)
   }

   const cancel = () => {
      // console.log('cancel ')
      reset();
   }
   const preview = () => { 
      // console.log('preview ')
      const data:QuestionFormInput = methodsOne.getValues();
      openPreview(data);
   }

   const form = methodsOne.watch()

   useEffect(() => {
      if (methodsOne.formState.isSubmitSuccessful) {
         reset()
      }
   }, [methodsOne.formState.isSubmitSuccessful])

   return (
      <View>
         <KeyboardAvoidingView behavior='padding'>
            <VStack space='md'>
               <FormProvider {...methodsOne}>
                  <WriteQuestion />
               </FormProvider>
               <FormProvider {...methodsTwo}>
                  { selection.id > 2 && 
                     <WriteOption fields={fields} inputType={selection.inputType} append={append} remove={remove} replace={replace} />
                  }
               </FormProvider>
               <SubmitOrCancelButtons handleSubmit={methodsOne.handleSubmit} submit={onSubmit} cancel={cancel} preview={preview} />
            </VStack>
         </KeyboardAvoidingView>
         <View className='mt-4'><Text>{JSON.stringify(form, null, 2)}</Text></View>
      </View>
   )
}

const WriteQuestion = () => {
   const { resetField } = useFormContext()
   const [displayDescription, setDisplayDescription] = useState(false)
   
   const updateDisplayDescription = (val:boolean) => {
      setDisplayDescription(() => {
         if (!val) { resetField('description') }
         return val
      })
   }

   return (
      <VStack space='md'>
         <QuestionTextInput />
         <HStack space='lg'>
            <AddDescriptionCheckbox update={updateDisplayDescription} />
            <IsRequiredCheckbox />
         </HStack>
         { displayDescription && <DescriptionTextInput /> }
      </VStack>
   )
}

const WriteOption = ({fields, inputType, append, remove, replace}:WriteOptionProps) => {
   const { handleSubmit, reset, formState: { isSubmitSuccessful } } = useFormContext()
   const [displayOptionInput, setDisplayOptionInput] = useState(false)
   const [isEdit, setIsEdit] = useState<number | null>(null)

   const resetOption = () => {
      console.log('resetOption')
      reset(optionFormDefault);
      setDisplayOptionInput(false)
   }
   const onSubmit = (data:OptionFormInput) => {
      // console.log('onSubmit ', data)
      const output:Partial<Option> = { index: fields.length, label: data.label };
      output.value = inputType === 'number' ? Number.parseInt(data.label) : data.label.toLowerCase();
      append(output as Option)
   }
   const cancel = () => { resetOption() }
   
   const updateDisplayOptionInput = () => {
      setDisplayOptionInput(true)
   }

   const updateIsEdit = (i:number) => { 
      console.log(fields[i])
      setIsEdit(() => {
         setDisplayOptionInput(true)
         return i
      })
   }

   // useEffect(() => {
   //    console.log('setDisplayOptionInput ', displayOptionInput)
   // }, [displayOptionInput])

   useEffect(() => {
      console.log('fields ', fields)
   }, [fields])

   useEffect(() => {
      console.log('isSubmitSuccessful ', isSubmitSuccessful)
      if (isSubmitSuccessful) { resetOption() }
   }, [isSubmitSuccessful])

   return (
      <Card>
         { displayOptionInput ? (
            <VStack space='lg'>
               <OptionTextInput field={typeof isEdit == 'number' ? fields[isEdit] : null} />
               <SubmitOrCancelButtons handleSubmit={handleSubmit} submit={onSubmit} cancel={cancel} preview={null} />
            </VStack>
         ) : (
            <VStack>
               <AddOptionRow updateDisplayOptionInput={updateDisplayOptionInput} />
               <DisplayOptionsRow fields={fields} remove={remove} updateIsEdit={updateIsEdit} />
            </VStack>
         ) }
      </Card>
   )
}

const QuestionTextInput = () => {
   const { control } = useFormContext()
   return (
      <Controller
         name='label'
         control={control}
         rules={{ required: 'Question text required', minLength: {value: 3, message: 'Must be more than 3 characters'}}}
         render={({ field: { onChange, value }, fieldState: { error } }) => (
            <FormControl isRequired isInvalid={!!error}>
               <FormControlLabel>
                  <FormControlLabelText>Enter question text</FormControlLabelText>
               </FormControlLabel>
               <Input className='bg-white'>
                  <InputField placeholder='Question...' value={value} onChangeText={onChange} />
               </Input>
               <Error error={error} />
            </FormControl>
         )}
      />
   )
}
const AddDescriptionCheckbox = ({update}) => {
   const { control } = useFormContext()
   const indicator = "border-primary bg-white w-6 h-6"
   return (
      <Controller 
         name='showDesc'
         control={control}
         render={({ field: { onChange, value } }) => (
            <Checkbox isChecked={value} value='show-description' 
               onChange={(checked) => {
                  update(checked)
                  onChange(checked)
               }}>
               <CheckboxIndicator className={indicator}>
                  <CheckboxIcon as={Check} />
               </CheckboxIndicator>
               <CheckboxLabel>Add description text</CheckboxLabel>
            </Checkbox>
         )}
      />
   )
}
const IsRequiredCheckbox = () => {
   const { control } = useFormContext()
   const indicator = "border-primary bg-white w-6 h-6"
   return (
      <Controller 
         name='required'
         control={control}
         render={({ field: { onChange, value } }) => (
            <Checkbox isChecked={value} value='is-required' onChange={onChange}>
               <CheckboxIndicator className={indicator}>
                  <CheckboxIcon as={Check} />
               </CheckboxIndicator>
               <CheckboxLabel>Required Question</CheckboxLabel>
            </Checkbox>
         )}
      />
   )
}
const DescriptionTextInput = () => {
   const { control } = useFormContext()
   return (
      <Controller
         name='description'
         control={control}
         rules={{ required: 'Description text required'}}
         render={({ field: { onChange, value }, fieldState: { error } }) => (
            <FormControl isRequired isInvalid={!!error}>
               <Textarea className='bg-white'>
                  <TextareaInput placeholder='Add description...' value={value} onChangeText={onChange} />
               </Textarea>
               {/* { error && <Error error={error} />} */}
               <Error error={error} />
            </FormControl>
         )}
      />
   )
}
const AddOptionRow = ({updateDisplayOptionInput}) => {
   return (
      <Pressable onPress={updateDisplayOptionInput}>
         <HStack space='lg' className='pt-4 pb-4'>
            <Icon as={CirclePlus} />
            <Text>Add answer option</Text>
         </HStack>
      </Pressable>
   )
}
const OptionTextInput = ({ field }:OptionTextInputProps) => {
   const { control } = useFormContext()
   useEffect(() => {
      console.log('op: ', field)
   })
   return (
      <View>
         <Controller
            name='label'
            control={control}
            rules={{ required: 'Option text required',}}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
               <FormControl isRequired isInvalid={!!error}>
                  <VStack space='md'>
                     <FormControlLabel>
                        <FormControlLabelText>Enter option text</FormControlLabelText>
                     </FormControlLabel>
                     <Input className=''>
                        <InputField placeholder='Option...' value={value} onChangeText={onChange} />
                     </Input>
                     <Error error={error} />
                  </VStack>
               </FormControl>
            )}
         />
      </View>
   )
}
const DisplayOptionsRow = ({ fields, remove, updateIsEdit }:DisplayOptionsRowProps) => {
   const onRemove = (i:number) => {
      remove(i)
   }
   return (
      <HStack space='md' className='flex-wrap'>
         { fields.map((f, i) => (<Option key={f.id} i={i} label={f.label} onRemove={onRemove} onEdit={updateIsEdit} />)) }
      </HStack>
   )
}
const Option = ({label, i, onRemove, onEdit}) => {
   const buttonStyle = 'w-8 h-8 bg-gray-100 border border-primary p-1'
   const iconStyle = 'w-5 h-5 text-foreground'

   return (
      <HStack space='sm' className='bg-gray-200 p-1 rounded-md items-center'>
         <Text className='pl-3 pr-3'>{label}</Text>
         <Button onPress={() => onEdit(i)} className={buttonStyle}>
            <ButtonIcon className={iconStyle} as={SquarePen} />
         </Button>
         <Button onPress={() => onRemove(i)} className={buttonStyle}>
            <ButtonIcon className={iconStyle} as={Trash} />
         </Button>
      </HStack>
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
const SubmitOrCancelButtons = ({ handleSubmit, submit, cancel, preview}) => {
   const onError = (errors) => {
      console.log('error ', errors)
   }
   return (
      <HStack space='lg'>
         <Button onPress={handleSubmit(submit, onError)}>
            <ButtonText>Submit</ButtonText>
         </Button>
         { preview && ( <Button onPress={preview}>
            <ButtonText>Preview</ButtonText>
         </Button> )}
         <Button onPress={cancel}>
            <ButtonText>Cancel</ButtonText>
         </Button>
      </HStack>
   )
}

export default CreateQuestions;
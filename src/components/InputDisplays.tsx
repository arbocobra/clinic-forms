import { FormControl, FormControlHelper, FormControlHelperText, FormControlLabel, FormControlLabelText } from '@/gluestack/form-control';
import { HStack } from '@/gluestack/hstack'
import { VStack } from '@/gluestack/vstack'
import { Input, InputField } from '@/gluestack/input'
import { Radio, RadioGroup, RadioIcon, RadioIndicator, RadioLabel } from '@/gluestack/radio'
import { Textarea, TextareaInput } from '@/gluestack/textarea'
import type { QuestionDisplay } from '@/src/types';
import { Circle } from 'lucide-react-native';
import { useEffect } from 'react';
import { Text } from 'react-native';

export const DisplayShortText = ({question}:{question:QuestionDisplay}) => {
   const {label, description, required } = question;
   
   return (
      <FormControl isReadOnly={true} isRequired={required}>
         <VStack space='sm'>
            <FormControlLabel>
               <FormControlLabelText className={label === '' ? 'italic' : ''}>{label === '' ? 'Question Text' : label}</FormControlLabelText>
            </FormControlLabel>
            <Input>
               <InputField placeholder='Answer...' />
            </Input>
            <FormControlHelper>
               <FormControlHelperText>{description}</FormControlHelperText>
            </FormControlHelper>
         </VStack>
      </FormControl>
   )
}
export const DisplayLongText = ({question}:{question:QuestionDisplay}) => {
   const { label, description, required } = question;

   return (
      <FormControl isReadOnly={true} isRequired={required}>
         <VStack space='sm'>
            <FormControlLabel>
               <FormControlLabelText className={label === '' ? 'italic' : ''}>{label === '' ? 'Question Text' : label}</FormControlLabelText>
            </FormControlLabel>
            <Textarea>
               <TextareaInput placeholder='Answer...' />
            </Textarea>
            <FormControlHelper>
               <FormControlHelperText>{description}</FormControlHelperText>
            </FormControlHelper>
         </VStack>
      </FormControl>
   )
}
export const DisplayTrueFalse = ({question}:{question:QuestionDisplay}) => {
   const {label, description, required, options} = question;
   const opacity = "[&[data-disabled='true']]:opacity-100"

   return (
      <FormControl isReadOnly={true} isRequired={required}>
         <VStack space='sm'>
            <FormControlLabel>
               <FormControlLabelText>{label === '' ? 'Question Text' : label}</FormControlLabelText>
            </FormControlLabel>
            <RadioGroup value='true'>
               <HStack space="md">
               <Radio value='true' className={opacity}>
                  <RadioIndicator className={opacity}>
                     <RadioIcon as={Circle} />
                  </RadioIndicator>
                  <RadioLabel className={opacity}>True</RadioLabel>
               </Radio>
               <Radio value='false' className={opacity}>
                  <RadioIndicator className={opacity}>
                     <RadioIcon as={Circle} />
                  </RadioIndicator>
                  <RadioLabel className={opacity}>False</RadioLabel>
               </Radio>
               </HStack>
            </RadioGroup>
            <FormControlHelper>
               <FormControlHelperText>{description}</FormControlHelperText>
            </FormControlHelper>
         </VStack>
      </FormControl>
   )
}

export const DisplaySingleSelectText = ({question}:{question:QuestionDisplay}) => {
   const {label, description, required, options} = question;
   useEffect(() => {
      console.log(question)
   }, [])
   return (
      <FormControl isReadOnly={true} isRequired={required}>
         <VStack space='sm'>
            <FormControlLabel>
               <FormControlLabelText>{label === '' ? 'Question Text' : label}</FormControlLabelText>
            </FormControlLabel>
            <RadioGroup value='true'>
               {/* <HStack space="md">
               </HStack> */}
                { options?.length ? options.map((opt) => (<RadioOption key={opt.value} label={opt.label} />)) : 
                (
                  <><RadioOption label='Sample Option 1' /><RadioOption label='Sample Option 2' /></>
                ) }
            </RadioGroup>
            <FormControlHelper>
               <FormControlHelperText>{description}</FormControlHelperText>
            </FormControlHelper>
         </VStack>
      </FormControl>
   )
}
const RadioOption = ({label}) => {
   const opacity = "[&[data-disabled='true']]:opacity-100"
   
   useEffect(() => {
      console.log(label)
   }, [])

   return (
      <Radio value={label} className={opacity}>
         <RadioIndicator className={opacity}>
            <RadioIcon as={Circle} />
         </RadioIndicator>
         <RadioLabel className={opacity}>{label}</RadioLabel>
      </Radio>
      // <Text>Hello Test</Text>
   )
}
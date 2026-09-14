import {
   FormControl,
   FormControlHelper, FormControlHelperText,
   FormControlLabel, FormControlLabelText,
   HStack,
   Input, InputField,
   Radio, RadioGroup, RadioIcon, RadioIndicator, RadioLabel,
   VStack
} from '@/gluestack/index';
import type { QuestionDisplay } from '@/src/types';
import { Circle } from 'lucide-react-native';


// import { useController } from 'react-hook-form';

// type ShortTextProps = { control:any, name:string, label:string, description:string }

export const DisplayShortText = ({question}:{question:QuestionDisplay}) => {
   const {label, description, required, options} = question;
   // const { field: { value } } = useController({ control, name });

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
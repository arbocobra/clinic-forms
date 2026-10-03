import { Button, ButtonText,  } from '@/components/ui/button';
import { HStack } from '@/components/ui/hstack';
import { Select, SelectBackdrop, SelectContent, SelectDragIndicator, SelectDragIndicatorWrapper, SelectIcon, SelectInput, SelectItem, SelectPortal, SelectTrigger } from '@/components/ui/select';
import {FormControl, FormControlError, FormControlErrorIcon, FormControlErrorText, FormControlLabel, FormControlLabelText} from '@/components/ui/form-control'
import { questionBase } from '@/src/constants/questions';
import type { QuestionBase } from '@/src/types';
import { ChevronDownIcon, CircleAlert } from 'lucide-react-native';
import { useController, useForm, type DefaultValues, type FieldErrors } from 'react-hook-form';

type FormInput = { selectedType:QuestionBase | null }
const formDefault:DefaultValues<FormInput> = { selectedType: null }

const QuestionSelect = ({updateSelect}) => {
   const { control, handleSubmit } = useForm<FormInput>({ defaultValues: formDefault });

   return (
      <HStack space='lg'>
         <Dropdown control={control} name='selectedType' label='Select Question Type' options={questionBase} />
         <Button onPress={handleSubmit(updateSelect)}>
            <ButtonText>Select</ButtonText>
         </Button>
      </HStack>
   );
}

type DropDownProps = { control:any, name:string, label:string, options:QuestionBase[]
   // , errors: FieldErrors<FormInput> 
}

const Dropdown = ({control, name, label, options}:DropDownProps) => {
   const { field: { onChange, value }, fieldState: { invalid, error } } = useController({ control, name, rules: { required: 'Must select question type'} });
   
   return (
      <FormControl className='flex-1' isRequired={true} isInvalid={invalid}>
         <FormControlLabel>
            <FormControlLabelText>{label}</FormControlLabelText>
         </FormControlLabel>
         <Select selectedValue={value} onValueChange={(val) => {
            const selectObject = options.find((opt) => opt.type === val);
            onChange(selectObject)
         }}>
            <SelectTrigger variant='outline' size='md' className='flex bg-white dark:bg-black'>
               <SelectInput placeholder='SELECT' className='flex-1' />
               <SelectIcon className='mr-3' as={ChevronDownIcon} />
            </SelectTrigger>
            <SelectPortal>
               <SelectBackdrop />
               <SelectContent>
                  <SelectDragIndicatorWrapper>
                     <SelectDragIndicator />
                  </SelectDragIndicatorWrapper>
                  {options.map((opt:QuestionBase) => ( <SelectItem key={opt.id} label={opt.typeLabel} value={opt.type} /> ))}
               </SelectContent>
            </SelectPortal>
         </Select>
         <FormControlError>
            <FormControlErrorIcon as={CircleAlert} /> 
            <FormControlErrorText>{error?.message}</FormControlErrorText>
         </FormControlError>
         {/* { errors?.selectedType && <Error errors={errors.selectedType} />} */}
      </FormControl>
   )
}

// const Error = ({errors}) => {
//    return (
//       <FormControlError>
//          <FormControlErrorIcon as={CircleAlert} /> 
//          <FormControlErrorText>{errors.message}</FormControlErrorText>
//       </FormControlError>
//    )
// }

export default QuestionSelect;
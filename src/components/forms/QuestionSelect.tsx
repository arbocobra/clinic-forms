import { Button, ButtonText, FormControl, FormControlLabel, FormControlLabelText, HStack, Select, SelectBackdrop, SelectContent, SelectDragIndicator, SelectDragIndicatorWrapper, SelectIcon, SelectInput, SelectItem, SelectPortal, SelectTrigger } from '@/gluestack/index';
import { questionBase } from '@/src/constants/questions';
import type { QuestionBase } from '@/src/types';
import { ChevronDownIcon } from 'lucide-react-native';
import { useController, useForm, type DefaultValues } from 'react-hook-form';

type FormInput = { selectedType:QuestionBase | null }
type DropDownProps = { control:any, name:string, label:string, options:QuestionBase[] }
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

const Dropdown = ({control, name, label, options}:DropDownProps) => {
   const { field: { onChange, value } } = useController({ control, name });

   return (
      <FormControl className='flex-1'>
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
      </FormControl>
   )
}

export default QuestionSelect;
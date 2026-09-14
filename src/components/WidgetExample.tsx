import { Button, ButtonText } from '@/gluestack/button';
import { FormControl, FormControlLabel, FormControlLabelText } from '@/gluestack/form-control';
import { HStack } from '@/gluestack/hstack';
import { Select, SelectBackdrop, SelectContent, SelectDragIndicator, SelectDragIndicatorWrapper, SelectIcon, SelectInput, SelectItem, SelectPortal, SelectTrigger } from '@/gluestack/select';
import { ChevronDownIcon } from 'lucide-react-native';
import { useController, useForm } from 'react-hook-form';
import { StyleSheet } from 'react-native';

const formSchema = [
  { name: 'email', label: 'Email Address', type: 'text', required: true, id:1 },
  { name: 'age', label: 'Age', type: 'number', required: false, id:2 },
];

type qtSchema = { value:string, label:string, type:string, id:number }
const questionTypeSchema:qtSchema[] = [
   { value: 'short-text', label: 'Short Text Input', type: 'text', id: 0 },
   { value: 'long-text', label: 'Long Text Input', type: 'text', id: 1 },
   { value: 'single-select-text', label: 'Single Option From List (text)', type: 'text', id: 2 },
   { value: 'single-select-number', label: 'Single Option From List (number)', type: 'number', id: 3 },
   { value: 'single-select-boolean', label: 'True or False', type: 'boolean', id: 4 },
   { value: 'multi-select', label: 'Multiple Options Checkbox', type: 'text', id: 5 },
]

type FormValues = { questionType:string }
type DropDownProps = { control:any, name:string, label:string, options:qtSchema[] }

const Form = ({updateSelect}) => {
   const { control, handleSubmit } = useForm<FormValues>({ defaultValues: { questionType: '' },  mode: 'onChange' });
   return (
      <HStack space='lg'>
         <Dropdown control={control} name='questionType' label='Select Question Type' options={questionTypeSchema} />
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
         <Select selectedValue={value} onValueChange={onChange}>
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
                  {options.map((opt:qtSchema) => ( <SelectItem key={opt.id} label={opt.label} value={opt.value} /> ))}
               </SelectContent>
            </SelectPortal>
         </Select>
      </FormControl>
   )
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  inputWrapper: { marginBottom: 15 },
  label: { fontWeight: 'bold', marginBottom: 5 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 5 },
  errorText: { color: 'red', marginTop: 5 }
});

export default Form;
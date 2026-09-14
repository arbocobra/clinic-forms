import { Button, ButtonText, FormControl, FormControlLabel, FormControlLabelText, HStack, Select, SelectBackdrop, SelectContent, SelectDragIndicator, SelectDragIndicatorWrapper, SelectIcon, SelectInput, SelectItem, SelectPortal, SelectTrigger, VStack } from '@/gluestack/index';
import { Menu, MenuItem, MenuItemLabel } from '@/gluestack/index';
import { questionBase } from '@/src/constants/questions';
import type { QuestionBase } from '@/src/types';
import { ChevronDownIcon } from 'lucide-react-native';
import { useEffect } from 'react';
import { Controller, useController, useForm, type DefaultValues } from 'react-hook-form';
import { Text } from 'react-native';

type DropDownProps = { control:any, name:string, label:string, options:QuestionBase[] }


const QuestionSelect = ({updateSelect}) => {
   type FormInput = { selectedType:QuestionBase | null }
   const formDefault:DefaultValues<FormInput> = { selectedType: null }
   const { control, handleSubmit, watch } = useForm<FormInput>({ defaultValues: formDefault });
   const testWatch = watch()
   return (
      <HStack space='lg'>
         {/* <Dropdown control={control} name='selectedType' label='Select Question Type' options={questionBase} /> */}
         <SelectionMenu control={control} name='selectedType' label='Select Question Type' options={questionBase} />
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

const SelectionMenu = ({control, name, label, options}:DropDownProps) => {
   const { field: { onChange, value } } = useController({ control, name });
   return (
      <FormControl>
         <FormControlLabel>
            <FormControlLabelText>{label}</FormControlLabelText>
         </FormControlLabel>
         <Controller 
            control={control}
            name={name}
            rules={{ required: 'Please select a question type' }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
               <VStack space='md'>
                  <Menu placement='bottom left' offset={5} disabledKeys={['Settings']} closeOnSelect={true}
                     trigger={({ ...triggerProps }) => {
                        return (
                           <Button {...triggerProps}>
                              <ButtonText>{'Select'}</ButtonText>
                           </Button>
                        );
                     }}>
                     {options.map((opt) => (
                        <MenuItem key={opt.id} textValue={opt.type} onPress={() => onChange(opt)}>
                           <MenuItemLabel>{opt.typeLabel}</MenuItemLabel>
                        </MenuItem> ))}
                  </Menu>
                  { error && <Text>{error.message}</Text> }
               </VStack>
            )}
          />
      </FormControl>
   )
}

export default QuestionSelect;
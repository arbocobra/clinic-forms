import { AddOptionRow, Error, SubmitOrCancelButtons } from '@/src/components/forms/WriteElements';
import type { Option, OptionFormInput } from '@/src/types';
import { useEffect, useState } from 'react';
import { Controller, useForm, type DefaultValues } from 'react-hook-form';
import { FormControl, FormControlHelper, FormControlHelperText, FormControlLabel, FormControlLabelText, FormControlError, FormControlErrorIcon, FormControlErrorText } from '@/components/ui/form-control';
import { Card } from '@/components/ui/card'
import { Input, InputField } from '@/components/ui/input'
import { VStack } from '@/components/ui/vstack'


const WriteOption = ({current, selection, append}) => {

   const formDefault:DefaultValues<OptionFormInput> = { label: '' }
   const [displayOptionInput, setDisplayOptionInput] = useState(false)
   const { handleSubmit, control, reset, formState: { errors } } = useForm<OptionFormInput>({ defaultValues: formDefault });

   const onSubmit = (data:OptionFormInput) => {
      const output:Option = { index: current.length, label: data.label, value: selection.id === 4 ? Number.parseInt(data.label) : data.label.toLowerCase() } 
      append(output)
      setDisplayOptionInput(false)
   }
   const cancel = () => { 
      setDisplayOptionInput(false)
      reset() 
   }
   
   // useEffect(() => {
   //    reset()
   // }, [displayOptionInput])

   return (
      <VStack space='md'>
         { displayOptionInput ? (
            <Card>
         <FormControl isRequired={true} isInvalid={!!errors?.label}>
         <FormControlLabel>
            <FormControlLabelText>Enter option</FormControlLabelText>
         </FormControlLabel>
         <Controller
            name='label'
            control={control}
            rules={{ required: 'Option text required',}}
            render={({ field: { value, onChange } }) => (
               <Input className='bg-white'>
                  <InputField placeholder='Option...' value={value} onChangeText={onChange} />
               </Input>
            )}
         />
         { errors.label && <Error message={errors.label.message} /> }
      </FormControl>
         <SubmitOrCancelButtons handleSubmit={handleSubmit} submit={onSubmit} cancel={cancel} preview={null} />
      </Card>
         )
         : <AddOptionRow setDisplayOptionInput={setDisplayOptionInput} /> }
      </VStack>
   )
}
export default WriteOption;
import { AddOptionRow, Error, SubmitOrCancelButtons } from '@/components/forms/WriteElements';
import { Card, FormControl, FormControlLabel, FormControlLabelText, Input, InputField, VStack } from '@/gluestack/index';
import type { Option } from '@/src/types';
import { useEffect, useState } from 'react';
import { Controller, useForm, type DefaultValues } from 'react-hook-form';

type OptionFormInput = { option:string }

const WriteOption = ({current, selection, append, fields}) => {
   const formDefault:DefaultValues<OptionFormInput> = { option: '' }
   const [displayOptionInput, setDisplayOptionInput] = useState(false)

   const { handleSubmit, control, reset, formState: { errors } } = useForm({ defaultValues: formDefault });

   const onSubmit = (data:OptionFormInput) => {
      const output:Option = { id: current.length, label: data.option, value: selection.id === 4 ? Number.parseInt(data.option) : data.option.toLowerCase() } 
      append(output)
      setDisplayOptionInput(false)
   }

   useEffect(() => {
      reset()
   }, [displayOptionInput])

   return (
      <VStack space='md'>
         { displayOptionInput ? (
            <Card>
         <FormControl isRequired={true} isInvalid={!!errors?.option}>
         <FormControlLabel>
            <FormControlLabelText>Enter option</FormControlLabelText>
         </FormControlLabel>
         <Controller
            name='option'
            control={control}
            rules={{ required: 'Option text required',}}
            render={({ field: { value, onChange } }) => (
               <Input className='bg-white'>
                  <InputField placeholder='Option...' value={value} onChangeText={onChange} />
               </Input>
            )}
         />
         { errors.option && <Error message={errors.option.message} /> }
      </FormControl>
         <SubmitOrCancelButtons handleSubmit={handleSubmit} submit={onSubmit} cancel={() => setDisplayOptionInput(false)} />
      </Card>
         )
         : <AddOptionRow setDisplayOptionInput={setDisplayOptionInput} /> }
      </VStack>
   )
}
export default WriteOption;
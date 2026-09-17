import { HStack, VStack } from '@/gluestack/index';
import { AddDescriptionCheckbox, DescriptionTextInput, IsRequiredCheckbox, QuestionTextInput, SubmitOrCancelButtons } from '@/src/components/forms/WriteElements';
import WriteOption from '@/src/components/forms/WriteOption';
import type { QuestionFormInput, OptionFormInput } from '@/src/types';
import { useEffect, useState } from 'react';
import { FieldValues, useFieldArray, useForm, type DefaultValues, useFormContext, FormProvider } from 'react-hook-form';

const WriteQuestion = ({setIsSelecting, selection, handleQuestionChange, onSubmit, openPreview, resetQuestion}) => {
   const formDefault:DefaultValues<QuestionFormInput> = selection?.id < 3 ? { label: '', showDesc: false, required: true, description: '' } : { label: '', showDesc: false, required: true, description: '', options: [] }
   const optionFormDefault:DefaultValues<OptionFormInput> = { label: '' }

   const [displayDescription, setDisplayDescription] = useState(false)
   const { handleSubmit, control, resetField, reset, getValues, watch, formState: { errors } } = useForm<QuestionFormInput>({ defaultValues: formDefault });
   const {fields, append, remove, replace} = useFieldArray({control, name:'options', rules: { minLength: 2 }})
   
   const resetForm = () => { reset() }

   const cancel = () => { 
      setIsSelecting(true) 
      resetForm()
      resetQuestion()
   }
   const preview = () => { 
      const data:QuestionFormInput = getValues()
      openPreview(data)
    }
   const options = watch('options')

   const updateDisplayDescription = (val:boolean) => {
      setDisplayDescription(() => {
         if (!val) {
            resetField('description')
         }
         return val
      })
   }

   return (
      <VStack space='md'>
         <QuestionTextInput control={control} error={errors?.label} />
         <HStack space='lg'>
            <AddDescriptionCheckbox control={control} update={updateDisplayDescription} />
            <IsRequiredCheckbox control={control} />
         </HStack>
         { displayDescription && <DescriptionTextInput control={control} error={errors?.description} /> }
         { selection.id > 2 && (
            <WriteOption current={getValues('options')} selection={selection} append={append} />)}
         <SubmitOrCancelButtons handleSubmit={handleSubmit} submit={onSubmit} cancel={cancel} preview={preview} />
      </VStack>
   )
}

export default WriteQuestion;
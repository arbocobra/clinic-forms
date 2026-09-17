import { Heading } from '@/gluestack/index';
import QuestionSelect from '@/src/components/forms/QuestionSelect';
import WriteQuestion from '@/src/components/forms/WriteQuestion';
import CreateQuestions from '@/src/components/forms/CreateQuestion';
import type { QuestionBase } from '@/src/types';
import { useEffect, useState } from 'react';
import { View } from 'react-native';

const AddQuestion = ({setSelection, selection, onSubmit, openPreview, resetQuestion}) => {
   const [isSelecting, setIsSelecting] = useState(true)

   const updateSelect = (data:{ selectedType:QuestionBase }) => {
      console.log('updateSelect')
      setSelection(() => {
         setIsSelecting(false)
         return data.selectedType
      })
   }
   // 8
   useEffect(() => {
      console.log('setIsSelecting ', isSelecting)
   }, [isSelecting])


   return (
      <View className='flex-1'>
         <Heading className='p-8' size='lg'>Section Two</Heading>
         { isSelecting && <QuestionSelect updateSelect={updateSelect} /> }
         {/* { !isSelecting && selection && <WriteQuestion setIsSelecting={setIsSelecting} selection={selection} handleQuestionChange={handleQuestionChange} onSubmit={onSubmit} openPreview={openPreview} resetQuestion={resetQuestion} /> } */}
         { !isSelecting && selection && <CreateQuestions setIsSelecting={setIsSelecting} selection={selection} onSubmit={onSubmit} openPreview={openPreview} resetQuestion={resetQuestion} /> }
      </View>
   )
}
export default AddQuestion;
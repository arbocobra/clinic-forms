import { Heading } from '@/gluestack/index';
import QuestionSelect from '@/src/components/forms/QuestionSelect';
import WriteQuestion from '@/src/components/forms/WriteQuestion';
import type { QuestionBase } from '@/src/types';
import { useEffect, useState } from 'react';
import { View } from 'react-native';

const AddQuestion = ({setSelection, selection, handleQuestionChange, onSubmit}) => {
   const [isSelecting, setIsSelecting] = useState(true)
   const updateSelect = (data:{ selectedType:QuestionBase }) => { setSelection(data.selectedType) }

   useEffect(() => {
      if (isSelecting) { setSelection(null) }
   }, [isSelecting])

   useEffect(() => {
      if (selection) { setIsSelecting(false) }
      else { setIsSelecting(true) }
   }, [selection])

   return (
      <View className='flex-1'>
         <Heading className='p-8' size='lg'>Section Two</Heading>
         { isSelecting && <QuestionSelect updateSelect={updateSelect} /> }
         { !isSelecting && selection && <WriteQuestion setIsSelecting={setIsSelecting} selection={selection} handleQuestionChange={handleQuestionChange} onSubmit={onSubmit} /> }
            {/* <QuestionSelect updateSelect={updateSelect} /> : 
            // <Text>{JSON.stringify(selection, null, 2)}</Text> 
            <WriteQuestion setIsSelecting={setIsSelecting} selection={selection} handleQuestionChange={handleQuestionChange} onSubmit={onSubmit} />  */}
      </View>
   )
}
export default AddQuestion;
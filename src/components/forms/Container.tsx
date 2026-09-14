import { Divider, VStack } from '@/gluestack/index';
import AddQuestion from '@/src/components/forms/AddQuestion';
import DisplayQuestion from '@/src/components/forms/DisplayQuestion';
import QuestionList from '@/src/components/forms/QuestionList';
import type { Question, QuestionBase, QuestionDisplay, QuestionFormInput } from '@/src/types';
import { useEffect, useState } from 'react';

const initialValue:QuestionDisplay = {label:'', description: '', required: true, options: []}

const Container = () => {
   const [questionArray, setQuestionArray] = useState<Question[]>([])
   const [selection, setSelection] = useState<QuestionBase | null>(null)
   const [question, setQuestion] = useState<QuestionDisplay>(initialValue)

   const onSubmit = (data:QuestionFormInput) => {
      if (!selection) return
      const {id, ...base} = selection
      const { showDesc, ...output } = data;
      const result:Question = {...base, ...output, id: questionArray.length}
      setQuestionArray([...questionArray, result])
   }

   const handleQuestionChange = (data:string, cat:string) => {
      setQuestion(prev => ({ ...prev, [cat]: data }))
   }

   useEffect(() => {
      console.log(questionArray)
      setQuestion(initialValue)
      setSelection(null)
   }, [questionArray])

   return (
      <VStack className='flex-1' space='md'>
         <QuestionList questionArray={questionArray} />
         <Divider />
         <AddQuestion selection={selection} setSelection={setSelection} handleQuestionChange={handleQuestionChange} onSubmit={onSubmit} />
         <Divider />
         <DisplayQuestion selection={selection} question={question} />
      </VStack>
   )
}

export default Container;
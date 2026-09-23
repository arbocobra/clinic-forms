import { VStack } from '@/components/ui/vstack';
import { Divider } from '@/components/ui/divider';
import AddQuestion from '@/src/components/forms/AddQuestion';
import DisplayPreview from '@/src/components/forms/DisplayPreview';
import QuestionList from '@/src/components/forms/QuestionList';
import type { Question, QuestionBase, QuestionDisplay, QuestionFormInput } from '@/src/types';
import { useEffect, useState } from 'react';

const initialValue:QuestionDisplay = {label:'', description: '', required: true, options: []}

const Container = () => {
   const [questionArray, setQuestionArray] = useState<Question[]>([])
   const [selection, setSelection] = useState<QuestionBase | null>(null)
   const [question, setQuestion] = useState<QuestionDisplay>(initialValue)
   const [showPreview, setShowPreview] = useState(false)
   // 2
   const onSubmit = (data:QuestionFormInput) => {
      // console.log('on submit')
      if (!selection) return
      const {id, ...base} = selection
      const { showDesc, ...output } = data;
      const result:Question = {...base, ...output, id: questionArray.length}
      updateQuestionArray('add', result)
   }

   const openPreview = (data:QuestionFormInput) => {
      setQuestion(() => {
         const { showDesc, ...output } = data;
         setShowPreview(true);
         return output;
      })
   }

   // 3
   const updateQuestionArray = (action:string, data:Question) => {
      // console.log('updateQuestionArray ')
      if (action === 'add') {
         const update = questionArray.length ? [...questionArray, data] : [data];
         setQuestionArray(update)
      }
      // setQuestionArray((prev) => {
      //    const update = [...prev, data]
      //    resetQuestion();
      //    return update;
      // })
   }
   // 6
   const resetQuestion = () => {
      // console.log('resetQuestion')
      setQuestion(() => {
         setSelection(null)
         return initialValue;
      })
   }
   // 9
   // useEffect(() => {
   //    console.log('setSelection ', selection)
   // }, [selection])

   // useEffect(() => {
   //    console.log('setQuestion ', question)
   // }, [question])
   // 7
   useEffect(() => {
      console.log('setQuestionArray ', questionArray)
   }, [questionArray])

   return (
      <VStack className='flex-1' space='md'>
         <QuestionList questionArray={questionArray} />
         <Divider />
         <AddQuestion selection={selection} setSelection={setSelection} onSubmit={onSubmit} openPreview={openPreview} resetQuestion={resetQuestion} />
         <Divider />
         <DisplayPreview showPreview={showPreview} close={() => setShowPreview(false)} selection={selection} question={question} />
      </VStack>
   )
}

export default Container;
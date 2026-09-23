import { DisplayShortText, DisplayLongText, DisplayTrueFalse, DisplaySingleSelectText } from '@/src/components/InputDisplays';
import { Card } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { VStack } from '@/components/ui/vstack';
import type { QuestionBase, QuestionDisplay } from '@/src/types';
import { Text } from 'react-native';
import { useState } from 'react';
import {
  Actionsheet,
  ActionsheetContent,
  ActionsheetItem,
  ActionsheetItemText,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  ActionsheetBackdrop,
} from '@/gluestack/actionsheet';

type DisplayPreviewProps = { showPreview:boolean, close:()=>void, selection:QuestionBase | null, question:QuestionDisplay}
const DisplayPreview = ({showPreview, close, selection, question}:DisplayPreviewProps) => {
   if (selection) { return (
      // <VStack className='flex-1'>
      //    { selection && <Card className='w-full'>
      //       {/* <Heading className='' size='md'>Preview Question:</Heading> */}
      //       <Heading className='' size='sm'>Preview Question: { selection.typeLabel }</Heading>
      //       { selection.id === 0 && <DisplayShortText question={question} /> }
      //       { selection.id === 1 && <DisplayLongText question={question} /> }
      //       { selection.id === 2 && <DisplayTrueFalse question={question} /> }
      //       {/* { selection.id === 3 && <DisplaySingleSelectText question={question} /> } */}
      //       { selection.id > 2 && <Text>{selection.typeLabel}</Text> }
      //    </Card>}
      // </VStack>
      <Actionsheet isOpen={showPreview} onClose={close}>
         <ActionsheetBackdrop />
         <ActionsheetContent className='w-full'>
            <ActionsheetDragIndicatorWrapper>
               <ActionsheetDragIndicator />
            </ActionsheetDragIndicatorWrapper>
            <VStack space='lg' className='w-full pl-5 pr-5 pt-8 pb-2'>
               <Heading className='' size='sm'>Preview Question: { selection.typeLabel }</Heading>
               <Preview id={selection.id} question={question} />
               <Text className='bg-gray-200 text-gray-600 italic p-1 mt-6 text-md'>This preview is Read-Only</Text>
            </VStack>
         </ActionsheetContent>
      </Actionsheet>
   )}
   else return null;
}

const Preview = ({ id, question }:{id:number, question:QuestionDisplay}) => {
   if (id === 0) { return (<DisplayShortText question={question} />)}
   else if (id === 1) { return (<DisplayLongText question={question} />)}
   else if (id === 2) { return (<DisplayTrueFalse question={question} />)}
   else if (id === 3) { return (<DisplaySingleSelectText question={question} />)}
   else { return (<Text>Display TBD</Text>)}
}
export default DisplayPreview;
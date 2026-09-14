import { DisplayShortText, DisplayTrueFalse } from '@/components/InputDisplays';
import { Card, Heading, VStack } from '@/gluestack/index';
import type { QuestionBase, QuestionDisplay } from '@/src/types';
import { Text } from 'react-native';

const DisplayQuestion = ({selection, question}:{selection:QuestionBase | null, question:QuestionDisplay}) => {

   return (
      <VStack className='flex-1'>
         { selection && <Card className='w-full'>
            {/* <Heading className='' size='md'>Preview Question:</Heading> */}
            <Heading className='' size='sm'>Preview Question: { selection.typeLabel }</Heading>
            { selection.id === 0 && <DisplayShortText question={question} /> }
            { selection.id === 2 && <DisplayTrueFalse question={question} /> }
            { selection.id === 1 && <Text>{selection.typeLabel}</Text> }
            { selection.id > 2 && <Text>{selection.typeLabel}</Text> }
         </Card>}
      </VStack>
   )
}
export default DisplayQuestion;
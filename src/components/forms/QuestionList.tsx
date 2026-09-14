import { Heading, Icon, Table, TableBody, TableData, TableHead, TableHeader, TableRow, VStack } from '@/gluestack/index';
import type { Question } from '@/src/types';
import { SquarePen, Trash } from 'lucide-react-native';
import { Text } from 'react-native';
//"group/radio flex-row justify-start items-center web:cursor-pointer data-[disabled=true]:web:cursor-not-allowed data-[disabled=true]:opacity-50 gap-2 disabled:opacity-100"

const QuestionList = ({questionArray}:{questionArray:Question[]}) => {

   return (
      <VStack>
         <Heading className='p-8' size='lg'>Questions</Heading>
         <Table className='w-full'>
            <TableHeader>
               <TableRow className='border-b-3 h-10'>
                  <Cell type='header' value='Type' width='flex-4' />
                  <Cell type='header' value='Question' width='flex-5' />
                  <Cell type='header' value='' width='flex-1' />
                  <Cell type='header' value='' width='flex-1' />
               </TableRow>
            </TableHeader>
            { questionArray.length > 0 && (<TableBody>
               { questionArray.map((el:Question) => (
                  <TableRow key={el.id}>
                     <Cell type='data' value={el.typeLabel} width='flex-4' />
                     <Cell type='data' value={el.label} width='flex-5' />
                     <Cell type='icon' value={SquarePen} width='' />
                     <Cell type='icon' value={Trash} width='' />
                  </TableRow>
               ))}
            </TableBody>) }
         </Table>
      </VStack>
   )
}

const Cell = ({type, value, width}) => {
   const textCell = 'p-2 text-md justify-center'
   const iconCell = 'flex-1 p-2 text-md items-center justify-center'

   if (type === 'header') { return (
      <TableHead useRNView className={`${textCell} ${width}`}>
         <Text className='text-md font-bold'>{value}</Text>
      </TableHead>
   )} else if (type === 'icon') { return (
      <TableData useRNView className={iconCell}>
         <Icon as={value} />
      </TableData>
   )} else { return (
      <TableData useRNView className={`${textCell} ${width}`}>
         <Text>{value}</Text>
      </TableData>
   )}
}

export default QuestionList;
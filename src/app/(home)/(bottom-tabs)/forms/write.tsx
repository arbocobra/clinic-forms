import { ScrollView, Text } from 'react-native'
import { Link } from 'expo-router'
import { VStack } from '@/gluestack/vstack'
import { Heading } from '@/gluestack/heading'
import { Icon } from '@/gluestack/icon'
import { Button, ButtonIcon, ButtonText } from '@/gluestack/button'
import { SquarePen, Trash, SquareText } from 'lucide-react-native';
import { Table, TableBody, TableData, TableHead, TableHeader, TableRow } from '@/gluestack/table'

export const Page = () => {

  return (
    <ScrollView keyboardShouldPersistTaps='handled'>
      <VStack space='lg' className='pt-10 pb-0 pl-5 pr-5'>
        <MyForms />
        <CreateNew />
      </VStack>
    </ScrollView>
  )
}

const MyForms = () => {
  return (
    <VStack space='md'>
      <Heading size='md'>My Forms</Heading>
        <Table className='w-full'>
            <TableHeader>
               <TableRow className='border-b-3 h-10'>
                  <Cell type='header' value='Date' width='flex-4' />
                  <Cell type='header' value='Form' width='flex-5' />
                  <Cell type='header' value='' width='flex-1' />
                  <Cell type='header' value='' width='flex-1' />
               </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                  <Cell type='data' value='26/09/17' width='flex-4' />
                  <Cell type='data' value='Are You Sad?' width='flex-5' />
                  <Cell type='icon' value={SquarePen} width='' />
                  <Cell type='icon' value={Trash} width='' />
              </TableRow>
              <TableRow>
                  <Cell type='data' value='26/05/15' width='flex-4' />
                  <Cell type='data' value='The Crazy Scale' width='flex-5' />
                  <Cell type='icon' value={SquarePen} width='' />
                  <Cell type='icon' value={Trash} width='' />
              </TableRow>
            </TableBody>
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

const CreateNew = () => {
  return (
    <Link href= '/alt-create' asChild>
      <Button size='lg'>
        <ButtonIcon as={SquareText} />
        <ButtonText>New Form</ButtonText>
      </Button>
    </Link>
  )
}

export default Page;
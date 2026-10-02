import { Link } from 'expo-router'
import { Heading } from '@/components/ui/heading'
import { Icon } from '@/components/ui/icon'
import { SquarePen, Trash, SquareText } from 'lucide-react-native'
import { Table, TableBody, TableData, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Text } from '@/components/custom/text'
import { Container } from '@/components/custom/wrapper'
import { TextIconButton } from '@/components/custom/buttons'

export const Page = () => {

  return (
    <Container>
      <Heading size='md'>My Forms</Heading>
      <FormTable />
      <Link href= 'forms/write/create' asChild>
        <TextIconButton className='self-center' label='Write New Form' position='left' icon={SquareText} onPress={()=>{console.log('new form')}} />
      </Link>
    </Container>
  )
}

const FormTable = () => {
  return (
    <Table className='w-full'>
        <TableHeader>
            <TableRow className='border-b-3 h-10'>
              <Cell type='header' value='Date' width='flex-3' />
              <Cell type='header' value='Form' width='flex-6' />
              <Cell type='header' value='' width='flex-1' />
              <Cell type='header' value='' width='flex-1' />
            </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
              <Cell type='data' value='26/09/17' width='flex-3' />
              <Cell type='data' value='Are You Sad?' width='flex-6' />
              <Cell type='icon' value={SquarePen} width='' />
              <Cell type='icon' value={Trash} width='' />
          </TableRow>
          <TableRow>
              <Cell type='data' value='26/05/15' width='flex-3' />
              <Cell type='data' value='Scale of Crazy, 1-10' width='flex-6' />
              <Cell type='icon' value={SquarePen} width='' />
              <Cell type='icon' value={Trash} width='' />
          </TableRow>
        </TableBody>
      </Table>
  )
}

const Cell = ({type, value, width}) => {
   const textCell = 'p-2 text-md justify-center'
   const iconCell = 'flex-1 p-2 text-md items-center justify-center'

   if (type === 'header') { return (
      <TableHead useRNView className={`${textCell} ${width}`}>
         <Text className='font-bold'>{value}</Text>
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

export default Page;
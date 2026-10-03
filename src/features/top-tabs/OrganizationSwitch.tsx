import { Actionsheet, ActionsheetBackdrop, ActionsheetContent, ActionsheetItem, ActionsheetDragIndicator, ActionsheetDragIndicatorWrapper, ActionsheetSectionHeaderText, ActionsheetItemText } from '@ui/actionsheet';
import { Button, ButtonIcon } from '@ui/button';
import { Bolt } from 'lucide-react-native';

type DataType = { id:string, role:string, roleName:string }
type OrganizationSwitcherProps = { isOpen:boolean, handleClose:() => void, data:DataType[], handlePress:(id:string) => void }

export const SwitchSheet = ({isOpen, handleClose, data, handlePress}:OrganizationSwitcherProps) => {

   const Items = data.map((el:DataType) => el.role != 'org:admin' && (
      <SwitchItem key={el.id} title={el.roleName} action={() => handlePress(el.id)} />
   ))
   
   return (
      <Actionsheet isOpen={isOpen} onClose={handleClose}>
         <ActionsheetBackdrop />
         <ActionsheetContent className='dark:bg-muted'>
            <ActionsheetDragIndicatorWrapper>
               <ActionsheetDragIndicator />
            </ActionsheetDragIndicatorWrapper>
            <ActionsheetSectionHeaderText>Change Role</ActionsheetSectionHeaderText>
            { Items }
         </ActionsheetContent>
      </Actionsheet>
   )
}

export const SwitchButton = ({action, isOpen}) => (
   <Button onPress={action} size='lg' variant='secondary' className={`p-2 h-11 w-11 ml-2 mr-3 rounded-full ${isOpen && 'bg-accent'}`}>
      <ButtonIcon className={`h-7 w-7 stroke-2.5 ${isOpen ? 'stroke-background' : 'stroke-accent'}`} as={Bolt} />
   </Button>
)

const SwitchItem = ({ action, title }) => (
   <ActionsheetItem onPress={action}>
      <ActionsheetItemText>{title}</ActionsheetItemText>
   </ActionsheetItem>
)
   
   /* {
   const Items = data.map((el:DataType) => el.role != 'org:admin' && (
      <ActionsheetItem key={el.id} onPress={() => handlePress(el.id)}>
         <ActionsheetItemText>{el.roleName}</ActionsheetItemText>
      </ActionsheetItem>
   ))
} */
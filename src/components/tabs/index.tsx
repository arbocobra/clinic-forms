import { StyleSheet, Text, View } from 'react-native';
import { Pressable } from '@/components/ui/pressable'
import type { TabTriggerSlotProps  } from 'expo-router/ui';
import type { LucideIcon } from 'lucide-react-native';
import { Icon } from '@/components/ui/icon';

export const CustomTopTabList = ({route = '', children}) => {
   // change to [route, names].includes(route) when list is >1
   const isHidden = route == 'create'
   
   if (isHidden) return null
   return ( //bg-background
      <View style={styles.topTabList} className='bg-card'>
         {children}
      </View>
   )
}

export const CustomBottomTabList = ({children}) => (
   <View style={styles.bottomTabList} className='bg-background'>
      {children}
   </View>
)

type CustomTabButtonProps = TabTriggerSlotProps & { label: string, icon?:LucideIcon };

export const CustomTopTabButton = ({ label, isFocused, ref: _ref, ...triggerProps }: CustomTabButtonProps) => ( // bg-card | bg-muted
   <Pressable {...triggerProps} style={styles.topTabButton} className={isFocused ? 'border-accent' : 'border-border'} >
      <Text className={`font-medium ${isFocused ? 'text-secondary-foreground' : 'text-muted-foreground'}`}>
         {label}
      </Text>
  </Pressable>
);
export const CustomBottomTabButton = ({ label, icon, isFocused, ref: _ref, ...triggerProps }: CustomTabButtonProps) => ( 
   <Pressable {...triggerProps} style={styles.bottomTabButton} className={isFocused ? 'bg-card text-accent' : 'bg-muted'} >
      <Icon size='xl' className={`stroke-[2.2] ${isFocused ? 'text-accent' : 'text-muted-foreground'}`} as={icon} />
      <Text className={`text-xs font-medium ${isFocused ? 'text-accent' : 'text-muted-foreground'}`}>
         {label}
      </Text>
  </Pressable>
);

// export const SwitchButton = ({action, isOpen}) => (
//    <Button onPress={action} size='lg' variant='secondary' className={`p-2 h-11 w-11 ml-2 mr-3 rounded-full ${isOpen && 'bg-accent'}`}>
//       <ButtonIcon className={`h-7 w-7 stroke-2.5 ${isOpen ? 'stroke-background' : 'stroke-accent'}`} as={Bolt} />
//    </Button>
// )

const styles = StyleSheet.create({
   topTabList: {
      flexDirection:'row',
      alignItems: 'center',
      justifyContent: 'space-around',
   },
   bottomTabList: {
      flexDirection:'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      // borderTopWidth:2,
      boxShadow: '0px -1px 10px -2px rgba(0,0,0,0.2)'
   },
   topTabButton: {
      alignItems:'center',
      justifyContent:'center',
      flex:1,
      height:50,
      paddingBottom:10,
      paddingTop:15,
      borderBottomWidth:2,
   },
   bottomTabButton: {
      alignItems:'center',
      justifyContent:'center',
      flex:1,
      paddingBottom:20,
      paddingTop:20,
   },
})
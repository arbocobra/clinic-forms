import { StyleSheet, Text, View } from 'react-native';
import { Pressable } from '@/components/ui/pressable'
import type { TabTriggerSlotProps  } from 'expo-router/ui';

export const CustomTopTabList = ({children}) => (
   <View style={styles.tabList} className='bg-background'>
      {children}
   </View>
)

type CustomTabButtonProps = TabTriggerSlotProps & { label: string };
export const CustomTopTabButton = ({ label, isFocused, ref: _ref, ...triggerProps }: CustomTabButtonProps) => ( 
   <Pressable {...triggerProps} style={styles.tabButton} className={isFocused ? 'bg-background border-accent text-accent' : 'bg-muted border-gray-200'} >
      <Text className={`font-medium ${isFocused ? 'text-secondary-foreground' : 'text-muted-foreground'}`}>
         {label}
      </Text>
  </Pressable>
);

const styles = StyleSheet.create({
   tabList: {
      flexDirection:'row',
      alignItems: 'center',
      justifyContent: 'space-around',
   },
   tabButton: {
      alignItems:'center',
      justifyContent:'center',
      flex:1,
      height:50,
      paddingBottom:10,
      paddingTop:15,
      borderBottomWidth:2,
   },
})
import { ScrollView, View } from 'react-native'
import { styles, colours } from '@/src/constants/styles'
import { ReactNode } from 'react'

type ContainerProps = { children: ReactNode }
export const Page = ({ children }:ContainerProps) => {
  return (
    <ScrollView style={colours.container} keyboardShouldPersistTaps='handled'>
      <View className={styles.container}>
        {children}
      </View>
    </ScrollView>
  )
}

export default Page;
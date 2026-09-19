import { Stack } from 'expo-router'
import TabWrapper from '@/src/app/(home)/(bottom-tabs)/_layout';

const Layout = () => {
   return (
            <Stack screenOptions={{title: 'Profile'}} />

   // <TabWrapper>
   //    <Stack screenOptions={{title: 'Profile'}} />
   //    </TabWrapper>
      )
}

export default Layout;
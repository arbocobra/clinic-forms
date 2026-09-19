import { useAuth, useClerk, useUser } from '@clerk/expo'
import { Link, Tabs } from 'expo-router'
import { ScrollView, Text, View } from 'react-native'
import { VStack } from '@/gluestack/vstack'
import { Heading } from '@/gluestack/heading'
import { Center } from '@/gluestack/center'
import { styles, colours } from '@/src/constants/styles'

export const Page = () => {
  const { user } = useUser()
  const { signOut } = useClerk()
  const { isLoaded, isSignedIn, orgRole } = useAuth()

  if (isLoaded && isSignedIn) {
    if (orgRole === 'org:practitioner_admin') {
      return (
        <PractitionerAdmin user={user} />
    )} else if (orgRole === 'org:practitioner_member') {
      return (
        <PractitionerMember user={user} />
    )} else if (orgRole === 'org:client') {
      return (
        <ClientUser user={user} />
    )} else {
      return (
        <View className={styles.container} style={colours.container}>
          <Text className={styles.text} style={colours.title}>User role not recognized</Text>
        </View>
      )
    }
  } else {
    return (
      <View className={styles.container} style={colours.container}>
        <Text className={styles.text} style={colours.title}>User not signed in</Text>
        <Link href="/(auth)/signin">
            <Text>Sign in</Text>
          </Link>
      </View>
    )
  }
}

const PractitionerAdmin = ({user}:any) => {
   return (
    <ScrollView style={colours.container} keyboardShouldPersistTaps='handled'>
      {/* <Tabs.Screen options={{ title: 'Home', headerShown: false, tabBarItemStyle: styles.tab }} /> */}
      <Center className={styles.container}>
        <VStack space='md'>
          <Heading size='xl' style={colours.title}>Welcome {user?.fullName}!</Heading>
          <Text className={styles.text} style={colours.text}>You are an admin-level practitioner</Text>
          <Text className={styles.text} style={colours.text}>You can create forms, read forms</Text>
        </VStack>
      </Center>
      {/* <QuestionContainer /> */}
    </ScrollView>
   )
}

const PractitionerMember = ({user}:any) => {
   return (
    <ScrollView style={colours.container} keyboardShouldPersistTaps='handled'>
      <Center className={styles.container}>
        <VStack space='md'>
          <Heading size='xl' style={colours.title}>Welcome {user?.fullName}!</Heading>
          <Text className={styles.text} style={colours.text}>You are an member-level practitioner</Text>
          <Text className={styles.text} style={colours.text}>You can read forms</Text>
        </VStack>
      </Center>
    </ScrollView>
   )
}
const ClientUser = ({user}:any) => {
   return (
    <ScrollView style={colours.container} keyboardShouldPersistTaps='handled'>
      <Center className={styles.container}>
        <VStack space='md'>
          <Heading size='xl' style={colours.title}>Welcome {user?.fullName}!</Heading>
          <Text className={styles.text} style={colours.text}>You are a client user</Text>
          <Text className={styles.text} style={colours.text}>You can submit forms</Text>
        </VStack>
      </Center>
    </ScrollView>
   )
}

export default Page;


  // const isAuth = isLoaded && isSignedIn;
  // const isPracticeAdmin = orgRole === 'org:practitioner_admin'
  // const isPracticeMember = orgRole === 'org:practitioner_member'
  // const isClient = orgRole === 'org:client'

  // if (isAuth) {

  //   if (isPracticeAdmin) return <PractitionerAdmin user={user} signOut={signOut} styles={styles} />

  //   else if (isPracticeMember) return <PractitionerMember user={user} signOut={signOut} styles={styles} />

  //   else if (isClient) return <ClientUser user={user} signOut={signOut} styles={styles} />

  //   else {
  //     return (
  //       <View className={styles.container} style={colours.container}>
  //         <Text className={styles.text} style={colours.title}>User role not recognized</Text>
  //       </View>
  //     )
  //   }
  // } else {
  //   return (
  //     <View className={styles.container} style={colours.container}>
  //       <Text className={styles.text} style={colours.title}>User not signed in</Text>
  //       <Link href="/(auth)/signin">
  //           <Text>Sign in</Text>
  //         </Link>
  //     </View>
  //   )
  // }
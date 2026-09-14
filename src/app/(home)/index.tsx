// import Form from '@/components/WidgetExample'
import QuestionContainer from '@/src/components/forms/Container'
import { useAuth, useClerk, useUser } from '@clerk/expo'
import { Link } from 'expo-router'
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'

export const Page = () => {
  const { user } = useUser()
  const { signOut } = useClerk()
  const { isLoaded, isSignedIn, orgRole } = useAuth()

  if (isLoaded && isSignedIn) {
    if (orgRole === 'org:practitioner_admin') {
      return <PractitionerAdmin user={user} signOut={signOut} />
    } else if (orgRole === 'org:practitioner_member') {
      return <PractitionerMember user={user} signOut={signOut} />
    } else if (orgRole === 'org:client') {
      return <ClientUser user={user} signOut={signOut} />
    } else {
      return (
        <View style={styles.container}>
          <Text style={styles.title}>User role not recognized</Text>
          <Pressable style={styles.button} onPress={() => signOut()}>
            <Text style={styles.buttonText}>Sign out</Text>
          </Pressable>
        </View>
      )
    }
  } else {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>User not signed in</Text>
        <Link href="/(auth)/signin">
            <Text>Sign in</Text>
          </Link>
      </View>
    )
  }
}

const PractitionerAdmin = ({user, signOut}:any) => {
   return (
    <ScrollView keyboardShouldPersistTaps='handled' className='flex-1 gap-3 pt-15 pb-10 pl-6 pr-6'>
      <QuestionContainer />
      {/* <Text style={styles.title}>Welcome!</Text>
      <Text>Hello {user?.fullName}</Text>
      <Text>You are an admin-level practitioner</Text>
      <Text>You can create forms, read forms</Text> */}
      <Text style={styles.linkText} onPress={() => signOut()}>Sign out</Text>
      {/* <Form /> */}
    </ScrollView>
   )
}
const PractitionerMember = ({user, signOut}:any) => {
   return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome!</Text>
      <Text>Hello {user?.fullName}</Text>
      <Text>You are an member-level practitioner</Text>
      <Text>You can read forms</Text>
      <Text style={styles.linkText} onPress={() => signOut()}>Sign out</Text>
    </View>
   )
}
const ClientUser = ({user, signOut}:any) => {
   return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome!</Text>
      <Text>Hello {user?.fullName}</Text>
      <Text>You are a client user</Text>
      <Text>You can submit forms</Text>
      <Text style={styles.linkText} onPress={() => signOut()}>Sign out</Text>
    </View>
   )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
    gap: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#0a7ea4',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  linkText: {
    color: 'blue',
    fontSize: 16
  }
})

export default Page;
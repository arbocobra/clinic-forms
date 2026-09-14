import { useSignUp, useUser } from '@clerk/expo'
import { type Href, Link, useLocalSearchParams, useRouter } from 'expo-router'
import { useState } from 'react'
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'

export const Page = () => {
   const { isSignedIn } = useUser()
  const { signUp, errors, fetchStatus } = useSignUp()
  const router = useRouter()
  
  const { __clerk_ticket: ticket } = useLocalSearchParams<{ __clerk_ticket?: string }>()

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
//   const [emailAddress, setEmailAddress] = useState('')
//   const [password, setPassword] = useState('')
//   const [code, setCode] = useState('')

  if (signUp.status === 'complete' || isSignedIn) {
    return null
  }

   if (!ticket) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          No invitation ticket found.
        </Text>
        <Link href="/">
          <Text>Go home</Text>
        </Link>
      </View>
    )
  }

  const handleSubmit = async () => {
   const { error } = await signUp.ticket({firstName, lastName, ticket})
   if (error) {
      console.error(JSON.stringify(error, null, 2))
      return
   }
   if (signUp.status === 'complete') {
      await signUp.finalize({
         navigate: ({ session, decorateUrl }) => {
            if (session?.currentTask) {
               console.log(session?.currentTask)
               return
            }
            const url = decorateUrl('/')
            if (url.startsWith('http')) {
               window.location.href = url
            } else {
               router.push(url as Href)
            }
         }
      })
   } else {
      console.error('Sign-up attempt not complete:', signUp)
   }
  }

  return (
   <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <Text style={styles.label}>First Name</Text>
      <TextInput
        style={styles.input}
        value={firstName}
        placeholder="Enter first name"
        placeholderTextColor="#666666"
        onChangeText={setFirstName}
        autoCapitalize="words"
      />
      {errors.fields.firstName && (
        <Text style={styles.error}>{errors.fields.firstName.message}</Text>
      )}
      <Text style={styles.label}>Last Name</Text>
      <TextInput
        style={styles.input}
        value={lastName}
        placeholder="Enter last name"
        placeholderTextColor="#666666"
        onChangeText={setLastName}
        autoCapitalize="words"
      />
      {errors.fields.lastName && (
        <Text style={styles.error}>{errors.fields.lastName.message}</Text>
      )}
      <Pressable 
         style={({ pressed }) => [
            styles.button,
            (!firstName || !lastName || fetchStatus === 'fetching') && styles.buttonDisabled,
            pressed && styles.buttonPressed,
         ]}
         onPress={handleSubmit}
        disabled={!firstName || !lastName || fetchStatus === 'fetching'} >
            <Text style={styles.buttonText}>Next</Text>
        </Pressable>
        {/* For your debugging purposes. You can just console.log errors, but we put them in the UI for convenience */}
      {errors && <Text style={styles.debug}>{JSON.stringify(errors, null, 2)}</Text>}

   </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 12,
  },
  title: {
    marginBottom: 8,
  },
  label: {
    fontWeight: '600',
    fontSize: 14,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#0a7ea4',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonPressed: {
    opacity: 0.7,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  linkContainer: {
    flexDirection: 'row',
    gap: 4,
    marginTop: 12,
    alignItems: 'center',
  },
  error: {
    color: '#d32f2f',
    fontSize: 12,
    marginTop: -8,
  },
  debug: {
    fontSize: 10,
    opacity: 0.5,
    marginTop: 8,
  },
  captchaContainer: {
    minHeight: 1,
  },
})

export default Page;
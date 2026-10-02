import { useClerk, useSignIn } from '@clerk/expo'
import { type Href, useRouter, Stack } from 'expo-router'
import { useState, useEffect } from 'react'
import { Pressable, StyleSheet, TextInput, View } from 'react-native'
import { Container } from '@/components/custom/wrapper'
import { Input, InputField } from '@/components/ui/input'
import {FormControl, FormControlError, FormControlErrorIcon, FormControlErrorText, FormControlLabel, FormControlLabelText} from '@/components/ui/form-control'
import { useForm, Controller } from 'react-hook-form';
import type { LogIn, Verify } from '@/src/types';
import { CircleAlert, LogIn as LogInIcon } from 'lucide-react-native';
import { Button, ButtonText, ButtonSpinner, ButtonIcon } from '@/components/ui/button';
import { Text } from '@/components/custom/text'

export const Page = () => {
  const { signIn, fetchStatus } = useSignIn()
  const router = useRouter()

  const onSubmit = async (data:LogIn) => {
    const { emailAddress, password } = data
    const { error } = await signIn.password({ emailAddress, password })
    if (error) {
      console.error(JSON.stringify(error, null, 2))
      return
    }
    if (signIn.status === 'complete') {
      await signIn.finalize({
        navigate: ({ session, decorateUrl }) => {
          if (session?.currentTask) {
            console.log('Submit CURRENT TASK: ', session?.currentTask) // temp
            return
          }
          // const memberships = session.user?.organizationMemberships
          // if (memberships && memberships.length > 1) {
          //   console.log('multi memberships')
          //   const url = decorateUrl('/organization-selection')
          //   router.push(url as Href)
          // }
          const url = decorateUrl('/')
          // router.push(url as Href)
          router.replace(url as Href)
        }
      })
    } else if (signIn.status === 'needs_client_trust') {
      const emailCodeFactor = signIn.supportedSecondFactors.find((factor) => factor.strategy === 'email_code')
      if (emailCodeFactor) {
        await signIn.mfa.sendEmailCode()
      }
    } else {
      console.error('Sign-in attempt not complete:', signIn)
    }
  }

  const onVerify = async (data:Verify) => {
    const { code } = data
    await signIn.mfa.verifyEmailCode({ code })

    if (signIn.status === 'complete') {
      await signIn.finalize({
        navigate: ({ session, decorateUrl }) => {
          // console.log('Verify SESSION:') // temp
          // console.log(JSON.stringify(session, null, 2)) // temp
          if (session?.currentTask) {
            console.log('Verify CURRENT TASK: ', session?.currentTask) // temp
            return
          }
          const url = decorateUrl('/')
          // router.push(url as Href)
          router.replace(url as Href)
        }
      })
    } else {
      console.error('Sign-in attempt not complete:', signIn)
    }
  }

  // useEffect(() => {
  //   console.log(signIn.status)
  // }, [signIn.status])

  return (
    <>
      <Stack.Screen options={{title:'Sign In'}} />
      { signIn?.status === 'needs_client_trust' ?
        <VerifyForm verify={onVerify} fetchStatus={fetchStatus} /> :
        <SigninForm submit={onSubmit} fetchStatus={fetchStatus} />
      }
    </>
  )
}

const SigninForm = ({submit, fetchStatus}) => {
  const { handleSubmit, control } = useForm<LogIn>({defaultValues: { emailAddress: '', password:''}})

  return (
    <Container>
      <Controller
        name='emailAddress'
        control={control}
        rules={{ pattern:{ value:/^\w*?\+\w*@\w*\..*/, message: 'Must be valid email'}}}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <FormControl isRequired isInvalid={!!error}>
            <FormControlLabel>
              <FormControlLabelText className=''>Email Address</FormControlLabelText>
            </FormControlLabel>
            <Input className='' >
              <InputField placeholder='Enter email' value={value} onChangeText={onChange} keyboardType='email-address' autoCapitalize='none' />
            </Input>
            <Error error={error} />
        </FormControl>
        )}
      />
      <Controller
        name='password'
        control={control}
        rules={{ minLength: { value: 15, message: 'Minimum password length is 15 characters'}}}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <FormControl isRequired isInvalid={!!error}>
            <FormControlLabel>
              <FormControlLabelText className=''>Password</FormControlLabelText>
            </FormControlLabel>
            <Input className=''>
              <InputField 
                placeholder='Enter password' 
                value={value} 
                onChangeText={onChange} 
                autoCapitalize='none'
                autoCorrect={false}
                autoComplete='off'
                secureTextEntry={true}
              />
            </Input>
            <Error error={error} />
        </FormControl>
        )}
      />
      <Button size='lg' onPress={handleSubmit(submit)}>
        { fetchStatus === 'fetching' && <ButtonSpinner /> }
        <ButtonText className=''>Continue</ButtonText>
        <ButtonIcon as={LogInIcon} />
      </Button>
    </Container>
  )
}

const VerifyForm = ({verify, fetchStatus}) => {
  const { handleSubmit, control } = useForm<Verify>({defaultValues: { code: ''}})

  return (
    <Container>
      <Controller
        name='code'
        rules={{ pattern:{ value:/^\d{6}$/, message: 'Must be 6 digits'}}}
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <FormControl isRequired isInvalid={!!error}>
            <FormControlLabel>
              <FormControlLabelText className=''>Verification Code</FormControlLabelText>
            </FormControlLabel>
            <Input className=''>
              <InputField 
                placeholder='Enter code' 
                value={value} 
                onChangeText={onChange} 
                autoCapitalize='none'
                autoCorrect={false}
                autoComplete='off'
                secureTextEntry={true} />
            </Input>
            <Error error={error} />
        </FormControl>
        )}
      />
      <Button size='lg' onPress={handleSubmit(verify)}>
        { fetchStatus === 'fetching' && <ButtonSpinner /> }
        <ButtonText className=''>Continue</ButtonText>
        <ButtonIcon as={LogInIcon} />
      </Button>
    </Container>
  )
}

const Error = ({error}) => {
   return (
      <FormControlError>
         <FormControlErrorIcon as={CircleAlert} /> 
         <FormControlErrorText>{error?.message}</FormControlErrorText>
      </FormControlError>
   )
}

const organizationMemberships = {
  "pathRoot": "/me",
  "id": "user_3J5zIaXHWJebKlstEgtjg2HFCcV",
  "externalId": null,
  "username": null,
  "emailAddresses": [
    {
      "pathRoot": "/me/email_addresses",
      "emailAddress": "someone+clerk_test@example.com",
      "matchesSsoConnection": false,
      "linkedTo": [],
      "id": "idn_3J5zCugZss0SEutNTxkoQ1UiBr2",
      "verification": {
        "pathRoot": "",
        "status": "verified",
        "strategy": "email_code",
        "nonce": null,
        "message": null,
        "externalVerificationRedirectURL": null,
        "attempts": 1,
        "expireAt": "2026-09-09T15:03:12.732Z",
        "error": null
      }
    }
  ],
  "phoneNumbers": [],
  "web3Wallets": [],
  "externalAccounts": [],
  "enterpriseAccounts": [],
  "passkeys": [],
  "organizationMemberships": [
    {
      "pathRoot": "",
      "publicMetadata": {},
      "permissions": [
        "org:sys_domains:read"
      ],
      "id": "orgmem_3J6SbloERtxLX5ZgvUouJ0Bqdw0",
      "organization": {
        "pathRoot": "/organizations",
        "publicMetadata": {},
        "membersCount": 2,
        "pendingInvitationsCount": 0,
        "selfServeSSOEnabled": false,
        "exclusiveMembership": false,
        "id": "org_3J6SbpkzebsQXilUixJFfPMitEq",
        "name": "Client",
        "slug": "client-1788980098654461938",
        "imageUrl": "https://img.clerk.com/eyJ0eXBlIjoiZGVmYXVsdCIsImlpZCI6Imluc18zSjNHNnJvS3RSRXNxSWNXSnJlV0ltTWdOVEYiLCJyaWQiOiJvcmdfM0o2U2Jwa3plYnNRWGlsVWl4SkZmUE1pdEVxIiwiaW5pdGlhbHMiOiJDIn0",
        "hasImage": false,
        "maxAllowedMemberships": 5,
        "adminDeleteEnabled": true,
        "createdAt": "2026-09-09T18:54:58.657Z",
        "updatedAt": "2026-10-01T18:01:05.293Z"
      },
      "role": "org:client",
      "roleName": "Client",
      "createdAt": "2026-09-09T18:54:58.679Z",
      "updatedAt": "2026-10-01T18:15:03.016Z"
    },
    {
      "pathRoot": "",
      "publicMetadata": {},
      "permissions": [
        "org:forms:write_forms",
        "org:sys_domains:manage",
        "org:sys_domains:read",
        "org:sys_memberships:manage",
        "org:sys_memberships:read",
        "org:sys_profile:manage",
        "org:sys_billing:manage",
        "org:sys_billing:read",
        "org:forms:read_forms"
      ],
      "id": "orgmem_3J6SZkBioFGX8alaU34EmRrnRW9",
      "organization": {
        "pathRoot": "/organizations",
        "publicMetadata": {},
        "membersCount": 3,
        "pendingInvitationsCount": 0,
        "selfServeSSOEnabled": false,
        "exclusiveMembership": false,
        "id": "org_3J6SZkiIph36uCn6ba0nmQrYfEG",
        "name": "Practitioner",
        "slug": "practitioner-1788980082286086149",
        "imageUrl": "https://img.clerk.com/eyJ0eXBlIjoiZGVmYXVsdCIsImlpZCI6Imluc18zSjNHNnJvS3RSRXNxSWNXSnJlV0ltTWdOVEYiLCJyaWQiOiJvcmdfM0o2U1praUlwaDM2dUNuNmJhMG5tUXJZZkVHIiwiaW5pdGlhbHMiOiJQIn0",
        "hasImage": false,
        "maxAllowedMemberships": 5,
        "adminDeleteEnabled": true,
        "createdAt": "2026-09-09T18:54:42.290Z",
        "updatedAt": "2026-10-01T12:20:08.005Z"
      },
      "role": "org:practitioner_admin",
      "roleName": "Practitioner Admin",
      "createdAt": "2026-09-09T18:54:42.318Z",
      "updatedAt": "2026-10-01T18:15:00.351Z"
    },
    {
      "pathRoot": "",
      "publicMetadata": {},
      "permissions": [
        "org:sys_domains:manage",
        "org:sys_domains:read",
        "org:sys_memberships:manage",
        "org:sys_memberships:read",
        "org:sys_profile:delete",
        "org:sys_profile:manage",
        "org:sys_entconns:manage",
        "org:sys_billing:manage",
        "org:sys_billing:read",
        "org:forms:read_forms",
        "org:forms:write_forms"
      ],
      "id": "orgmem_3J6HCVa7vKjliTKLRMJlYEhG4L5",
      "organization": {
        "pathRoot": "/organizations",
        "publicMetadata": {},
        "membersCount": 1,
        "pendingInvitationsCount": 0,
        "selfServeSSOEnabled": false,
        "exclusiveMembership": false,
        "id": "org_3J6HCatz8WBmXhGjZPRzmP5GwDX",
        "name": "Initial",
        "slug": "initial-1788974470156045384",
        "imageUrl": "https://img.clerk.com/eyJ0eXBlIjoiZGVmYXVsdCIsImlpZCI6Imluc18zSjNHNnJvS3RSRXNxSWNXSnJlV0ltTWdOVEYiLCJyaWQiOiJvcmdfM0o2SENhdHo4V0JtWGhHalpQUnptUDVHd0RYIiwiaW5pdGlhbHMiOiJJIn0",
        "hasImage": false,
        "maxAllowedMemberships": 5,
        "adminDeleteEnabled": true,
        "createdAt": "2026-09-09T17:21:10.159Z",
        "updatedAt": "2026-09-09T17:21:10.159Z"
      },
      "role": "org:admin",
      "roleName": "Admin",
      "createdAt": "2026-09-09T17:21:10.180Z",
      "updatedAt": "2026-09-09T17:21:10.180Z"
    }
  ],
  "passwordEnabled": true,
  "firstName": "Natalie",
  "lastName": "R",
  "fullName": "Natalie R",
  "primaryEmailAddressId": "idn_3J5zCugZss0SEutNTxkoQ1UiBr2",
  "primaryEmailAddress": {
    "pathRoot": "/me/email_addresses",
    "emailAddress": "someone+clerk_test@example.com",
    "matchesSsoConnection": false,
    "linkedTo": [],
    "id": "idn_3J5zCugZss0SEutNTxkoQ1UiBr2",
    "verification": {
      "pathRoot": "",
      "status": "verified",
      "strategy": "email_code",
      "nonce": null,
      "message": null,
      "externalVerificationRedirectURL": null,
      "attempts": 1,
      "expireAt": "2026-09-09T15:03:12.732Z",
      "error": null
    }
  },
  "primaryPhoneNumberId": null,
  "primaryPhoneNumber": null,
  "primaryWeb3WalletId": null,
  "primaryWeb3Wallet": null,
  "imageUrl": "https://img.clerk.com/eyJ0eXBlIjoiZGVmYXVsdCIsImlpZCI6Imluc18zSjNHNnJvS3RSRXNxSWNXSnJlV0ltTWdOVEYiLCJyaWQiOiJ1c2VyXzNKNXpJYVhIV0plYktsc3RFZ3RqZzJIRkNjViIsImluaXRpYWxzIjoiTlIifQ",
  "hasImage": false,
  "twoFactorEnabled": false,
  "totpEnabled": false,
  "backupCodeEnabled": false,
  "publicMetadata": {},
  "unsafeMetadata": {},
  "createOrganizationEnabled": true,
  "createOrganizationsLimit": null,
  "deleteSelfEnabled": true,
  "lastSignInAt": "2026-10-01T18:15:30.485Z",
  "legalAcceptedAt": null,
  "updatedAt": "2026-10-01T18:15:30.487Z",
  "createdAt": "2026-09-09T14:53:57.416Z",
  "cachedSessionsWithActivities": null
}

export default Page;

/** OLD * 
 
 const onSubmit = async () => {
    const { error } = await signIn.password({
      emailAddress,
      password,
    })
    if (error) {
      console.error(JSON.stringify(error, null, 2))
      return
    }

    if (signIn.status === 'complete') {
      await signIn.finalize({
        navigate: ({ session, decorateUrl }) => {
          console.log(session)
          if (session?.currentTask) {
            // Handle pending session tasks
            // See https://clerk.com/docs/guides/development/custom-flows/authentication/session-tasks
            console.log(session?.currentTask)
            return
          }

          const url = decorateUrl('/')
          if (url.startsWith('http')) {
            window.location.href = url
          } else {
            router.push(url as Href)
          }
        },
      })
    } else if (signIn.status === 'needs_client_trust') {
      // For other second factor strategies,
      // see https://clerk.com/docs/guides/development/custom-flows/authentication/device-trust
      const emailCodeFactor = signIn.supportedSecondFactors.find((factor) => factor.strategy === 'email_code')

      if (emailCodeFactor) {
        await signIn.mfa.sendEmailCode()
      }
    } else {
      // Check why the sign-in is not complete
      console.error('Sign-in attempt not complete:', signIn)
    }
  }

  *Form*

  <View style={styles.container}>
    <Text style={styles.title}>
      Sign in Test
    </Text>

    <Text style={styles.label}>Email address</Text>
    <TextInput
      style={styles.input}
      autoCapitalize="none"
      value={emailAddress}
      placeholder="Enter email"
      placeholderTextColor="#666666"
      onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
      keyboardType="email-address"
    />
    {errors.fields.identifier && (
      <Text style={styles.error}>{errors.fields.identifier.message}</Text>
    )}
    <Text style={styles.label}>Password</Text>
    <TextInput
      style={styles.input}
      value={password}
      placeholder="Enter password"
      placeholderTextColor="#666666"
      secureTextEntry={true}
      onChangeText={(password) => setPassword(password)}
    />
    {errors.fields.password && (
      <Text style={styles.error}>{errors.fields.password.message}</Text>
    )}
    <Pressable
      style={({ pressed }) => [
        styles.button,
        (!emailAddress || !password || fetchStatus === 'fetching') && styles.buttonDisabled,
        pressed && styles.buttonPressed,
      ]}
      onPress={handleSubmit}
      disabled={!emailAddress || !password || fetchStatus === 'fetching'}
    >
      <Text style={styles.buttonText}>Continue</Text>
    </Pressable>
    <Pressable style={styles.button} onPress={() => signOut()}>
        <Text style={styles.buttonText}>Sign out</Text>
    </Pressable>

    {errors && <Text style={styles.debug}>{JSON.stringify(errors, null, 2)}</Text>}
  </View>

  *Verify Form* 
    if (signIn.status === 'needs_client_trust') {
    return (
      <View style={styles.container}>
        <Text style={[styles.title, { fontSize: 24, fontWeight: 'bold' }]}>Verify your account</Text>
        <TextInput
          style={styles.input}
          value={code}
          placeholder="Enter your verification code"
          placeholderTextColor="#666666"
          onChangeText={(code) => setCode(code)}
          keyboardType="numeric"
        />
        {errors.fields.code && <Text style={styles.error}>{errors.fields.code.message}</Text>}
        <Pressable
          style={({ pressed }) => [
            styles.button,
            fetchStatus === 'fetching' && styles.buttonDisabled,
            pressed && styles.buttonPressed,
          ]}
          onPress={handleVerify}
          disabled={fetchStatus === 'fetching'}
        >
          <Text style={styles.buttonText}>Verify</Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [styles.secondaryButton, pressed && styles.buttonPressed]}
          onPress={() => signIn.mfa.sendEmailCode()}
        >
          <Text style={styles.secondaryButtonText}>I need a new code</Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [styles.secondaryButton, pressed && styles.buttonPressed]}
          onPress={() => signIn.reset()}
        >
          <Text style={styles.secondaryButtonText}>Start over</Text>
        </Pressable>
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
    secondaryButton: {
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 8,
      alignItems: 'center',
      marginTop: 8,
    },
    secondaryButtonText: {
      color: '#0a7ea4',
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
  })

*/
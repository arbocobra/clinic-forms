import { Radio, RadioGroup, RadioIcon, RadioIndicator, RadioLabel } from '@/components/ui/radio';
import { CircleIcon } from '@/components/ui/icon';
import { Input, InputField, InputIcon, InputSlot } from '@/components/ui/input';
import { SearchIcon } from '@/components/ui/icon';
import { Icon } from '@/components/ui/icon';
import { Checkbox, CheckboxIcon, CheckboxIndicator, CheckboxLabel } from '@/components/ui/checkbox';
import { VStack } from '@/components/ui/vstack';
import { Button, ButtonText, ButtonIcon } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { ScrollView, Appearance, Text, useColorScheme } from 'react-native';
import { Card } from '@/components/ui/card';
import { Check, CirclePlus, SquarePen } from 'lucide-react-native';
import { HStack } from '@/components/ui/hstack';
import { Center } from '@/components/ui/center';
import { Spinner } from '@/components/ui/spinner';

export const Page = () => {
  const current = useColorScheme()

  const toggleTheme = () => {
    Appearance.setColorScheme(
      Appearance.getColorScheme() === 'dark' ? 'light' : 'dark'
    )
  }

  if (!current) {
    return <Text>Loading...</Text>
  }

  return (
  <ScrollView keyboardShouldPersistTaps='handled'>
    <VStack space='md' className='p-5 items-center bg-secondary'>
      <Card>
        <Heading size={"md"}>Theme: {current}</Heading>
        <Text>Non GS text in here</Text>
      </Card>
      <Button size='lg' onPress={toggleTheme} isDisabled={false}>
        <ButtonText>Toggle Colour</ButtonText>
      </Button>
      <Button variant='secondary' size='default' isDisabled={false}>
        <ButtonIcon as={CirclePlus} />
        <ButtonText>Secondary Button</ButtonText>
      </Button>
      <Checkbox isDisabled={false} isInvalid={false} value="checkbox-id">
        <CheckboxIndicator>
          <CheckboxIcon as={Check} />
        </CheckboxIndicator>
        <CheckboxLabel>Checkbox Label</CheckboxLabel>
      </Checkbox>
      <Icon as={SquarePen} size={"lg"} />
      <Input isInvalid={false} isDisabled={false}>
        <InputField value='' placeholder="Enter Text here" />
        <InputSlot className='pr-4'>
          <InputIcon as={SearchIcon} />
        </InputSlot>
      </Input>
      <RadioGroup value='two'>
        <HStack space='md'>
          <Radio isInvalid={false} isDisabled={true} value='one' aria-label="Radio">
            <RadioIndicator>
              <RadioIcon as={CircleIcon} />
            </RadioIndicator>
            <RadioLabel>Disabled Radio</RadioLabel>
          </Radio>
          <Radio isInvalid={false} isDisabled={false} value='two' aria-label="Radio">
            <RadioIndicator>
              <RadioIcon as={CircleIcon} />
            </RadioIndicator>
            <RadioLabel>Regular Radio</RadioLabel>
          </Radio>
        </HStack>
      </RadioGroup>
      <RadioGroup value='one' isReadOnly={true}>
        <HStack space='md'>
          <Radio isInvalid={false} isDisabled={false} value='one' aria-label="Radio">
            <RadioIndicator>
              <RadioIcon as={CircleIcon} />
            </RadioIndicator>
            <RadioLabel>Read Only Group</RadioLabel>
          </Radio>
          <Radio isInvalid={false} isDisabled={false} value='two' aria-label="Radio">
            <RadioIndicator>
              <RadioIcon as={CircleIcon} />
            </RadioIndicator>
            <RadioLabel>Label</RadioLabel>
          </Radio>
        </HStack>
      </RadioGroup>
      <HStack space='md' className='flex-wrap'>
        <Box val={'primary'} text={'primary-foreground'} />
        <Box val={'secondary'} text={'secondary-foreground'} />
        <Box val={'background'} text={'foreground'} />
        <Box val={'popover'} text={'popover-foreground'} />
        <Box val={'muted'} text={'muted-foreground'} />
        <Box val={'accent'} text={'accent-foreground'} />
        <Box val={'card'} text={'primary'} />
        <Box val={'destructive'} text={null} />
        <Box val={'input'} text={null} />
        <Box val={'border'} text={null} />
        <Box val={'ring'} text={null} />
        <Box val={'extra'} text={null} />

        {/* <Box val={'primary'} text={'primary-foreground'} />
        <Box val={'primary-foreground'} text={'primary'} />
        <Box val={'card'} text={'primary'} />
        <Box val={'secondary'} text={'secondary-foreground'} />
        <Box val={'secondary-foreground'} text={'secondary'} />
        <Box val={'destructive'} text={null} />
        <Box val={'background'} text={'foreground'} />
        <Box val={'foreground'} text={'background'} />
        <Box val={'input'} text={null} />
        <Box val={'popover'} text={'popover-foreground'} />
        <Box val={'popover-foreground'} text={'popover'} />
        <Box val={'border'} text={null} />
        <Box val={'muted'} text={'muted-foreground'} />
        <Box val={'muted-foreground'} text={'muted'} />
        <Box val={'ring'} text={null} />
        <Box val={'accent'} text={'accent-foreground'} />
        <Box val={'accent-foreground'} text={'accent'} /> */}
      </HStack>

    </VStack>
  </ScrollView>
  )
};
export default Page;

const Box = ({val, text}) => {
  const bStyle = `h-20 w-30 justify-center items-center bg-${val}`
  const textStyle = text ? `text-${text} text-center` : 'text-primary text-center'
  return (
    <VStack className={bStyle}>
      <Text className={textStyle}>{text ? val : `${val} *`}</Text>
    </VStack>
  )
}
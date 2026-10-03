import { Radio, RadioGroup, RadioIcon, RadioIndicator, RadioLabel } from '@ui/radio';
import { CircleIcon } from '@ui/icon';
import { Input, InputField, InputIcon, InputSlot } from '@ui/input';
import { SearchIcon } from '@ui/icon';
import { Icon } from '@ui/icon';
import { Checkbox, CheckboxIcon, CheckboxIndicator, CheckboxLabel } from '@ui/checkbox';
import { VStack } from '@ui/vstack';
import { Heading } from '@ui/heading';
import { Text as DefaultText } from 'react-native';
import { Card } from '@ui/card';
import { Check, CirclePlus, SquarePen } from 'lucide-react-native';
import { HStack } from '@ui/hstack';
import { useAppTheme } from '@/src/contexts/app-theme-context';
import { Text } from '@components/text';
import { Container } from '@components/wrappers';
import { Button, AccentButton, TextIconButton } from '@components/buttons';

export const Page = () => {
  const { resolvedColorMode, toggleColorMode, currentTheme } = useAppTheme()

  return (
    <Container>
      <Card className='w-full items-center'>
        <Heading size={"md"}>Colour Mode: {resolvedColorMode}</Heading>
        <Heading size={"md"}>Theme: {currentTheme}</Heading>
        <Text>Custom text in here</Text>
        <DefaultText>Non GS text in here</DefaultText>
      </Card>
      <Button className='self-center' onPress={toggleColorMode} label='Toggle Colour' />
      <AccentButton onPress={() => { console.log('bip') }} label='Accent Button' />
      <TextIconButton onPress={() => { console.log('bop') }} icon={CirclePlus} position='left' label='Icon Button' />
      <Button onPress={() => { console.log('boop') }} variant='outline' size='default' label='Variant' />
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
        <Box val={'card'} text={null} />
        <Box val={'destructive'} text={null} />
        <Box val={'input'} text={null} />
        <Box val={'border'} text={null} />
        <Box val={'ring'} text={null} />

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

    </Container>
  )
};
export default Page;

const Box = ({ val, text }) => {
  const bStyle = `h-20 basis-30 grow-1 shrink-1 justify-center items-center bg-${val}`
  const textStyle = text ? `text-${text} text-center text-base` : 'text-primary text-center text-base'
  return (
    <VStack className={bStyle}>
      <DefaultText className={textStyle}>{text ? val : `${val} *`}</DefaultText>
    </VStack>
  )
}
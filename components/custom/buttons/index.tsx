import { Button as GSButton, ButtonText, ButtonIcon } from '@/components/ui/button';
import type { PressableProps  } from 'react-native';
import type { LucideIcon } from 'lucide-react-native';

interface DefaultButtonProps extends PressableProps {
   label:string,
   size?: 'default' | 'sm' | 'lg' | 'icon' | undefined,
   variant?: 'default' | 'link' | 'destructive' | 'outline' | 'secondary' | 'ghost' | undefined,
   className?: string
}
type TextIconButtonProps = DefaultButtonProps & { icon:LucideIcon, position: 'left' | 'right' }
type IconButtonProps = Omit<TextIconButtonProps, 'label' | 'position'> 

export const Button = ({ label, size='lg', variant='default', onPress, className }:DefaultButtonProps) => (
   <GSButton variant={variant} className={`py-3 ${className}`} size={size} onPress={onPress} isDisabled={false}>
      <ButtonText className='font-medium'>{label}</ButtonText>
   </GSButton>
)

export const AccentButton = ({ label, size='lg', onPress, className }:DefaultButtonProps) => (
   <GSButton className={`bg-accent py-3 ${className}`} size={size} onPress={onPress} isDisabled={false}>
      <ButtonText className='font-medium'>{label}</ButtonText>
   </GSButton>
)

export const IconButton = ({ size='lg', onPress, variant='default', icon, className }:IconButtonProps) => (
   <GSButton className={`py-3 px-6 ${className}`} variant={variant} size={size} onPress={onPress} isDisabled={false}>
      <ButtonIcon as={icon} />
   </GSButton>
)

export const TextIconButton = ({ label, size='lg', onPress, icon, position, className }:TextIconButtonProps) => (
   <GSButton className={`py-3 px-6 ${className}`} size={size} onPress={onPress} isDisabled={false}>
      { position == 'left' && <ButtonIcon as={icon} /> }
      <ButtonText className='font-medium'>{label}</ButtonText>
      { position == 'right' && <ButtonIcon as={icon} /> }
   </GSButton>
)
import { Text as DefaultText, TextProps as DefaultTextProps } from 'react-native';

interface TextProps extends DefaultTextProps {
   className?: string
}

export const Text = ({ children, className, ...props }:TextProps) => {
   return (
   <DefaultText className={`text-primary text-base ${className}`} {...props} >
      { children }
   </DefaultText>
   )
}
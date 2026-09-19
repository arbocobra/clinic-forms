import { StyleSheet, useColorScheme } from 'react-native'

export const colourMode = useColorScheme();
const colourScheme = {
   dark: {
      primeFore: 'rgb(250, 250, 250)', // more white
      primeBack: 'rgb(38, 38, 38)', // less black
      secondFore: 'rgb(245, 245, 245)', // less white
      secondBack: 'rgb(23, 23, 23)' // more black
   },
   light: {
      primeFore: 'rgb(23, 23, 23)', // more black
      primeBack: 'rgb(245, 245, 245)', // less white
      secondFore: 'rgb(38, 38, 38)', // less black
      secondBack: 'rgb(250, 250, 250)' // more white
   }
}
const createColours = (themeColors) =>
  StyleSheet.create({
    container: {
      backgroundColor: themeColors.primeBack,
    },
    text: {
      color: themeColors.primeFore,
    },
    title: {
      color: themeColors.primeFore
    },
    buttonTeal: {
      backgroundColor: '#009689',
      color: 'rgb(250, 250, 250)',
    },
    buttonText: {
      color: 'rgb(250, 250, 250)',
    }
})
export const headerStyles = {
    bg: colourScheme[colourMode].secondBack,
    tint: colourScheme[colourMode].secondFore
}
export const styles = {
  container: 'flex-1 pt-15 pb-5 pl-5 pr-5',
  text: 'text-lg',
  title: '',
  button: 'mt-3',
  buttonText: 'font-medium text-md',
}

export const colours = createColours(colourScheme[colourMode])
const theme = {
   default: {
      name:'default',
      light: {
         'primary': 'rgb(23, 23, 23)',
         'primary-foreground': 'rgb(250, 250, 250)',
         'card': 'rgb(255, 255, 255)',
         'secondary': 'rgb(245, 245, 245)',
         'secondary-foreground': 'rgb(23, 23, 23)',
         'background': 'rgb(255, 255, 255)',
         'popover': 'rgb(255, 255, 255)',
         'popover-foreground': 'rgb(10, 10, 10)',
         'muted': 'rgb(245, 245, 245)',
         'muted-foreground': 'rgb(115, 115, 115)',
         'destructive': 'rgb(231, 0, 11)',
         'foreground': 'rgb(10, 10, 10)',
         'border': 'rgb(229, 229, 229)',
         'input': 'rgb(229, 229, 229)',
         'ring': 'rgb(212, 212, 212)',
         'accent': 'rgb(247, 247, 247)',
         'accent-foreground': 'rgb(52, 52, 52)',
      },
      dark: {
         'primary': 'rgb(255, 245, 245)',
         'primary-foreground': 'rgb(23, 23, 23)',
         'card': 'rgb(23, 23, 23)',
         'secondary': 'rgb(38, 38, 38)',
         'secondary-foreground': 'rgb(250, 250, 250)',
         'background': 'rgb(10, 10, 10)',
         'popover': 'rgb(23, 23, 23)',
         'popover-foreground': 'rgb(250, 250, 250)',
         'muted': 'rgb(38, 38, 38)',
         'muted-foreground': 'rgb(161, 161, 161)',
         'destructive': 'rgb(255, 100, 103)',
         'foreground': 'rgb(250, 250, 250)',
         'border': 'rgb(46, 46, 46)',
         'input': 'rgb(46, 46, 46)',
         'accent': 'rgb(38, 38, 38)',
         'accent-foreground': 'rgb(250, 250, 250)',
         'ring': 'rgb(115, 115, 115)',
      }
   },
   test: {
      name: 'test',
      light: {
         'primary': 'rgb(255, 163, 186)', //pink
         'primary-foreground': 'rgb(0, 25, 84)', //dark blue
         'card': 'rgb(255, 255, 255)', 
         'secondary': 'rgb(254, 255, 224)',  //light yellow
         'secondary-foreground': 'rgb(18, 117, 59)', //green
         'background': 'rgb(255, 255, 255)',
         'popover': 'rgb(255, 255, 255)',
         'popover-foreground': 'rgb(10, 10, 10)',
         'muted': 'rgb(245, 245, 245)',
         'muted-foreground': 'rgb(115, 115, 115)',
         'destructive': 'rgb(231, 0, 11)',
         'foreground': 'rgb(10, 10, 10)',
         'border': 'rgb(229, 229, 229)',
         'input': 'rgb(229, 229, 229)',
         'ring': 'rgb(212, 212, 212)',
         'accent': 'rgb(247, 247, 247)',
         'accent-foreground': 'rgb(52, 52, 52)',
      },
      dark: {
         'primary': 'rgb(255, 5, 67)', //red
         'primary-foreground': 'rgb(135, 171, 255)', //light blue
         'card': 'rgb(23, 23, 23)',
         'secondary': 'rgb(224, 172, 0)', //amber
         'secondary-foreground': 'rgb(214, 79, 255)', //purple
         'background': 'rgb(10, 10, 10)',
         'popover': 'rgb(23, 23, 23)',
         'popover-foreground': 'rgb(250, 250, 250)',
         'muted': 'rgb(38, 38, 38)',
         'muted-foreground': 'rgb(161, 161, 161)',
         'destructive': 'rgb(255, 100, 103)',
         'foreground': 'rgb(250, 250, 250)',
         'border': 'rgb(46, 46, 46)',
         'input': 'rgb(46, 46, 46)',
         'accent': 'rgb(38, 38, 38)',
         'accent-foreground': 'rgb(250, 250, 250)',
         'ring': 'rgb(115, 115, 115)',
      }
   },
   custom: {
      name:'custom',
      light: {
         'primary': 'rgb(23, 23, 23)',
         'primary-foreground': 'rgb(250, 250, 250)',
         'card': 'rgb(255, 255, 255)',
         'secondary': 'rgb(245, 245, 245)',
         'secondary-foreground': 'rgb(23, 23, 23)',
         'background': 'rgb(255, 255, 255)',
         'popover': 'rgb(255, 255, 255)',
         'popover-foreground': 'rgb(10, 10, 10)',
         'muted': 'rgb(245, 245, 245)',
         'muted-foreground': 'rgb(115, 115, 115)',
         'destructive': 'rgb(231, 0, 11)',
         'foreground': 'rgb(10, 10, 10)',
         'border': 'rgb(229, 229, 229)',
         'input': 'rgb(229, 229, 229)',
         'ring': 'rgb(212, 212, 212)',
         'accent': 'rgb(0, 146, 184)', //teal
         'accent-foreground': 'rgb(52, 52, 52)',
      },
      dark: {
         'primary': 'rgb(255, 245, 245)',
         'primary-foreground': 'rgb(23, 23, 23)',
         'card': 'rgb(23, 23, 23)',
         'secondary': 'rgb(38, 38, 38)',
         'secondary-foreground': 'rgb(250, 250, 250)',
         'background': 'rgb(10, 10, 10)',
         'popover': 'rgb(23, 23, 23)',
         'popover-foreground': 'rgb(250, 250, 250)',
         'muted': 'rgb(38, 38, 38)',
         'muted-foreground': 'rgb(161, 161, 161)',
         'destructive': 'rgb(255, 100, 103)',
         'foreground': 'rgb(250, 250, 250)',
         'border': 'rgb(46, 46, 46)',
         'input': 'rgb(46, 46, 46)',
         'accent': 'rgb(255, 186, 0)', //amber
         'accent-foreground': 'rgb(250, 250, 250)',
         'ring': 'rgb(115, 115, 115)',
      }
   },
}

export type HeaderStyles = Record<string, string>
export const getHeaderStyles = (theme:string, mode:string):HeaderStyles => {
   return {
      bg: theme[theme][mode].background,
      active: theme[theme][mode].accent,
      inactiveBg: theme[theme][mode].secondary,
      inactive: theme[theme][mode]['muted-foreground']
   }
}

export const styles = {
  container: 'flex-1 pt-15 pb-5 pl-5 pr-5',
  text: 'text-lg',
  title: '',
  button: 'mt-3',
  buttonText: 'font-medium text-md',
}
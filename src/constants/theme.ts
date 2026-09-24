export type ThemeName = 'default' | 'test';
export type ColorMode = 'light' | 'dark' | 'system';
type CSSVar = `--${string}`;
export type ThemeVars = Record<CSSVar, string>;
type ThemeObject = { name: string, light: ThemeVars, dark: ThemeVars }

export const themeConfigs: Record<ThemeName, ThemeObject> = {
   default: {
      name:'default',
      light: {
         '--primary': '23 23 23',
         '--primary-foreground': '250 250 250',
         '--card': '255 255 255',
         '--secondary': '245 245 245',
         '--secondary-foreground': '23 23 23',
         '--background': '255 255 255',
         '--popover': '255 255 255',
         '--popover-foreground': '10 10 10',
         '--muted': '245 245 245',
         '--muted-foreground': '115 115 115',
         '--destructive': '231 0 11',
         '--foreground': '10 10 10',
         '--border': '229 229 229',
         '--input': '229 229 229',
         '--ring': '212 212 212',
         '--accent': '247 247 247',
         '--accent-foreground': '52 52 52',
      },
      dark: {
         '--primary': '255 245 245',
         '--primary-foreground': '23 23 23',
         '--card': '23 23 23',
         '--secondary': '38 38 38',
         '--secondary-foreground': '250 250 250',
         '--background': '10 10 10',
         '--popover': '23 23 23',
         '--popover-foreground': '250 250 250',
         '--muted': '38 38 38',
         '--muted-foreground': '161 161 161',
         '--destructive': '255 100 103',
         '--foreground': '250 250 250',
         '--border': '46 46 46',
         '--input': '46 46 46',
         '--accent': '38 38 38',
         '--accent-foreground': '250 250 250',
         '--ring': '115 115 115',
      }
   },
   test: {
      name: 'test',
      light: {
         '--primary': '255 163 186', //pink
         '--primary-foreground': '0 25 84', //dark blue
         '--card': '255 255 255', 
         '--secondary': '254 255 224',  //light yellow
         '--secondary-foreground': '18 117 59', //green
         '--background': '255 255 255',
         '--popover': '255 255 255',
         '--popover-foreground': '10 10 10',
         '--muted': '245 245 245',
         '--muted-foreground': '115 115 115',
         '--destructive': '231 0 11',
         '--foreground': '10 10 10',
         '--border': '229 229 229',
         '--input': '229 229 229',
         '--ring': '212 212 212',
         '--accent': '247 247 247',
         '--accent-foreground': '52 52 52',
      },
      dark: {
         '--primary': '255 5 67', //red
         '--primary-foreground': '135 171 255', //light blue
         '--card': '23 23 23',
         '--secondary': '224 172 0', //amber
         '--secondary-foreground': '214 79 255', //purple
         '--background': '10 10 10',
         '--popover': '23 23 23',
         '--popover-foreground': '250 250 250',
         '--muted': '38 38 38',
         '--muted-foreground': '161 161 161',
         '--destructive': '255 100 103',
         '--foreground': '250 250 250',
         '--border': '46 46 46',
         '--input': '46 46 46',
         '--accent': '38 38 38',
         '--accent-foreground': '250 250 250',
         '--ring': '115 115 115',
      }
   }
}
export const themeNames: ThemeName[] = Object.keys(themeConfigs) as ThemeName[];

export const getThemeVars = (
   theme: ThemeName,
   mode: ColorMode,
   colorScheme: string | null | undefined = null
):ThemeVars  => {
   const resolvedMode = mode === 'system' ? (colorScheme === 'dark' ? 'dark' : 'light') : mode;
   if (
      !theme ||
      !resolvedMode ||
      !themeConfigs[theme] ||
      !themeConfigs[theme][resolvedMode as 'light' | 'dark']
   ) {
      console.warn( `Invalid theme config: theme=${theme}, mode=${resolvedMode}, falling back to default` );
      return themeConfigs.default.light;
   }

   return themeConfigs[theme][resolvedMode as 'light' | 'dark'];
}
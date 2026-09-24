const { getDefaultConfig } = require('expo/metro-config');
const { withNativewind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);

module.exports = withNativewind(config, { 
   inlineRem: 16 ,
   inlineVariables: {
      // exclude: ['--color-primary', 'color-primary-foreground', '--color-secondary', '--color-secondary-foreground']
   }
});

module.exports = function (api) {
   api.cache(true);

   return {
      presets: [['babel-preset-expo'], 'nativewind/babel'],

      plugins: [
         [
            'module-resolver',
            {
               root: ['.'],
               alias: {
                  '@/': '.',
                  '@/app': './src/app',
                  '@/components': './src/components',
                  '@/gluestack': './components/ui',
                  'tailwind.config': './tailwind.config.js',
               },
            },
         ],
         'react-native-worklets/plugin',
      ],
   };
};

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
                  '@components': './src/components',
                  '@ui': './components/ui',
                  '@features': './src/features',
                  'tailwind.config': './tailwind.config.js',
               },
            },
         ],
         'react-native-worklets/plugin',
      ],
   };
};

/* 
   @/ = 183/48 || 182/49
 
   @/src = 29/26 || 
   @/components/ui = 100/31 -- 129 || -- 129
   @/components/custom = 29/17 -- 157 || 27/15 -- 156
   @/features = 25/20 -- 182 || 26/21 -- 182
   @/app = 0 || 
*/
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
                  '@/': './src',
                  '@components': './src/components',
                  '@features': './src/features',
                  '@ui': './components/ui',
                  'tailwind.config': './tailwind.config.js',
               },
            },
         ],
         'react-native-worklets/plugin',
      ],
   };
};

/* 
   @/ = 29/26
   @ = 202

   @/src = 29/26
   @/ = 29/26 // Match

   @components = 27/15
   @features = 26/21 -- 53
   @ui = 100/31 -- 153

   @[NOT /] = 173/53 // matches total + @[NOT components|features|ui|/src] = 20/18
   @[NOT components|features|ui] = 49/33
   @[NOT components|features|ui|/src] = 20/18

   @clerk = 19/17
   @react-native-async-storage = 1/1 -- 20 // matches @[NOT components|features|ui|/src]
*/
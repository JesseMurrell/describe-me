module.exports = function (api ) {
    api.cache(true);
    return {
      presets: ['babel-preset-expo'],
      plugins: [
        [
          'module-resolver',
          {
            extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
            alias: {
              '@/components': './src/components',
              '@/screens': './src/screens',
              '@/utils': './src/utils',
              '@/theme': './src/theme',
              '@/navigation': './src/navigation',
            },
          },
        ],
      ],
    };
  };
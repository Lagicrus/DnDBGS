module.exports = {
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      return {
        ...webpackConfig,
        entry: {
          main: [
            env === 'development' &&
              require.resolve('react-dev-utils/webpackHotDevClient'),
            paths.appIndexJs
          ].filter(Boolean),
          dndbi: './src/utils/dndbinject.ts',
          dndbidetails: './src/utils/dndbinjectdetails.ts',
          gsbi: './src/utils/griffoninject.ts'
        },
        output: {
          ...webpackConfig.output,
          filename: 'static/js/[name].js'
        },
        optimization: {
          ...webpackConfig.optimization,
          runtimeChunk: false
        }
      };
    }
  }
};

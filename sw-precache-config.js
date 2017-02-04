module.exports = {
  stripPrefix: 'dist/',
  staticFileGlobs: [
    'dist/*.html',
    'dist/manifest.json',
    'dist/static/**/!(*map*)',
    'dist/*.css',
    'dist/*.js'
  ],
  dontCacheBustUrlsMatching: /\.\w{8}\./,
  swFilePath: 'dist/service-worker.js'
};

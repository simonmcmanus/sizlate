// Karma configuration
// Generated on Sat Jul 30 2016 09:01:27 GMT+0100 (BST)



const resolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const pkg  = require('./package.json');
const alias = require('@rollup/plugin-alias')


module.exports = function (config) {
    config.set({
  
      // base path that will be used to resolve all patterns (eg. files, exclude)
      basePath: '',
  
      // frameworks to use
      // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
      frameworks: ['jasmine'],
  
      // list of files / patterns to load in the browser
      files: [
       './spec/**.spec.mjs',
      ],

  
      // list of files to exclude
      exclude: [
      ],
      preprocessors: {
        './spec/**.spec.mjs': 'rollup'
      },
      plugins: [
        'karma-rollup',
        'karma-chrome-launcher',
        'karma-firefox-launcher', 
        'karma-phantomjs-launcher',
        'karma-jasmine'
      ],
      
      rollupPreprocessor: {
        options:	{
          input: 'sizlate.js',
          output: {
            name: 'sizlate',
            file: pkg.module,
                  format: 'es' 
          },
          plugins: [
                  alias({
                      entries: [
                          { find: '../server/dom', replacement: '../client/dom' }
                      
                      ]
                  }),
            resolve(), // so Rollup can find node modules
                  commonjs(), // so Rollup can convert node modules to an ES module
          
          ]
        }
      },
      // test results reporter to use
      // possible values: 'dots', 'progress'
      // available reporters: https://npmjs.org/browse/keyword/karma-reporter
      reporters: ['progress'],
  
      // web server port
      port: 9876,
  
      // enable / disable colors in the output (reporters and logs)
      colors: true,
  
      // level of logging
      // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
      logLevel: config.LOG_WARNING,
  
      // enable / disable watching file and executing tests whenever any file changes
      autoWatch: true,
  
      // start these browsers
      // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
      browsers: [(process.env.TRAVIS) ? 'Firefox' : 'Chrome'],
  
      // Continuous Integration mode
      // if true, Karma captures browsers, runs the tests and exits
      singleRun: false,
  
      // Concurrency level
      // how many browser should be started simultaneous
      concurrency: Infinity
    })
  }
  
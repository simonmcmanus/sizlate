// Karma configuration
// Generated on Sat Jul 30 2016 09:01:27 GMT+0100 (BST)

module.exports = function (config) {
    config.set({
  
      // base path that will be used to resolve all patterns (eg. files, exclude)
      basePath: '',
  
      // frameworks to use
      // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
      frameworks: ['jasmine', 'browserify', 'serve-static'],
  
      // list of files / patterns to load in the browser
      files: [
        './spec/**.spec.js',
        { pattern: 'tests/spec/samples/*/*/**.html', included: false, served: true },
        { pattern: 'tests/spec/samples/*/*/*/*.html', included: false, served: true }
      ],
  
      proxies: {
        '/pages': '/base/tests/spec/samples/simple/pages',
        '/components': '/base/tests/spec/samples/simple/components'
      },
  
      // list of files to exclude
      exclude: [
      ],
      preprocessors: {
        './spec/**.spec.js': 'browserify'
      },
      plugins: [
        'karma-browserify',
        'karma-serve-static',
        'karma-chrome-launcher',
        'karma-firefox-launcher', 
        'karma-phantomjs-launcher',
        'karma-jasmine'
      ],
  
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
      logLevel: config.LOG_INFO,
  
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
  


module.exports = function(grunt) {
	'use strict';
	
    // Project configuration.
    grunt.initConfig({

        // Before generating any new files, remove any previously-created files.
        //clean: {
        //    tests: ['build'],
        //},
        
        // Unit tests.
        nodeunit: {
            tests: ['tests/*_test.js'],
        }
		
    });

    // Actually load this plugin's task(s).
    // grunt.loadTasks('tasks');

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-rm');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');

    // Whenever the "test" task is run, first clean the "tmp" dir, then run this
    // plugin's task(s), then test the result.
    grunt.registerTask('test', ['nodeunit']);

    // By default, lint and run all tests.
    grunt.registerTask('default', ['jshint', 'test']);

};
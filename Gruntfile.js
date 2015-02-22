var matchdep = require('matchdep');

module.exports = function (grunt) {

  grunt.initConfig({
    project: {
      src: 'src'
    },
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: '<%= project.src %>/js/rulez.js',
        dest: 'dist/js/rulez.min.js'
      }
    },
    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: 'src/css',
          src: ['*.css', '!*.min.css'],
          dest: 'dist/css',
          ext: '.min.css'
        }]
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        'no-use-before-define': 0,
        reporter: require('jshint-stylish')
      },
      all: [
        'gruntfile.js',
        '<%= project.src %>/**/*.js'
      ],
      grunt: 'gruntfile.js'
    },
    bump: {
      options: {
        files: ['package.json', 'bower.json'],
        updateConfigs: [],
        commit: true,
        commitMessage: 'Release v%VERSION%',
        commitFiles: ['package.json', 'bower.json'],
        createTag: true,
        tagName: 'v%VERSION%',
        tagMessage: 'Version %VERSION%',
        push: true,
        pushTo: 'upstream',
        gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d',
        globalReplace: false
      }
    },
    jsdoc : {
      dist : {
        src: ['src/js/*.js'],
        options: {
          destination: 'doc'
        }
      }
    }
  });

  matchdep.filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // Default task(s).
  grunt.registerTask('default', ['jshint','uglify', 'cssmin', 'jsdoc']);
};
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    banner: '/* <%= pkg.name %> <%= pkg.version %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
    clean: ["dist"],
    copy: {
      main: {
        files: [
          // includes files within path
          {expand: true, src: ['src/js/*'], dest: 'dist/js/', filter: 'isFile', flatten: true},
          {expand: true, src: ['src/fonts/*'], dest: 'dist/fonts/', filter: 'isFile', flatten: true}
          ]
        }
      },

      uglify: {
        options: {
          banner: '<%= banner %>'
        },
        build: {
          src: 'dist/js/bootcards.js',
          dest: 'dist/js/bootcards.min.js'
        }
      },

      concat: {
        cssdesktop: {
          options: { banner: '<%= banner %>' },
          src: [
         'src/css/bootcards.css','src/css/bootcards-desktop.css'
         ],
         dest: 'dist/css/bootcards-desktop.css'
        },
        cssios: {
          options: { banner: '<%= banner %>' },
           src: [
           'src/css/bootcards.css','src/css/bootcards-mobile-shared.css','src/css/bootcards-ios.css'
           ],
           dest: 'dist/css/bootcards-ios.css'
        },
        cssandroid: {
          options: { banner: '<%= banner %>' },
           src: [
           'src/css/bootcards.css','src/css/bootcards-mobile-shared.css','src/css/bootcards-android.css'
           ],
           dest: 'dist/css/bootcards-android.css'
        }
     },

     cssmin: {
      minify : {
        options: { banner: '<%= banner %>' },
        files: [{
          expand: true,
          cwd: 'dist/css/',
          src: ['*.css', '!*.min.css'],
          dest: 'dist/css/',
          ext: '.min.css'
        }]
      }
    }
  });

  // Load the plugin that provides the "uglify"/ contat task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');

  // Default task(s).
  grunt.registerTask('default', [
    'clean',
    'copy',
    'uglify',
    'concat:cssdesktop','concat:cssios','concat:cssandroid', 
    'cssmin:minify']);

};
module.exports = function(grunt) {

  grunt.initConfig({
    watch: {
      jade: {
        files: ['views/**'],
        options: {
          livereload: true
        }
      },
      js: {
        files: ['public/js/**', 'models/**/*.js', 'schemas/**/*.js'],
        //tasks: ['jshint'],
        options: {
          livereload: true
        }
      },
      // uglify: {
      //   files: ['public/**/*.js'],
      //   tasks: ['jshint'],
      //   options: {
      //     livereload: true
      //   }
      // },
      // styles: {
      //   files: ['public/**/*.less'],
      //   tasks: ['less'],
      //   options: {
      //     nospawn: true
      //   }
      // }
    },

    // less: {
    //   development: {
    //     options: {
    //       compress: true,
    //       yuicompress: true,
    //       optimization: 2
    //     },
    //     files: {
    //       'public/build/index.css': 'public/less/index.less'
    //     }
    //   }
    // },

    // uglify: {
    //   development: {
    //     files: {
    //       'public/build/admin.min.js': 'public/js/admin.js',
    //       'public/build/detail.min.js': [
    //         'public/js/detail.js'
    //       ]
    //     }
    //   }
    // },
    nodemon: {
	     dev: {
	          script: 'app.js',
	          options: {
	               args: [],
	               nodeArgs: ['--debug'],
	               ignore: ['README.md', 'node_modules/**', '.DS_Store'],
	               ext: 'js',
	               watch: ['./'],
	               delay: 1000,
	               env: {
	                    PORT: '3100'
	               },
	               cwd: __dirname
	          }
	     }
	},

    concurrent: {
      tasks: ['nodemon', 'watch'],
      options: {
        logConcurrentOutput: true
      }
    }
  })

  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('grunt-nodemon')
  grunt.loadNpmTasks('grunt-concurrent')
  grunt.loadNpmTasks('grunt-contrib-less')
  grunt.loadNpmTasks('grunt-contrib-uglify')

  grunt.option('force', true)

  grunt.registerTask('default', ['concurrent'])

  grunt.registerTask('test', ['mochaTest'])
}
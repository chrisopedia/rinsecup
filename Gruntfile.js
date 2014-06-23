module.exports = function( grunt ) {

	// Project configuration.
	grunt.initConfig({

		// grunt metadata
		pkg : grunt.file.readJSON( 'package.json' ),

		// directory variables
		dir : {
			scss : 'ui/scss',
			stylesheets : 'ui/stylesheets',
			vendor : 'ui/vendor',
		},

		// tasks

		// sass task to compile all scss files
		sass : {
			dist : {
				options : {
					sourcemap : true,
					style : 'expanded',
					trace : true
				},
				files: [{
					expand: true,
					cwd: '<%= dir.scss %>',
					src: ['*.scss'],
					dest: '<%= dir.stylesheets %>',
					ext: '.css'
				}]
			}
		},


		// watch task to re-run/compile on changed files
		watch: {
			build : {
				files : ['Gruntfile.js'],
				tasks : ['default']
			},
			sass : {
				files : ['<%= dir.scss %>/**/*.scss'],
				tasks : ['sass:dist']
			}
		}

	});

	grunt.loadNpmTasks('grunt-contrib-sass');
	// Load the plugin that provides the "watch" task.
	grunt.loadNpmTasks( 'grunt-contrib-watch' );

	// Default task(s).
	grunt.registerTask( 'default', ['sass:dist', 'watch'] );
};

module.exports = function( grunt ) {

    // Project configuration.
    grunt.initConfig({

        // grunt metadata
        pkg : grunt.file.readJSON( 'package.json' ),

        // directory variables
        dir : {
            output : 'ui/compressed',
            scripts : 'ui/scripts',
            stylesheets : 'ui/stylesheets',
            vendor : 'ui/vendor',
        },

        // assets configs
        assets : {
            stylesheets : grunt.file.readJSON( 'config/stylesheets.json' ),
            scripts : grunt.file.readJSON( 'config/scripts.json' ),
        },

        // tasks

        // clean task to clear out files and folders
        clean : {
            release : [
                '<%= dir.output %>'
            ]
        },

        // connect task to start a local server
        connect : {
            server : {}
        },

        // concat task to concat all css & js files
        concat : {
            css : {
                // this comes from a json file
                src : '<%= assets.stylesheets.files %>',
                // output here should be the apw-portfolio.v0.2.2
                dest : '<%= dir.output %>/<%= pkg.name %>.v<%= pkg.version %>.css'
            },
            js : {
                // this comes from a json file
                src : '<%= assets.scripts.files %>',
                dest : '<%= dir.output %>/<%= pkg.name %>.v<%= pkg.version %>.js'
            }
        },

        // cssmin task to minifiy the css files
        cssmin: {
            add_banner : {
                options: {
                     banner : '/*! <%= pkg.name %>: version <%= pkg.version %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
                },
                files: {
                    '<%= dir.output %>/<%= pkg.name %>.v<%= pkg.version %>.min.css' : ['<%= dir.output %>/<%= pkg.name %>.v<%= pkg.version %>.css']
                }
            }
        },

        // jshint task to test javascript files
        jshint : {
            grunt : 'Gruntfile.js',
            scripts : [
                '<%= dir.scripts %>/**/*.js'
            ]
        },

        // sass task to compile all scss files
        sass : {
            dist : {
                options : {
                    sourcemap : true,
                    style : 'expanded',
                    trace : true
                },
                files : [{
                    expand : true,
                    cwd : '<%= dir.stylesheets %>',
                    src : ['*.scss'],
                    dest : '<%= dir.output %>',
                    ext : '.css'
                }]
            }
        },

        // uglify task to minify js
        uglify : {
            options : {
                 banner : '/*! <%= pkg.name %>: version <%= pkg.version %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build : {
                files: {
                    '<%= dir.output %>/<%= pkg.name %>.v<%= pkg.version %>.min.js' : ['<%= dir.output %>/<%= pkg.name %>.v<%= pkg.version %>.js']
                }
            }
        },

        // watch task to re-run/compile on changed files
        watch: {
            build : {
                files : ['Gruntfile.js'],
                tasks : ['default']
            },
            scripts: {
                files: ['<%= dir.scripts %>/**/*.js'],
                tasks: ['jshint'],
                options: {
                    spawn: false,
                }
            },
            styles: {
                files: ['<%= dir.stylesheets %>/**/*.scss'],
                tasks: ['sass', 'concat:css'],
                options: {
                    spawn: false,
                }
            }
        }

    });

    // Load the plugin that provides the "clean" task.
    grunt.loadNpmTasks( 'grunt-contrib-clean' );
    // Load the plugin that provides the "concat" task.
    grunt.loadNpmTasks('grunt-contrib-concat');
    // Load the plugin that provides the "connect" task.
    grunt.loadNpmTasks('grunt-contrib-connect');
    // Load the plugin that provides the "cssmin" task.
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    // Load the plugin that provides the "jshint" task.
    grunt.loadNpmTasks( 'grunt-contrib-jshint' );
    // Load the plugin that provides the "sass" task.
    grunt.loadNpmTasks('grunt-contrib-sass');
    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    // Load the plugin that provides the "watch" task.
    grunt.loadNpmTasks( 'grunt-contrib-watch' );
    // Load the plugin that provides the "jekyll" task.
    grunt.loadNpmTasks('grunt-jekyll');

    // Default task(s).
    grunt.registerTask( 'default', 'jshint', 'sass' );
    grunt.registerTask( 'dev', ['default', 'connect:server', 'watch'] );
    grunt.registerTask( 'prod', ['clean:release', 'default', 'concat', 'cssmin', 'uglify'] );
};

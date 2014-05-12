module.exports = function (grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // define the tasks
    grunt.registerTask('build', [ 'clean', 'shell:jekyllBuild', 'less:prod', 'copy' ]);
    grunt.registerTask('default', ['build', 'connect', 'watch']);

    // Read package variables from json file
    var pkg = grunt.file.readJSON('package.json');

    // configure the tasks
    grunt.initConfig({

        // Project settings
        project: {
            // configurable paths
            src: 'src',
            src_tmp: 'src_tmp',
            dist: 'dist',
            website: '../yogamarga.github.io'
        },

        // Read package variables from json file
        pkg: pkg,

        // Clean output - Both jekyll and final distribution
        clean: ['<%= project.dist %>/*', '<%= project.src_tmp %>/*'],

        // Execute Jekyll - The output will be created in the src_tmp directory
        shell: {
            jekyllBuild: {
                options: {
                    stdout: true
                },
                command: [
                    'jekyll build'
                ].join('&&')
            }
        },

        // Less Compile
        less: {
            prod: {
                options: {
                    paths: ["assets/css"],
                    cleancss: true,
                    modifyVars: {
                        // imgPath: '"http://mycdn.com/path/to/images"',
                        imgPath: 'assets/images',
                        bgColor: 'red'
                    }
                },
                files: {
                    '<%= project.dist %>/<%= pkg.name %>.css': ['<%= project.src %>/less/stylesheet.less']
                }
            }
        },

        // Copy files
        copy: {
            build: {
                files: [
                    {dest: '<%= project.dist %>/', src : '**/*.html', expand: true, cwd: '<%= project.src_tmp %>/' },
                    {dest: '<%= project.dist %>/assets/', src : '**', expand: true, cwd: '<%= project.src_tmp %>/assets/'},
                    {dest: '<%= project.dist %>/fonts', src : '**', expand: true, cwd: 'vendor/bootstrap/dist/fonts/'},
                    {dest: '<%= project.dist %>/', src : ['jquery.min.js', 'jquery.min.map'], expand: true, cwd: 'vendor/jquery/dist/'},
                    {dest: '<%= project.dist %>/', src : 'bootstrap.min.js', expand: true, cwd: 'vendor/bootstrap/dist/js/'},
                    {dest: '<%= project.dist %>/', src : 'favicon.ico', expand: true, cwd: '<%= project.src_tmp %>/assets' },
                    {dest: '<%= project.dist %>/', src : 'sitemap.xml', expand: true, cwd: '<%= project.src_tmp %>/' }
                    // {dest: '<%= project.dist %>/', src : 'logo1.png', expand: true, cwd: '<%= project.src_tmp %>/assets/images' },
                ]
            },
            website: {
                files: [
                    {dest: '<%= project.website %>/', src : '**/*.*', expand: true, cwd: '<%= project.dist %>/' },
                ]
            }
        },

        // Watch for changes in files
        watch: {
            options: {
                livereload: true,
            },
            less: {
                files: ['<%= project.src %>/less/stylesheet.less', '<%= project.src %>/less/**/*.less'],
                tasks: [ 'less:prod' ]
            },
            copy: {
                files: [ '<%= project.src %>/**', '!<%= project.src %>/**/*.less', '!<%= project.src %>/**/*.coffee', '!<%= project.src %>/**/*.jade' ],
                tasks: [ 'shell:jekyllBuild', 'copy' ]
            }
        },

        // Web Server
        connect: {
            options: {
                port: 9000,
                base: '<%= project.dist %>',
                hostname: '*',
                livereload: 35729
            },
            livereload: {
                options: {
                    open: true,
                    base: [
                    '<%= project.dist %>'
                    ]
                }
            }
        }
    });

};

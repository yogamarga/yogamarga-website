module.exports = function (grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Default task.
  grunt.registerTask('default', ['jshint','build']);
  grunt.registerTask('build', ['clean', 'shell:jekyllBuild', 'html2js','concat', 'less:production', 'copy:all' /*, 'compass'*/]);
  grunt.registerTask('release', ['clean', 'shell:jekyllBuild', 'html2js','uglify','jshint','concat:index', 'less:production', 'copy:all']);

  grunt.registerTask('serve', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      // 'clean',
      // 'bowerInstall',
      // 'concurrent:server',
      // 'autoprefixer',
      'connect:livereload',
      'watch:all'
    ]);
  });


  // Print a timestamp (useful for when watching)
  grunt.registerTask('timestamp', function() {
    grunt.log.subhead(Date());
  });

  var karmaConfig = function(configFile, customOptions) {
    var options = { configFile: configFile, keepalive: true };
    var travisOptions = process.env.TRAVIS && { browsers: ['Firefox'], reporters: 'dots' };
    return grunt.util._.extend(options, customOptions, travisOptions);
  };

  // Project configuration.
  grunt.initConfig({

    // Project settings
    project: {
      // configurable paths
      src: 'src_tmp',
      dist: 'dist',
      watch: 'src'
    },

    env : 'dev',

    pkg: grunt.file.readJSON('package.json'),

    banner:
    '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
    '<%= pkg.homepage ? " * " + pkg.homepage + "\\n" : "" %>' +
    ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>;\n' +
    ' * Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %>\n */\n',
    src: {
      js: ['<%= project.src %>/app/**/*.js'],
      jsTpl: ['<%= project.dist %>/templates/**/*.js'],
      specs: ['test/**/*.spec.js'],
      scenarios: ['test/**/*.scenario.js'],

      html: ['<%= project.src %>/index.html'],

      tpl: {
        app: ['<%= project.src %>/app/**/*.tpl.html'],
      },
      less: ['<%= project.src %>/less/stylesheet.less'], // recess:build doesn't accept ** in its file patterns
      lessWatch: ['<%= project.src %>/less/**/*.less'],
      config: ['<%= project.src %>/env/<%= env %>.js'],
      watch: ['<%= project.watch %>/app/**/*.js', '<%= project.watch %>/app/**/*.html']
    },

    clean: ['<%= project.dist %>/*'],

    copy: {
        all: {
            files: [
                {dest: '<%= project.dist %>/assets/', src : '**', expand: true, cwd: '<%= project.src %>/assets/'},
                {dest: '<%= project.dist %>/data', src : '**', expand: true, cwd: '<%= project.src %>/data/'},
                {dest: '<%= project.dist %>/fonts', src : '**', expand: true, cwd: 'vendor/bootstrap/dist/fonts/'},
                {dest: '<%= project.dist %>/pages', src : '**', expand: true, cwd: '<%= project.src %>/pages/'}
            ]
        }
    },
    /*
      assets: {
        files: [{ dest: '<%= project.dist %>/assets/', src : '**', expand: true, cwd: '<%= project.src %>/assets/' }]
      },
      data: {
        files: [{ dest: '<%= project.dist %>/data', src : '**', expand: true, cwd: '<%= project.src %>/data/' }]
      },
      pages: {
        files: [{ dest: '<%= project.dist %>/pages', src : '**', expand: true, cwd: '<%= project.src %>/pages/' }],
        options: {
          process: function(content, srcpath) {
            return grunt.template.process(content);
          }
        }
      },
      fonts: {
        files: [{ dest: '<%= project.dist %>/fonts', src : '**', expand: true, cwd: 'vendor/bootstrap/dist/fonts/' }]
      },
    */

    karma: {
      unit: { options: karmaConfig('test/config/unit.js') },
      watch: { options: karmaConfig('test/config/unit.js', { singleRun:false, autoWatch: true}) }
    },

    html2js: {
      app: {
        options: {
          base: '<%= project.src %>/app'
        },
        src: ['<%= src.tpl.app %>'],
        dest: '<%= project.dist %>/templates/app.js',
        module: 'templates.app'
      }
    },
    concat:{
      dist:{
        options: {
          banner: "<%= banner %>"
        },
        src:['<%= src.js %>', '<%= src.config %>', '<%= src.jsTpl %>'],
        dest:'<%= project.dist %>/<%= pkg.name %>.js'
      },
      index: {
        src: ['<%= project.src %>/index.html'],
        dest: '<%= project.dist %>/index.html',
        options: {
          process: true
        }
      },
      index_el: {
        src: ['<%= project.src %>/el/index.html'],
        dest: '<%= project.dist %>/el/index.html',
        options: {
          process: true
        }
      },
      jquery: {
        src:['vendor/jquery/dist/*.js'],
        dest: '<%= project.dist %>/jquery.js'
      }
    },

    uglify: {
      dist:{
        options: {
          banner: "<%= banner %>"
        },
        src:['<%= src.js %>' ,'<%= src.jsTpl %>'],
        dest:'<%= project.dist %>/<%= pkg.name %>.js'
      },
      jquery: {
        src:['vendor/jquery/dist/*.js'],
        dest: '<%= project.dist %>/jquery.js'
      }
    },

    less: {
      development: {
        options: {
          paths: ["assets/css"]
        },
        files: {
          '<%= project.dist %>/<%= pkg.name %>.css': ['<%= src.less %>']
        }
      },
      production: {
        options: {
          paths: ["assets/css"],
          cleancss: true,
          modifyVars: {
            // imgPath: '"http://mycdn.com/path/to/images"',
            imgPath: 'assets/img',
            bgColor: 'red'
          }
        },
        files: {
          '<%= project.dist %>/<%= pkg.name %>.css': ['<%= src.less %>']
        }
      }
    },

    watch:{
      all: {
        files:['<%= src.watch %>', '<%= src.js %>', '<%= src.specs %>', '<%= src.lessWatch %>', '<%= src.tpl.app %>', '<%= src.tpl.common %>', '<%= src.html %>'],
        tasks:['default','timestamp']
      },
      build: {
        files:['<%= src.js %>', '<%= src.specs %>', '<%= src.lessWatch %>', '<%= src.tpl.app %>', '<%= src.tpl.common %>', '<%= src.html %>'],
        tasks:['build','timestamp']
      },
//      compass: {
//        files: ['<%= project.src %>/scss/{,*/}*.{scss,sass}'],
//        tasks: ['compass:server', 'autoprefixer']
//      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= project.dist %>/{,*/}*.html',
          '<%= project.dist %>/styles/{,*/}*.css',
          '<%= project.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },
    jshint:{
      files:['gruntFile.js', '<%= src.js %>', '<%= src.jsTpl %>', '<%= src.specs %>', '<%= src.scenarios %>'],
      options:{
        curly:true,
        eqeqeq:true,
        immed:true,
        latedef:true,
        newcap:true,
        noarg:true,
        sub:true,
        boss:true,
        eqnull:true,
        globals:{}
      }
    },

    // Compiles Sass to CSS and generates necessary files if requested
    compass: {
      options: {
        sassDir: '<%= project.src %>/scss',
        cssDir: '<%= project.dist %>',
        generatedImagesDir: '<%= project.dist %>/images/generated',
        imagesDir: '<%= project.src %>/assets/img',
        javascriptsDir: '<%= project.src %>/scripts',
        fontsDir: '<%= project.src %>/styles/fonts',
        importPath: 'vendor',
        httpImagesPath: '/img',
        httpGeneratedImagesPath: '/img',
        httpFontsPath: '/styles/fonts',
        relativeAssets: false,
        assetCacheBuster: false,
        raw: 'Sass::Script::Number.precision = 10\n'
      },
      dist: {
        options: {
          generatedImagesDir: '<%= project.dist %>/img'
        }
      },
      server: {
        options: {
          debugInfo: true
        }
      }
    },

    ngconstant: {
        options: {
          name: 'configur',
          dest: '<%= project.src %>/app/config.js',
          wrap: false,
          constants: {
            title: 'grunt-ng-constant',
            debug: true
          }
        },
        dev: {
          constants: {
            restBaseUrl: 'http://127.0.0.1:8080/atheorita-services/api',
            baseUrl: 'http://127.0.0.1:9000'
          }
        },
        prod: {
          constants: {
            restBaseUrl: 'http://www.atheorita.gr/atheorita-services/api',
            baseUrl: 'http://www.atheorita.gr',
            debug: false
          }
        },
        override_global: {
          options: {
            constants: { // This does not merge it overrides

            }
          }
        }
      },


    shell: {
        jekyllBuild: {
            options: {                      // Options
                stdout: true
            },
            command: [
                'jekyll build'
            ].join('&&')
        }
    },


    // The actual grunt server settings
    connect: {
      options: {
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: 'localhost',
        livereload: 35729
      },
      livereload: {
        options: {
          open: true,
          base: [
            '<%= project.dist %>'
          ]
        }
      },
      test: {
        options: {
          port: 9001,
          base: [
            '<%= project.dist %>',
            'test',
            '<%= project.src %>'
          ]
        }
      },
      dist: {
        options: {
          base: '<%= project.dist %>'
        }
      }
    }

    });


};

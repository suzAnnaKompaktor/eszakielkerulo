module.exports = function (grunt) {
  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  var globalConfig = {
    src: 'src',
    dest: 'dist'
  };

  grunt.initConfig({
    globalConfig: globalConfig,
    pkg: grunt.file.readJSON( 'package.json' ),

    jshint: {
      caffelattePreConcat: ['<%= globalConfig.src %>/js/**/*.js'],
      caffelattePostConcat: ['<%= globalConfig.dest %>/js/**/*.js']
    },

    concat: {
      options: {
        separator: '\n\n'
      },
      caffelatte: {
        src: ['<%= globalConfig.src %>/js/*.js', '!<%= globalConfig.src %>/js/init.js'],
        dest: '<%= globalConfig.dest %>/js/<%=pkg.name %>.js'
      },
      plugins: {
        src: ['<%= globalConfig.src %>/js/plugins/*.js'],
        dest: '<%= globalConfig.dest %>/js/plugins/all.js'
      }
    },

    uglify: {
      caffelatte: {
        options: {
          sourceMap: '<%= globalConfig.dest %>/js/<%=pkg.name %>.min.js.map',
          banner: '/* <%=pkg.name %> created by suzAnnaKompaktor (c) */'
        },
        files: {
          '<%= globalConfig.dest %>/js/<%=pkg.name %>.min.js': '<%= globalConfig.dest %>/js/<%=pkg.name %>.js',
          '<%= globalConfig.dest %>/js/init.min.js': '<%= globalConfig.src %>/js/init.js'
        }
      },
      pluginsAll: {
        options: {
          sourceMap: '<%= globalConfig.dest %>/js/plugins/all.min.js.map'
        },
        files: {
          '<%= globalConfig.dest %>/js/plugins/all.min.js': '<%= globalConfig.dest %>/js/plugins/all.js'
        }
      },
      plugins: {
        files: [{
          expand: true,
          cwd: '<%= globalConfig.src %>/js/plugins/',
          src: ['*.js'],
          dest: '<%= globalConfig.dest %>/js/plugins/',
          ext: '.min.js',
        }]
      }
    },

    less: {
      development: {
        options: {
          path: ['<%= globalConfig.src %>/less']
        },
        files: {
          '<%= globalConfig.dest %>/css/caffelatte.css': '<%= globalConfig.src %>/less/caffelatte.less',
        }
      },
      developmentComponents: {
        files: [{
            expand: true,
            cwd: '<%= globalConfig.src %>/less',
            src: ['components/**/*.less'],
            dest: '<%= globalConfig.dest %>/css',
            ext: '.css'
        }]
      },
      developmentPlugins: {
        files: [{
            expand: true,
            cwd: '<%= globalConfig.src %>/less',
            src: ['plugins/**/*.less'],
            dest: '<%= globalConfig.dest %>/css',
            ext: '.css'
        }]
      },
      developmentWidgets: {
        files: [{
            expand: true,
            cwd: '<%= globalConfig.src %>/less',
            src: ['widgets/**/*.less'],
            dest: '<%= globalConfig.dest %>/css',
            ext: '.css'
        }]
      },
      production: {
        options: {
          path: ['<%= globalConfig.src %>/less'],
          compress: true,
          cleancss: true,
          sourceMap: true,
          sourceMapRootpath: '<%= globalConfig.dest %>/css',
          sourceMapFilename: '<%= globalConfig.dest %>/css/caffelatte.min.css.map'
        },
        files: {
          '<%= globalConfig.dest %>/css/caffelatte.min.css': '<%= globalConfig.src %>/less/caffelatte.less'
        }
      },
      productionComponents: {
        options: {
          path: ['<%= globalConfig.src %>/less'],
          compress: true,
          cleancss: true,
        },
        files: [{
            expand: true,
            cwd: '<%= globalConfig.src %>/less',
            src: ['components/**/*.less'],
            dest: '<%= globalConfig.dest %>/css',
            ext: '.min.css'
        }]
      },
      productionPlugins: {
        options: {
          path: ['<%= globalConfig.src %>/less'],
          compress: true,
          cleancss: true,
        },
        files: [{
            expand: true,
            cwd: '<%= globalConfig.src %>/less',
            src: ['plugins/**/*.less'],
            dest: '<%= globalConfig.dest %>/css',
            ext: '.min.css'
        }]
      },
      productionWidgets: {
        options: {
          path: ['<%= globalConfig.src %>/less'],
          compress: true,
          cleancss: true,
        },
        files: [{
            expand: true,
            cwd: '<%= globalConfig.src %>/less',
            src: ['widgets/**/*.less'],
            dest: '<%= globalConfig.dest %>/css',
            ext: '.min.css'
        }]
      }
    },

    bowercopy: {
      vendor: {
        options: {
            destPrefix: '<%= globalConfig.dest %>/vendor',
            srcPrefix: './vendor',
        },
        files: {
          'jquery/jquery.min.js': 'jquery/dist/jquery.min.js',
          'bootstrap/bootstrap.min.js': 'bootstrap/dist/js/bootstrap.min.js',
          'autosize/autosize.min.js': 'autosize/dist/autosize.min.js',
          'bootstrap-colorpicker/bootstrap-colorpicker.min.js': 'bootstrap-colorpicker/dist/js/bootstrap-colorpicker.min.js',
          'bootstrap-datepicker/bootstrap-datepicker.min.js': 'bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js',
          'bootstrap-timepicker/bootstrap-timepicker.js': 'bootstrap-timepicker/js/bootstrap-timepicker.js',
          'bootstrap-fileinput/': 'bootstrap-fileinput/js/',
          'bootstrap-maxlength/bootstrap-maxlength.js': 'bootstrap-maxlength/src/bootstrap-maxlength.js',
          'bootstrap-tagsinput/bootstrap-tagsinput.min.js': 'bootstrap-tagsinput/dist/bootstrap-tagsinput.min.js',
          'fuelux/spinbox.js': 'fuelux/js/spinbox.js',
          'jquery-ui/jquery-ui.min.js': 'jquery-ui/jquery-ui.min.js',
          'jquery-ui/': 'jquery-ui/ui/minified/',
          'jquery-appear/jquery-appear.min.js': 'jquery-appear/build/jquery.appear.min.js',
          'jquery-html5data/jquery-html5data.min.js': 'jquery-html5data/jquery.html5data.min.js',
          'jquery-placeholder/jquery-placeholder.min.js': 'jquery-placeholder/jquery.placeholder.min.js',
          'jqueryui-touch-punch/jqueryui-touch-punch.min.js': 'jqueryui-touch-punch/jquery.ui.touch-punch.min.js',
          'magnific-popup/magnific-popup.min.js': 'magnific-popup/dist/jquery.magnific-popup.min.js',
          'owlcarousel/owlcarousel.min.js': 'owl.carousel/dist/owl.carousel.min.js',
          'owlcarousel/owlcarousel.min.css': 'owl.carousel/dist/assets/owl.carousel.min.css',
          'select2/select2.min.js': 'select2/dist/js/select2.min.js',
          'select2/select2.min.css': 'select2/dist/css/select2.min.css',
          'select2/i18n': 'select2/dist/js/i18n',
          'animate-css/animate.min.css': 'animate-css/animate.min.css',
          'flot/jquery.flot.js': 'Flot/jquery.flot.js',
          'flot/': 'Flot/jquery.flot.*.js',
          'flot/jquery.flot.tooltip.min.js': 'flot.tooltip/js/jquery.flot.tooltip.min.js',
          'jquery-maskedinput/jquery-maskedinput.min.js': 'jquery.maskedinput/dist/jquery.maskedinput.min.js',
          'jquery-validation/jquery-validate.min.js': 'jquery-validation/dist/jquery.validate.min.js',
          'jquery-validation/additional-methods.min.js': 'jquery-validation/dist/additional-methods.min.js',
          'bootstrap-wizard/bootstrap-wizard.min.js': 'bootstrap-wizard/jquery.bootstrap.wizard.min.js'
        }
      },
      images: {
        options: {
            destPrefix: '<%= globalConfig.src %>/images',
            srcPrefix: './vendor',
        },
        files: {
          'bootstrap-colorpicker/': 'bootstrap-colorpicker/dist/img/bootstrap-colorpicker/',
          'bootstrap-fileinput/': 'bootstrap-fileinput/img/',
          'owl-carousel': 'owl.carousel/dist/**/*.{png,jpg,jpeg,svg,gif}'
        }
      },
      fonts: {
        options: {
            destPrefix: '<%= globalConfig.src %>/fonts',
            srcPrefix: './vendor',
        },
        files: {
          'font-awesome/': 'font-awesome/fonts/',
        }
      }
    },

    copy: {
      images: {
        expand: true,
        cwd: '<%= globalConfig.src %>/images',
        src: '**',
        dest: '<%= globalConfig.dest %>/images'
      },
      fonts: {
        expand: true,
        cwd: '<%= globalConfig.src %>/fonts',
        src: '**',
        dest: '<%= globalConfig.dest %>/fonts'
      }
    },

    watch: {
      js: {
        files: ['<%= globalConfig.src %>/js/**/*.js'],
        tasks: [
          'jshint:caffelattePreConcat',
          'concat',
          /*'jshint:caffelattePostConcat',*/
          'uglify'
        ],
      },
      compile: {
        files: ['<%= globalConfig.src %>/less/**/*.less'],
        tasks: ['less'],
      },
      bowercopy: {
        files: ['./vendor/**/*'],
        tasks: ['bowercopy'],
      },
      copy: {
        files: ['images/**/*', 'fonts/**/*'],
        tasks: ['copy'],
      }
    }
  });

  grunt.registerTask( 'default', [
    'jshint:caffelattePreConcat',
    'concat',
    /*'jshint:caffelattePostConcat',*/
    'uglify',
    'less',
    /*'bowercopy',*/
    'copy',
    'watch'
  ] );
}

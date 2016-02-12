'use strict';

var
  gulp = require('gulp'),
  imagemin = require('gulp-imagemin'),
  jpegRecompress = require('imagemin-jpeg-recompress'),
  gutil = require('gutil'),
  gulpif = require('gulp-if'),
  browserSync = require('../util/browserSync'),

  isWatchEnabled = function (config) {
    return config.watch === true;
  },

  svgoPlugins = [
    // { cleanupAttrs : false },
    // { cleanupEnableBackground : false },
    // { cleanupIDs : false },
    // { cleanupNumericValues : false },
    {collapseGroups: false},
    // { convertColors : false },
    {convertPathData: false},
    {convertShapeToPath: false},
    // { convertStyleToAttrs : false },
    // { convertTransform : false },
    // { mergePaths : false },
    {moveElemsAttrsToGroup: false},
    {moveGroupAttrsToElems: false},
    // { removeComments : false },
    // { removeDesc : false },
    // { removeDoctype : false },
    // { removeEditorsNSData : false },
    // { removeEmptyAttrs : false },
    // { removeEmptyContainers : false },
    // { removeEmptyText : false },
    {removeHiddenElems: false},
    // { removeMetadata : false },
    // { removeNonInheritableGroupAttrs : false },
    // { removeRasterImages : false },
    // { removeTitle : false },
    {removeUnknownsAndDefaults: false},
    // { removeUnusedNS : false },
    // { removeUselessStrokeAndFill : false },
    {removeViewBox: false}
    // { removeXMLProcInst : false },
    // { sortAttrs : false },
    // { transformsWithOnePath : false }
  ];


module.exports = function (name, config) {

  gulp.task(name, function () {
    return gulp.src(config.source)
      .on('error', gutil.log)
      .pipe(imagemin({
        svgoPlugins: config.svgoPlugins || svgoPlugins,
        use: config.reCompress ? [jpegRecompress({loops: 1})] : []
      }))
      .pipe(gulp.dest(config.dest))
      .pipe(gulpif(isWatchEnabled(config), browserSync.getInstance().stream()));
  });

  gulp.task(name+':watch', function () {
    gulp.watch(config.source, gulp.parallel(name));
  });

};
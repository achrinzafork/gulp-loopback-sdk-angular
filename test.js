// Copyright IBM Corp. 2014,2016. All Rights Reserved.
// Node module: gulp-loopback-sdk-angular
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

'use strict';
var assert = require('assert');
var gutil = require('gulp-util');
var loopbackAngular = require('./index');
var fs = require('fs');

it('should ', function (cb) {
  var stream = loopbackAngular();

  stream.on('data', function (file) {
    assert(/var urlBase = "\/rest-api-root";/.test(file.contents));
    assert(/var module = angular.module\("lbServices", \['ngResource'\]\);/
      .test(file.contents));
    assert(/\.provider\('LoopBackResource', function LoopBackResourceProvider/
      .test(file.contents));
    assert(/\}\)\(window, window.angular\);/.test(file.contents));
  });

  stream.on('end', cb);

  stream.write(new gutil.File({
    base: __dirname,
    path: __dirname + '/fixtures/app.js',
    contents: fs.readFileSync('fixtures/app.js')
  }));

  stream.end();
});

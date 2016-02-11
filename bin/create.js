#!/usr/bin/env node

// requires
var wc         = require('webcredits');
var program    = require('commander');


/**
 * varsion as command
 * @param  {Array} argv [description]
 */
function bin(argv) {
  // setup config
  var config = wc.getConfig();

  program
  .option('-d, --database <database>', 'Port')
  .parse(argv);

  var defaultDatabase = 'webcredits';

  config.database = program.database || config.database || defaultDatabase;

  wc.createDB(config, function(err, ret) {
    if (err) {
      console.error(err);
    } else {
      console.log(ret);
    }
  });
}

// If one import this file, this is a module, otherwise a library
if (require.main === module) {
  bin(process.argv);
}

module.exports = bin;

#!/usr/bin/env node

// requires
var wc      = require('webcredits');
var program = require('commander');


/**
 * version as a command
 */
function bin(argv) {
  // setup config
  var config = wc.getConfig();

  program
  .option('-d, --database <database>', 'Database')
  .option('-w, --wallet <wallet>', 'Wallet')
  .parse(argv);

  var defaultDatabase = 'webcredits';
  var defaultWallet   = 'https://localhost/wallet/test#this';

  config.database = program.database || config.database || defaultDatabase;
  config.wallet   = program.wallet   || config.wallet   || defaultWallet;

  wc.genesis(config, function(err, ret) {
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

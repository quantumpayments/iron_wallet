#!/usr/bin/env node

// requires
var wc      = require('webcredits');
var program = require('commander');


/**
 * version as a command
 */
function bin(argv) {
  // setup config
  var coinbase    = 'https://w3id.org/cc#coinbase';
  var currency    = 'https://w3id.org/cc#bit';
  var destination = 'https://workbot.databox.me/profile/card#me';
  var initial     = 100000;
  var description = 'ico';

  var config = wc.getConfig();

  program
  .option('-d, --database <database>', 'Database')
  .option('-w, --wallet <wallet>', 'Wallet')
  .parse(argv);

  var defaultDatabase = 'webcredits';
  var defaultWallet   = 'https://localhost/wallet/test#this';

  config.database = program.database || config.database || defaultDatabase;
  config.wallet   = program.wallet   || config.wallet   || defaultWallet;

  var credit = {};
  credit["https://w3id.org/cc#source"] = coinbase;
  credit["https://w3id.org/cc#amount"] = initial;
  credit["https://w3id.org/cc#currency"] = currency;
  credit["https://w3id.org/cc#destination"] = destination;
  credit["http://purl.org/dc/terms/description"] = description;

  var sequelize = wc.setupDB(config);

  // create, genesis, ico
  wc.createDB(config, function(err, ret) {
    if (err) {
      console.error(err);
    } else {
      console.log(ret);
      wc.genesis(config, function(err, ret) {
        if (err) {
          console.error(err);
        } else {
          console.log(ret);
          wc.insert(credit, sequelize, config, function(err, ret) {
            if (err) {
              console.error(err);
            } else {
              console.log(ret);
            }
          });

        }
      });

    }
  });


  wc.insert(credit, sequelize, config, function(err, ret) {
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

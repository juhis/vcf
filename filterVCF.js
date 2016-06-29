'use strict';

const fs = require('fs'),
      _  = require('lodash'),

      validateConfig = require('./config/validate.js'),
      readGenes      = require('./io/readGenes.js'),
      handleLine     = require('./parsing/handleLine.js');
      
if (process.argv.length !== 3) {
    console.error(`Usage: node ${__filename.split(/\//).pop()} config.js`);
    process.exit(-1);
}

/// TODO validate config!!
const config = require(`./${process.argv[2]}`);
const err = validateConfig(config);
if (err !== undefined) {
    console.error(err);
    process.exit(-2);
}

console.error('configuration:');
console.error(JSON.stringify(config, null, 4));

const genes = readGenes(config.geneScoreFile);

require('readline').createInterface({
    
    input: fs.createReadStream(config.vcf, 'utf8'),
    ouput: process.stdout
    
})
    .on('line', handleLine.bind(null, config, genes))
    .on('close', () => { console.error('done'); });

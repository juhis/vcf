'use strict';

const fs = require('fs'),
      _  = require('lodash');

// returns an object with ensg ids, gene names and scores as read from the given tab-delimited file
module.exports = filename => {
    
    const lines = fs.readFileSync(filename, 'utf8').split(/\r?\n|\r/);

    var ensgs  = {},
        names  = {},
        scores = {};

    for (let i = 1; i < lines.length; i++) {
        const split = lines[i].split(/\t/);
        ensgs[split[0]] = true;
        names[split[1]] = true;
        scores[split[0]] = +split[2];
        scores[split[1]] = +split[2];
    }
    
    console.error(`readGenes: ${_.size(ensgs)} genes read`);
    
    return {
        ensgs: ensgs,
        names: names,
        scores: scores
    };
};

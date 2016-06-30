'use strict';

const _ = require('lodash');

// returns true if an id in ensgs is present in the EFFECT/ANN field
module.exports = (line, nLine, reAnn, geneIdIndex, genes) => {
    
    const matches = line.match(reAnn);
    
    if (matches) {
        
        const fields = matches[1].split('|');
        
        if (fields.length < geneIdIndex + 1) {
            return console.error(`line ${nLine}: unexpected format, expected at least ${geneIdIndex + 1} EFFECT/ANN fields separated by |`);
        }
        
        const ids = fields[geneIdIndex].split('-');
        
        const hasPrioritizedGene = _
              .some(ids, id => {
                  return genes.ensgs[id] === true || genes.names[id] === true;
              });

        return hasPrioritizedGene;
    }
};

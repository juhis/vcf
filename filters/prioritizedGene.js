'use strict';

const _ = require('lodash');

// TODO get index from the vcf file
const ENSG_INDEX_IN_EFFECT_FIELD = 4,
      RE = /;EFFECT=(.*?);/;

// returns true if an id in ensgs is present in the EFFECT field
module.exports = (line, nLine, ensgs) => {
    
    const matches = line.match(RE);
    
    if (matches) {
        
        const fields = matches[1].split('|');
        
        if (fields.length < 5) {
            return console.error(`line ${nLine}: unexpected format, expected at least 5 EFFECT fields separated by |`);
        }
        
        const ids = fields[ENSG_INDEX_IN_EFFECT_FIELD].split('-');
        
        const hasPrioritizedGene = _
              .some(ids, id => {
                  if (id.length > 0 && !id.startsWith('ENSG')) {
                      console.error(`line ${nLine}: unexpected format, expected an ENSG id in EFFECT field ${ENSG_INDEX_IN_EFFECT_FIELD}`);
                  }
                  return ensgs[id] === true;
              });

        return hasPrioritizedGene;
        
    } else if (line.indexOf('ENSG') > 0) {
        
        console.error(`line ${nLine}: unexpected format, found an ENSG identifier outside of an EFFECT field`);
    }
};

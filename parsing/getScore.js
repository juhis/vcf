'use strict';

const _ = require('lodash'),
      RE_EFFECT = /;EFFECT=(.*?);/,
      // TODO read from vcf
      ENSG_INDEX_IN_EFFECT_FIELD = 4;

// scores: {ensg1: score1, ensg2: score2, ...}
// returns gene score(s) if the EFFECT field contains at least one of given ensg ids
module.exports = (scores, line, nLine) => {
    
    var score = '';
    const matches = line.match(RE_EFFECT);

    if (matches) {
        
        const fields = matches[1].split('|');
        
        if (fields.length < ENSG_INDEX_IN_EFFECT_FIELD + 1) {
            return console.error(`line ${nLine}: unexpected format, wanted at least ${ENSG_INDEX_IN_EFFECT_FIELD + 1} EFFECT fields separated by |`);
        }
        
        const ids = fields[ENSG_INDEX_IN_EFFECT_FIELD].split('-');
        
        _.forEach(ids, id => {
            if (id.length > 0 && !id.startsWith('ENSG')) {
                console.error(`line ${nLine}: unexpected format, expected an ENSG id in EFFECT field ${ENSG_INDEX_IN_EFFECT_FIELD}`);
            }
            if (scores[id] !== undefined) {
                if (score !== '') {
                    score += ',';
                }
                score += scores[id];
            }
        });
        
    } else if (line.indexOf('ENSG') > 0) {
        
        console.error(`line ${nLine}: unexpected format, found an ENSG identifier outside of an EFFECT field`);
        
    }

    return score === '' ? 'NA' : score;
}

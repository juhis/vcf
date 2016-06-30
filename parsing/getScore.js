'use strict';

const _ = require('lodash');

// scores: {ensg1: score1, ensg2: score2, ...}
// returns gene score(s) if the EFFECT/ANN field contains at least one of given ensg ids
module.exports = (scores, line, nLine, reAnn, geneIdIndex) => {
    
    var score = '';
    const matches = line.match(reAnn);

    if (matches) {
        
        const fields = matches[1].split('|');
        
        if (fields.length < geneIdIndex + 1) {
            return console.error(`line ${nLine}: unexpected format, wanted at least ${geneIdIndex + 1} EFFECT/ANN fields separated by |`);
        }
        
        const ids = fields[geneIdIndex].split('-');
        
        _.forEach(ids, id => {
            if (scores[id] !== undefined) {
                if (score !== '') {
                    score += ',';
                }
                score += scores[id];
            }
        });
    }
    
    return score === '' ? 'NA' : score;
}

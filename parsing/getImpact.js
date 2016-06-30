'use strict';

const _ = require('lodash'),
      RE_IMPACT = /SNPEFF_IMPACT=([A-Z]+)/;

// returns SnpEff impact from SNPEFF_IMPACT or EFFECT/ANN field
// if both exist, returns the bigger impact
module.exports = (line, reAnn, impactIndex, impacts) => {
    
    var matches = line.match(RE_IMPACT);
    const impact1 = matches && impacts[matches[1]] > 0 && matches[1];

    matches = line.match(reAnn);
    const impact2 = matches && impacts[matches[1].split('|')[impactIndex]] > 0 && matches[1].split('|')[impactIndex];

    // return bigger impact
    if (impact1 && impact2) {
        return impacts[impact1] > impacts[impact2] ? impact1 : impact2;
    }
    if (impact1) {
        return impact1;
    }
    if (impact2) {
        return impact2;
    }
    return 'UNKNOWN';
}

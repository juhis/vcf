'use strict';

const RE_IMPACT = /SNPEFF_IMPACT=([A-Z]+)/;

// returns true if the SNPEFF_IMPACT field or the impact in the EFFECT/ANN field equals to one of the given impacts
module.exports = (line, reAnn, impactIndex, impacts) => {
    
    var matches = line.match(RE_IMPACT);
    const impact1 = matches && matches[1];

    matches = line.match(reAnn);
    const impact2 = matches && matches[1].split('|')[impactIndex];

    return impacts[impact1] > 0 || impacts[impact2] > 0;
};

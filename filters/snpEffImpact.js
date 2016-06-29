'use strict';

const RE_IMPACT = /SNPEFF_IMPACT=([A-Z]+)/,
      RE_EFFECT = /;EFFECT=(.*?);/,
      // TODO read from vcf
      IMPACT_INDEX_IN_EFFECT_FIELD = 3;

// returns true if the SNPEFF_IMPACT field or the impact in the EFFECT field equals to one of the given impacts
module.exports = (line, impacts) => {
    
    var matches = line.match(RE_IMPACT);
    const impact1 = matches && matches[1];

    matches = line.match(RE_EFFECT);
    const impact2 = matches && matches[1].split('|')[IMPACT_INDEX_IN_EFFECT_FIELD];

    return impacts[impact1] > 0 || impacts[impact2] > 0;
};

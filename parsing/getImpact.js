'use strict';

const _ = require('lodash'),
      RE_IMPACT = /SNPEFF_IMPACT=([A-Z]+)/,
      RE_EFFECT = /;EFFECT=(.*?);/,
      // TODO read from vcf
      IMPACT_INDEX_IN_EFFECT_FIELD = 3;

module.exports = (line, impacts) => {
    
    var matches = line.match(RE_IMPACT);
    const impact1 = matches && impacts[matches[1]] > 0 && matches[1];

    matches = line.match(RE_EFFECT);
    const impact2 = matches && impacts[matches[1]] > 0 && matches[1].split('|')[IMPACT_INDEX_IN_EFFECT_FIELD];

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

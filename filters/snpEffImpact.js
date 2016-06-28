'use strict';

const RE_IMPACT = /SNPEFF_IMPACT=([A-Z]+)/;

// returns true if the SNPEFF_IMPACT field equals to one of the given impacts
module.exports = (line, impacts) => {
    
    const matches = line.match(RE_IMPACT);
    return matches && (impacts[matches[1]] === true);
};

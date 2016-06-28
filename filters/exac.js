'use strict';

const _ = require('lodash');

// returns true if at least one allele that has ExAC allele frequency < maf is present
module.exports = (genotypeStr, afs, maf, nLine) => {
    
    const hasRare = _.some(genotypeStr.split('/'), gt => {
        
        gt = +gt;
        
        if (gt === 0) {
            return false; // ignore reference alleles
        }
        
        if (afs[gt - 1] === undefined) {
            console.error(`line ${nLine}: ExAC allele frequency is missing for a present allele (${gt})! This should not happen.`);
            return false;
        }
        
        if (afs[gt - 1] === '.') {
            return false; // ignore alleles with no ExAC allele frequency
        }
        
        return afs[gt - 1] < maf;
    });

    return hasRare;
};

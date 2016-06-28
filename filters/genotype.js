'use strict';

// genotypeStr: e.g. "0/1"
// returns true if at least one alternative allele is present
// returns false if only reference alleles are present or if not genotyped
module.exports = genotypeStr => (genotypeStr !== '0/0' && genotypeStr !== './.');

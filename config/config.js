'use strict';

module.exports = {

    // path to the vcf file to be filtered
    vcf: './vcf.vcf',
    // path to the tab-delimited gene score file
    geneScoreFile: './genes.txt',

    // if set, will output a tab-delimited file with parts of the vcf and gene scores
    // if not set, will output the filtered vcf
    outputWithGeneScores: true,

    filters: {
        // whether the variant has to be present
        presentVariant: true,
        // whether to filter on ExAC maf
        exac: true,
        // whether to filter on SnpEff impact
        snpEffImpact: true,
        // whether to filter on prioritized genes as defined in geneScoreFile
        prioritizedGene: true
    },
    
    // ExAC maf threshold
    exacMaf: 0.02,
    
    // which SnpEff impacts to include
    snpEffImpacts: {
        'HIGH': true,
        'MODERATE': true,
        'MODIFIER': true
    },

    // which info fields to output from the vcf if outputWithGeneScores is set
    outputInfoFields: [
        'EXAC_AF',
        'SNPEFF_GENE_NAME',
        'SNPEFF_GENE_BIOTYPE',
        'SNPEFF_EFFECT',
        'SNPEFF_FUNCTIONAL_CLASS',
        'SNPEFF_IMPACT',
        'SNPEFF_CODON_CHANGE',
        'SNPEFF_AMINO_ACID_CHANGE'
    ]
};

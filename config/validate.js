'use strict';

const fs = require('fs'),
      _  = require('lodash');

// validates the given config object checking whether required options are set and files exist
module.exports = config => {

    const required = [
        'vcf',
        'filters'
    ];

    var notFound = _.find(required, option => !config[option]);
    if (notFound !== undefined) {
        return `config.${notFound} missing!`;
    }
    
    if (!fs.existsSync(config.vcf)) {
        return `config.vcf ${config.vcf} not found!`;
    }

    if (config.filters.exac && !config.exacMaf) {
        return 'config.exacMaf is required when config.filters.exac is set!';
    }

    if (config.filters.snpEffImpact && !config.snpEffImpacts) {
        return 'config.snpEffImpacts is required when config.filters.snpEffImpact is set!';
    }

    if (config.filters.outputWithGeneScores && !config.outputInfoFields) {
        return 'config.outputInfoFields is required when config.filters.outputWithGeneScores is set!';
    }
    
    if (config.filters.prioritizedGene || config.outputWithGeneScores) {
        if (!config.geneScoreFile) {
            return 'config.geneScoreFile is required when config.filters.prioritizedGene or config.outputWithGeneScores is set!';
        }
        if (!fs.existsSync(config.geneScoreFile)) {
            return `config.geneScoreFile ${config.geneScoreFile} not found!`;
        }
    }
    
    return;
};

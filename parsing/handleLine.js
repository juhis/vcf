'use strict';

const _ = require('lodash'),
      
      getScore = require('./getScore.js'),
      getImpact = require('./getImpact.js'),

      filterGenotype        = require('../filters/genotype.js'),
      filterExAC            = require('../filters/exac.js'),
      filterSnpEffImpact    = require('../filters/snpEffImpact.js'),
      filterPrioritizedGene = require('../filters/prioritizedGene.js');

var nLineRead = 0;
var nLineWritten = 0;

function getInfoMap(infoFields) {

    const infoMap = _
          .chain(infoFields)
          .map(field => { 
              const kv = field.split(/=/);
              return kv[0] === ''
                  ? null
                  : [kv[0], kv[1]];
          })
          .compact()
          .fromPairs()
          .value();

    return infoMap;
}

// prints the given vcf line to stdout if it passes filtering according to the given config object
// if config.outputWithGeneScores is set, prints a tab-delimited line with parts of the vcf plus gene score(s)
module.exports = function(config, genes, line) {

    if (++nLineRead % 100000 === 0) {
        console.error(`${new Date()}\t${nLineRead} lines processed`);
    }
    
    if (line.startsWith('#')) {
        return config.outputWithGeneScores
            ? null
            : console.log(line); // keep comment lines in when outputting vcf
    }
    
    // quick regex check
    if (config.filters.exac && line.search(/EXAC_AF/) < 0) {
        return; // ignore variant if ExAC allele frequency field is not present
    }
    
    const split = line.split(/\t/);
    
    if (split.length !== 10) {
        return console.error(`line ${nLineRead}: expected 10 tab-separated fields`);
    }

    const genotypeStr = split[9].split(/:/)[0];

    // filter according to config
    if ((config.filters.presentVariant && !filterGenotype(genotypeStr))
        || (config.filters.snpEffImpact && !filterSnpEffImpact(line, config.snpEffImpacts))
        || (config.filters.prioritizedGene && !filterPrioritizedGene(line, nLineRead, genes.ensgs))) {
        return;
    }

    //TODO get column number from file
    const infoMap = getInfoMap(split[7].split(/;/));

    // filter on exac allele frequency
    if (config.filters.exac) {
    
        if (infoMap['EXAC_AF'] === undefined) {
            return console.error(`line ${nLineRead}: did not find "EXAC_AF" field from the info column`);
        }
        
        const afs = infoMap['EXAC_AF'].split(/,/);
        if (!filterExAC(genotypeStr, afs, config.exacMaf, nLineRead)) {
            return;
        }
    }

    // output in a nicer format if gene scores are included
    if (config.outputWithGeneScores) {

        if (nLineWritten === 0) {
            
            // TODO get headers from vcf
            const header = _
                  .flatten(['CHROM',
                            'POS',
                            'ID',
                            'REF',
                            'ALT',
                            'GENOTYPE',
                            'GENE_SCORE',
                            'IMPACT',
                            config.outputInfoFields])
                  .join('\t');
            
            console.log(header);
        }
        
        const impact = getImpact(line, config.snpEffImpacts);
        const score = getScore(genes.scores, line, nLineRead);
        const infoValues = _.map(config.outputInfoFields, field => infoMap[field] || 'NA');

        const outLine = _
            .flatten([split.slice(0,5),
                      genotypeStr,
                      score,
                      impact,
                      infoValues])
            .join('\t');
        
        console.log(outLine);
        nLineWritten++;
        
    } else {
        
        // all filters passed
        // we celebrate this by printing the variant to standard output
        // and by going to the koffer for a lekker biertje
        console.log(line);
        nLineWritten++;
    }

};

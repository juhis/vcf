# vcf
VCF filtering and gene prioritization

### Installation

```
npm install
```

This will install dependencies (lodash).

### Configuration

See config/config.js

**vcf** points to the VCF file to be filtered

**geneScoreFile** (optional) points to a tab-delimited gene score file

**individual** (optional) is the index of the individual to filter on in the VCF file

A VCF file augmented with SnpEff and ExAC annotations is currently required as input.

### Running

```
node filterVCF config/config.js > outfile
```

If config.outputWithGeneScores is set, a tab-delimited summary of filtered variants with gene scores is printed to stdout. Otherwise a filtered vcf is printed to stdout.

Log is printed to stderr.


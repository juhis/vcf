# vcf
VCF filtering and gene prioritization

### Installation

```
npm install
```

### Configuration

See config/config.js

A VCF file augmented with SnpEff and ExAC annotations is currently required as input.

### Running

```
node filterVCF config/config.js
```

If config.outputWithGeneScores is set, a tab-delimited summary of filtered variants with gene scores is printed to stdout. Otherwise a filtered vcf is printed to stdout.

Log is printed to stderr.


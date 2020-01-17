const fs = require('fs');
const path = require('path');
const parse = require('csv-parse/lib/sync');

const mergeEcqmEhrLinks = require('../lib/merge-ecqm-ehr-links');
const mergeWebInterfaceLinks = require('../lib/merge-web-interface-links');
const mergeClaimsLinks = require('../lib/merge-claims-links');
const mergePiLinks = require('../lib/merge-pi-links');

const measuresDataPath = process.argv[2];
const ecqmEhrLinksPath = process.argv[3];
const webInterfaceLinksPath = process.argv[4];
const claimsLinksPath = process.argv[5];
const piLinksPath = process.argv[6];
const outputPath = process.argv[7];

const measuresData = fs.readFileSync(path.join(__dirname, measuresDataPath), 'utf8');
const ecqmEhrLinksData = fs.readFileSync(path.join(__dirname, ecqmEhrLinksPath), 'utf8');
const webInterfaceLinksData = fs.readFileSync(path.join(__dirname, webInterfaceLinksPath), 'utf8');
const claimsLinksData = fs.readFileSync(path.join(__dirname, claimsLinksPath), 'utf8');
const piLinksData = fs.readFileSync(path.join(__dirname, piLinksPath), 'utf8');
console.log(piLinksData);
const measures = JSON.parse(measuresData);

const parseConfig = { columns: true, skip_empty_lines: true };
const ecqmEhrLinks = parse(ecqmEhrLinksData, parseConfig);
const webIntefaceLinks = parse(webInterfaceLinksData, parseConfig);
const claimsLinks = parse(claimsLinksData, parseConfig);
const piLinks = parse(piLinksData, parseConfig);

mergeEcqmEhrLinks(measures, ecqmEhrLinks);
mergeWebInterfaceLinks(measures, webIntefaceLinks);
mergeClaimsLinks(measures, claimsLinks);
mergePiLinks(measures, piLinks);

fs.writeFileSync(path.join(__dirname, outputPath), JSON.stringify(measures, null, 2));

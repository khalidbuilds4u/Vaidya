import * as fs from 'fs';

const enFile = 'messages/en.json';
const en = JSON.parse(fs.readFileSync(enFile, 'utf8'));

en.TrustTicker = {
  points: [
    "JCI & NABH Accredited",
    "Zero Wait Times",
    "Up to 70% Cost Savings",
    "Dedicated Translators",
    "Top Indian Surgeons",
    "Seamless Visa Support"
  ]
};

fs.writeFileSync(enFile, JSON.stringify(en, null, 2));
console.log('Keys added to en.json');

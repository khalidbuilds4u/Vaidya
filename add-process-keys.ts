import * as fs from 'fs';

const enFile = 'messages/en.json';
const en = JSON.parse(fs.readFileSync(enFile, 'utf8'));

if (en.Process) {
  en.Process.stepPrefix = "Step";
  en.Process.freeTag = "100% Free";
  en.Process.supportBanner = "Your health is our priority. We are here to support you throughout your medical journey in India.";
  fs.writeFileSync(enFile, JSON.stringify(en, null, 2));
  console.log('Keys added to en.json');
} else {
  console.log('Process namespace not found in en.json');
}

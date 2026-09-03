const fs = require('fs');
const path = require('path');

const messagesDir = path.join(__dirname, 'messages');
const enPath = path.join(messagesDir, 'en.json');
const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));

function isEmpty(obj) {
  return obj && Object.keys(obj).length === 0 && obj.constructor === Object;
}

function fixMissingKeys(target, enRef, filePath) {
  let modified = false;

  function traverse(targetObj, enObj) {
    for (const key in enObj) {
      if (Array.isArray(enObj[key])) {
        // If English is an array
        if (!Array.isArray(targetObj[key])) {
          targetObj[key] = [...enObj[key]]; // copy array from English
          modified = true;
          console.log(`[${path.basename(filePath)}] Copied array "${key}"`);
        }
      } else if (typeof enObj[key] === 'object' && enObj[key] !== null) {
        // If English is an object
        if (typeof targetObj[key] !== 'object' || targetObj[key] === null || isEmpty(targetObj[key])) {
          targetObj[key] = JSON.parse(JSON.stringify(enObj[key])); // deep copy
          modified = true;
          console.log(`[${path.basename(filePath)}] Copied object "${key}"`);
        } else {
          traverse(targetObj[key], enObj[key]);
        }
      } else {
        // Primitive
        if (targetObj[key] === undefined) {
          targetObj[key] = enObj[key];
          modified = true;
          console.log(`[${path.basename(filePath)}] Copied missing string "${key}"`);
        }
      }
    }
  }

  traverse(target, enRef);
  return modified;
}

const files = fs.readdirSync(messagesDir);
for (const file of files) {
  if (file === 'en.json' || !file.endsWith('.json')) continue;
  
  const filePath = path.join(messagesDir, file);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  
  if (fixMissingKeys(data, enData, filePath)) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf8');
  }
}
console.log('Deep merge complete!');

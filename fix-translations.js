const fs = require('fs');
const path = require('path');

const messagesDir = path.join(__dirname, 'messages');
const enPath = path.join(messagesDir, 'en.json');
const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));

// Helper to extract all {} variables from a string
function extractVars(str) {
  const regex = /\{([^}]+)\}/g;
  const vars = [];
  let match;
  while ((match = regex.exec(str)) !== null) {
    vars.push(match[1]);
  }
  return vars;
}

// Deep iterate and fix
function fixTranslations(target, enRef, filePath) {
  let modified = false;

  function traverse(targetObj, enObj) {
    for (const key in targetObj) {
      if (typeof targetObj[key] === 'string' && typeof enObj[key] === 'string') {
        const enVars = extractVars(enObj[key]);
        const targetVars = extractVars(targetObj[key]);
        
        if (enVars.length > 0 && targetVars.length > 0 && JSON.stringify(enVars) !== JSON.stringify(targetVars)) {
          // If the count of variables matches, we can do a 1:1 replacement
          if (enVars.length === targetVars.length) {
            let newStr = targetObj[key];
            for (let i = 0; i < enVars.length; i++) {
              newStr = newStr.replace(`{${targetVars[i]}}`, `{${enVars[i]}}`);
            }
            if (targetObj[key] !== newStr) {
              console.log(`[${path.basename(filePath)}] Fixed: "${targetObj[key]}" -> "${newStr}"`);
              targetObj[key] = newStr;
              modified = true;
            }
          } else {
            console.warn(`[${path.basename(filePath)}] Variable count mismatch for key "${key}"`);
          }
        }
      } else if (typeof targetObj[key] === 'object' && targetObj[key] !== null && enObj[key]) {
        traverse(targetObj[key], enObj[key]);
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
  
  if (fixTranslations(data, enData, filePath)) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf8');
  }
}
console.log('Done!');

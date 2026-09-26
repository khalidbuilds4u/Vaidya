const fs = require('fs');
const path = require('path');
const messagesDir = path.join(__dirname, 'messages');

fs.readdirSync(messagesDir).forEach(file => {
  if (file.endsWith('.json')) {
    const filePath = path.join(messagesDir, file);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    
    if (data.Specialties && data.Specialties.counts) {
      if (!data.Specialties.counts["Explore Doctors"]) {
        data.Specialties.counts["Explore Doctors"] = "Explore Doctors";
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
        console.log(`Updated ${file}`);
      }
    }
  }
});

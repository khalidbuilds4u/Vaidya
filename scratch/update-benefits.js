const fs = require('fs');
const path = './messages/en.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

data.DoctorDetail.whyChooseUs.benefits = [
  "Personalized Patient Care - Support based on each patient's needs.",
  "End-to-End Assistance - Support from enquiry to treatment and return home.",
  "Professional Interpretation - Clear communication between patients and healthcare professionals.",
  "Hospital & Doctor Coordination - Assistance with appointments, consultations, and treatment coordination.",
  "Transparent Communication - Clear information and regular coordination throughout the journey.",
  "Travel & Accommodation Support - Assistance with accommodation, airport transfers, and local transportation.",
  "Dedicated Patient Assistance - Reliable support for patients and their attendants during their stay.",
  "Post-Treatment Support - Follow-up coordination and assistance after treatment."
];

fs.writeFileSync(path, JSON.stringify(data, null, 2));
console.log("Updated en.json");

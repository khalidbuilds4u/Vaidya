const fs = require('fs');
const path = require('path');

const messagesDir = path.join(__dirname, 'messages');

const translations = {
  'bn.json': ["রোগীর রুম আপগ্রেড", "চাপমুক্ত বিনামূল্যে বিমানবন্দর স্থানান্তর", "বিনামূল্যে সিটি ট্যুর", "বিনামূল্যে টেলি-পরামর্শ", "বিনামূল্যে হোটেল থাকার সুবিধা উপভোগ করুন", "দ্রুত চিকিৎসার জন্য অগ্রাধিকার অ্যাপয়েন্টমেন্ট", "দ্রুত পুনরুদ্ধারের জন্য ব্যক্তিগতকৃত যত্ন", "সার্বক্ষণিক রোগীর যত্ন"],
  'fr.json': ["Surclassement de la chambre du patient", "Transfert aéroport gratuit et sans stress", "Visite de la ville offerte", "Téléconsultations gratuites", "Profitez d'un séjour à l'hôtel offert", "Rendez-vous prioritaires pour des soins rapides", "Soins sur mesure pour un rétablissement plus rapide", "Soins aux patients 24h/24"],
  'pt.json': ["Upgrade do quarto do paciente", "Traslado gratuito do aeroporto sem estresse", "Passeio gratuito pela cidade", "Teleconsultas gratuitas", "Desfrute de uma estadia gratuita em hotel", "Consultas prioritárias para atendimento imediato", "Cuidados personalizados para uma recuperação mais rápida", "Atendimento ao paciente 24 horas"],
  'ru.json': ["Улучшение палаты пациента", "Бесплатный трансфер из аэропорта без стресса", "Бесплатная экскурсия по городу", "Бесплатные телеконсультации", "Бесплатное проживание в отеле", "Приоритетные приемы для быстрого обслуживания", "Индивидуальный уход для быстрого выздоровления", "Круглосуточный уход за пациентами"],
  'uz.json': ["Bemor xonasini yaxshilash", "Stressiz bepul aeroport transferi", "Bepul shahar bo'ylab sayohat", "Bepul tele-konsultatsiyalar", "Bepul mehmonxonada qolish", "Tezkor yordam uchun ustuvor qabullar", "Tezroq tiklanish uchun maxsus parvarish", "Kechayu kunduz bemorlarga xizmat ko'rsatish"]
};

for (const [file, benefits] of Object.entries(translations)) {
  const filePath = path.join(messagesDir, file);
  if (fs.existsSync(filePath)) {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    if (data.DoctorDetail && data.DoctorDetail.whyChooseUs) {
      data.DoctorDetail.whyChooseUs.benefits = benefits;
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf8');
      console.log(`Updated ${file}`);
    }
  }
}

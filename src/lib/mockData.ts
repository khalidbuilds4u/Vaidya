export const MOCK_HOSPITALS = [
  {
    slug: 'apollo-hospitals-delhi',
    name: 'Indraprastha Apollo Hospitals',
    city: 'New Delhi',
    image: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?q=80&w=2072&auto=format&fit=crop',
    rating: 4.8,
    beds: 1000,
    accreditations: ['JCI', 'NABH'],
    specialties: ['Cardiology', 'Oncology', 'Orthopedics', 'Neurology', 'Organ Transplant']
  },
  {
    slug: 'medanta-the-medicity',
    name: 'Medanta - The Medicity',
    city: 'Gurugram',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2053&auto=format&fit=crop',
    rating: 4.9,
    beds: 1250,
    accreditations: ['JCI', 'NABH', 'NABL'],
    specialties: ['Cardiology', 'Neurology', 'Oncology', 'Urology', 'Liver Transplant']
  },
  {
    slug: 'fortis-memorial-research-institute',
    name: 'Fortis Memorial Research Institute',
    city: 'Gurugram',
    image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=2073&auto=format&fit=crop',
    rating: 4.7,
    beds: 1000,
    accreditations: ['JCI', 'NABH'],
    specialties: ['Oncology', 'Orthopedics', 'Neurology', 'Pediatrics', 'Robotic Surgery']
  },
  {
    slug: 'max-super-speciality-saket',
    name: 'Max Super Speciality Hospital',
    city: 'New Delhi (Saket)',
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=2068&auto=format&fit=crop',
    rating: 4.8,
    beds: 500,
    accreditations: ['JCI', 'NABH'],
    specialties: ['Cardiology', 'Oncology', 'Neurology', 'Orthopedics', 'Bariatric Surgery']
  },
  {
    slug: 'manipal-hospitals-bangalore',
    name: 'Manipal Hospitals',
    city: 'Bangalore',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=2070&auto=format&fit=crop',
    rating: 4.8,
    beds: 600,
    accreditations: ['NABH', 'NABL', 'ISO'],
    specialties: ['Cardiology', 'Orthopedics', 'Oncology', 'Nephrology', 'Gastroenterology']
  },
  {
    slug: 'narayana-health-city',
    name: 'Narayana Health City',
    city: 'Bangalore',
    image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=2073&auto=format&fit=crop',
    rating: 4.9,
    beds: 1200,
    accreditations: ['JCI', 'NABH'],
    specialties: ['Cardiology', 'Cardiac Surgery', 'Oncology', 'Neurology', 'Bone Marrow Transplant']
  },
  {
    slug: 'artemis-hospital',
    name: 'Artemis Hospital',
    city: 'Gurugram',
    image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=2070&auto=format&fit=crop',
    rating: 4.7,
    beds: 400,
    accreditations: ['JCI', 'NABH'],
    specialties: ['Oncology', 'Cardiology', 'Neurology', 'Orthopedics', 'Pulmonology']
  },
  {
    slug: 'blk-max-hospital',
    name: 'BLK-Max Super Speciality Hospital',
    city: 'New Delhi',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2053&auto=format&fit=crop',
    rating: 4.6,
    beds: 650,
    accreditations: ['JCI', 'NABH'],
    specialties: ['Bone Marrow Transplant', 'Oncology', 'Cardiology', 'Liver Transplant', 'Orthopedics']
  },
  {
    slug: 'gleneagles-global-chennai',
    name: 'Gleneagles Global Health City',
    city: 'Chennai',
    image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=2073&auto=format&fit=crop',
    rating: 4.8,
    beds: 1000,
    accreditations: ['NABH', 'NABL'],
    specialties: ['Multi-Organ Transplant', 'Hepatology', 'Cardiology', 'Neurology', 'Urology']
  },
  {
    slug: 'kokilaben-hospital-mumbai',
    name: 'Kokilaben Dhirubhai Ambani Hospital',
    city: 'Mumbai',
    image: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?q=80&w=2072&auto=format&fit=crop',
    rating: 4.9,
    beds: 750,
    accreditations: ['JCI', 'NABH', 'CAP'],
    specialties: ['Oncology', 'Cardiology', 'Neurology', 'Orthopedics', 'Robotic Surgery']
  }
];

export const MOCK_DOCTORS = [
  {
    slug: 'dr-naresh-trehan',
    name: 'Dr. Naresh Trehan',
    specialty: 'Cardiovascular Surgeon',
    hospital: 'Medanta - The Medicity',
    experience: '40+ Years',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2070&auto=format&fit=crop',
    rating: 4.9,
    surgeries: 48000
  },
  {
    slug: 'dr-ashok-rajgopal',
    name: 'Dr. Ashok Rajgopal',
    specialty: 'Orthopedic Surgeon',
    hospital: 'Fortis Memorial Research',
    experience: '35+ Years',
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=2070&auto=format&fit=crop',
    rating: 4.8,
    surgeries: 30000
  },
  {
    slug: 'dr-sandeep-guleria',
    name: 'Dr. Sandeep Guleria',
    specialty: 'Kidney Transplant Surgeon',
    hospital: 'Indraprastha Apollo',
    experience: '30+ Years',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=2064&auto=format&fit=crop',
    rating: 4.9,
    surgeries: 15000
  },
  {
    slug: 'dr-b-k-rao',
    name: 'Dr. B. K. Rao',
    specialty: 'Critical Care Specialist',
    hospital: 'Sir Ganga Ram Hospital',
    experience: '40+ Years',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=2070&auto=format&fit=crop',
    rating: 4.8,
    surgeries: 20000
  },
  {
    slug: 'dr-arvinder-singh-soin',
    name: 'Dr. Arvinder Singh Soin',
    specialty: 'Liver Transplant Surgeon',
    hospital: 'Medanta - The Medicity',
    experience: '30+ Years',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=2070&auto=format&fit=crop',
    rating: 4.9,
    surgeries: 2500
  },
  {
    slug: 'dr-ramneek-mahajan',
    name: 'Dr. Ramneek Mahajan',
    specialty: 'Orthopedic Surgeon',
    hospital: 'Max Super Speciality Saket',
    experience: '25+ Years',
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=2070&auto=format&fit=crop',
    rating: 4.7,
    surgeries: 12000
  },
  {
    slug: 'dr-devi-shetty',
    name: 'Dr. Devi Shetty',
    specialty: 'Cardiac Surgeon',
    hospital: 'Narayana Health City',
    experience: '40+ Years',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2070&auto=format&fit=crop',
    rating: 5.0,
    surgeries: 15000
  },
  {
    slug: 'dr-harit-chaturvedi',
    name: 'Dr. Harit Chaturvedi',
    specialty: 'Oncologist',
    hospital: 'Max Super Speciality Saket',
    experience: '32+ Years',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=2064&auto=format&fit=crop',
    rating: 4.8,
    surgeries: 10000
  },
  {
    slug: 'dr-sudhir-vaishnav',
    name: 'Dr. Sudhir Vaishnav',
    specialty: 'Cardiologist',
    hospital: 'Kokilaben Hospital',
    experience: '35+ Years',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=2070&auto=format&fit=crop',
    rating: 4.8,
    surgeries: 18000
  },
  {
    slug: 'dr-anand-shiva',
    name: 'Dr. Anand Shiva',
    specialty: 'Neurosurgeon',
    hospital: 'Gleneagles Global Chennai',
    experience: '28+ Years',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=2070&auto=format&fit=crop',
    rating: 4.7,
    surgeries: 8000
  }
];

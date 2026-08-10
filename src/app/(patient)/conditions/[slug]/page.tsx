import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { EnquiryForm } from '@/components/patient/EnquiryForm';
import { ArrowRight, Activity, AlertCircle, Info, Stethoscope } from 'lucide-react';

const getConditionDetails = (slug: string) => {
  const decodedSlug = decodeURIComponent(slug).replace(/\s+/g, '-');
  const name = decodedSlug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  // Return full mock data based on condition
  switch (decodedSlug) {
    case 'coronary-artery-disease':
      return {
        name: 'Coronary Artery Disease',
        specialty: 'Cardiology',
        overview: 'Coronary artery disease (CAD) is the most common type of heart disease. It occurs when the arteries that supply blood to heart muscle become hardened and narrowed due to buildup of cholesterol and other material, called plaque.',
        causes: ['High blood pressure', 'High cholesterol', 'Smoking or tobacco use', 'Diabetes or insulin resistance', 'Sedentary lifestyle'],
        symptoms: ['Chest pain (angina)', 'Shortness of breath', 'Pain in the arms or shoulder', 'Fatigue', 'Heart attack'],
        treatments: [
          { name: 'Coronary Artery Bypass Graft (CABG)', slug: 'coronary-artery-bypass', description: 'A surgical procedure that diverts the flow of blood around a section of a blocked or partially blocked artery in your heart.', image: 'https://images.unsplash.com/photo-1628177142898-93e46e6d63bc?q=80&w=2070&auto=format&fit=crop' },
          { name: 'Angioplasty and Stenting', slug: 'angioplasty', description: 'A minimally invasive procedure to widen narrowed or obstructed arteries or veins.', image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop' }
        ]
      };
    case 'arrhythmia':
      return {
        name: 'Arrhythmia',
        specialty: 'Cardiology',
        overview: 'An arrhythmia is an irregular heartbeat. It means your heart beats too quickly, too slowly, or with an irregular pattern.',
        causes: ['Current or past heart attacks', 'Blocked arteries (CAD)', 'Changes to the heart muscle', 'High blood pressure', 'Overactive thyroid'],
        symptoms: ['A fluttering in your chest', 'Racing heartbeat (tachycardia)', 'Slow heartbeat (bradycardia)', 'Chest pain', 'Shortness of breath'],
        treatments: [
          { name: 'Pacemaker Implantation', slug: 'pacemaker-implantation', description: 'A small device placed in the chest or abdomen to help control abnormal heart rhythms.', image: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?q=80&w=2070&auto=format&fit=crop' },
          { name: 'Catheter Ablation', slug: 'catheter-ablation', description: 'A procedure that uses energy to make small scars in your heart tissue to prevent abnormal electrical signals.', image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=2070&auto=format&fit=crop' }
        ]
      };
    case 'heart-failure':
      return {
        name: 'Heart Failure',
        specialty: 'Cardiology',
        overview: 'Heart failure occurs when the heart muscle doesn\'t pump blood as well as it should, leading to a buildup of fluid in the lungs and other tissues.',
        causes: ['Coronary artery disease', 'High blood pressure', 'Faulty heart valves', 'Damage to the heart muscle', 'Myocarditis'],
        symptoms: ['Shortness of breath with activity or when lying down', 'Fatigue and weakness', 'Swelling in the legs, ankles and feet', 'Rapid or irregular heartbeat', 'Reduced ability to exercise'],
        treatments: [
          { name: 'Heart Transplant', slug: 'heart-transplant', description: 'A complex surgery to remove a diseased heart and replace it with a healthy donor heart.', image: 'https://images.unsplash.com/photo-1584362917165-526a968579e8?q=80&w=2071&auto=format&fit=crop' },
          { name: 'Left Ventricular Assist Device (LVAD)', slug: 'lvad-surgery', description: 'A mechanical pump implanted in patients with heart failure to help the heart pump blood.', image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2053&auto=format&fit=crop' }
        ]
      };
    case 'osteoarthritis':
      return {
        name: 'Osteoarthritis',
        specialty: 'Orthopedics',
        overview: 'Osteoarthritis is the most common form of arthritis, occurring when the protective cartilage that cushions the ends of the bones wears down over time.',
        causes: ['Older age', 'Sex (women are more likely to develop OA)', 'Obesity', 'Joint injuries', 'Repeated stress on the joint'],
        symptoms: ['Pain in the affected joints', 'Stiffness, especially upon waking', 'Tenderness when applying light pressure', 'Loss of flexibility', 'Grating sensation or popping sounds'],
        treatments: [
          { name: 'Knee Replacement Surgery', slug: 'knee-replacement', description: 'A surgical procedure to replace the weight-bearing surfaces of the knee joint.', image: 'https://images.unsplash.com/photo-1584515933487-779824d29309?q=80&w=2070&auto=format&fit=crop' },
          { name: 'Hip Replacement Surgery', slug: 'hip-replacement', description: 'Surgery to replace a worn-out or damaged hip joint with an artificial joint.', image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2080&auto=format&fit=crop' }
        ]
      };
    case 'rheumatoid-arthritis':
      return {
        name: 'Rheumatoid Arthritis',
        specialty: 'Orthopedics',
        overview: 'Rheumatoid arthritis is a chronic inflammatory disorder that can affect more than just your joints. An autoimmune condition, it occurs when your immune system mistakenly attacks your own body\'s tissues.',
        causes: ['Autoimmune response', 'Genetic predisposition', 'Environmental triggers', 'Smoking', 'Hormonal factors'],
        symptoms: ['Tender, warm, swollen joints', 'Joint stiffness that is usually worse in the mornings', 'Fatigue, fever and loss of appetite', 'Bilateral joint involvement'],
        treatments: [
          { name: 'Joint Fusion Surgery', slug: 'joint-fusion', description: 'A procedure that fuses two bones together to stabilize a joint and relieve pain.', image: 'https://images.unsplash.com/photo-1583912265927-8cb2af9f0ae1?q=80&w=2070&auto=format&fit=crop' },
          { name: 'Total Joint Replacement', slug: 'joint-replacement', description: 'Replacing severely damaged joints with prosthetics to restore function.', image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=2070&auto=format&fit=crop' }
        ]
      };
    case 'brain-tumor':
      return {
        name: 'Brain Tumor',
        specialty: 'Neurology',
        overview: 'A brain tumor is a mass or growth of abnormal cells in your brain. Many different types of brain tumors exist, some are noncancerous (benign), and some are cancerous (malignant).',
        causes: ['Genetic mutations', 'Family history of brain tumors', 'Exposure to radiation', 'No known cause for many primary tumors'],
        symptoms: ['New onset or change in pattern of headaches', 'Unexplained nausea or vomiting', 'Vision problems', 'Gradual loss of sensation or movement', 'Difficulty with balance'],
        treatments: [
          { name: 'Brain Tumor Surgery', slug: 'brain-tumor-surgery', description: 'Advanced neurosurgery techniques to remove abnormal growths in the brain.', image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?q=80&w=2072&auto=format&fit=crop' },
          { name: 'Stereotactic Radiosurgery', slug: 'radiosurgery', description: 'A non-surgical radiation therapy used to treat functional abnormalities and small tumors.', image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=2070&auto=format&fit=crop' }
        ]
      };
    case 'epilepsy':
      return {
        name: 'Epilepsy',
        specialty: 'Neurology',
        overview: 'Epilepsy is a central nervous system disorder in which brain activity becomes abnormal, causing seizures or periods of unusual behavior, sensations, and sometimes loss of awareness.',
        causes: ['Genetic influence', 'Head trauma', 'Brain conditions like strokes or tumors', 'Infectious diseases', 'Prenatal injury'],
        symptoms: ['Temporary confusion', 'A staring spell', 'Stiff muscles', 'Uncontrollable jerking movements', 'Loss of consciousness or awareness'],
        treatments: [
          { name: 'Epilepsy Surgery (Resective Surgery)', slug: 'epilepsy-surgery', description: 'Surgery to remove the small part of the brain that is causing the seizures.', image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=2070&auto=format&fit=crop' },
          { name: 'Vagus Nerve Stimulation (VNS)', slug: 'vns-therapy', description: 'A device implanted under the skin that sends electrical energy to the brain.', image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=2070&auto=format&fit=crop' }
        ]
      };
    case 'breast-cancer':
      return {
        name: 'Breast Cancer',
        specialty: 'Oncology',
        overview: 'Breast cancer is cancer that forms in the cells of the breasts. After skin cancer, it is the most common cancer diagnosed in women.',
        causes: ['Inherited genetic mutations (BRCA1/BRCA2)', 'Increasing age', 'Radiation exposure', 'Obesity', 'Hormonal therapies'],
        symptoms: ['A breast lump or thickening', 'Change in the size or shape of a breast', 'Changes to the skin over the breast', 'A newly inverted nipple', 'Peeling, scaling, or flaking skin'],
        treatments: [
          { name: 'Mastectomy / Lumpectomy', slug: 'breast-cancer-surgery', description: 'Surgical removal of the breast tissue or tumor, often followed by reconstruction.', image: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?q=80&w=2070&auto=format&fit=crop' },
          { name: 'Targeted Therapy & Chemotherapy', slug: 'targeted-therapy', description: 'Advanced pharmacological interventions to target and destroy cancer cells.', image: 'https://images.unsplash.com/photo-1584362917165-526a968579e8?q=80&w=2071&auto=format&fit=crop' }
        ]
      };
    case 'prostate-cancer':
      return {
        name: 'Prostate Cancer',
        specialty: 'Oncology',
        overview: 'Prostate cancer is cancer that occurs in the prostate, a small walnut-shaped gland in males that produces the seminal fluid that nourishes and transports sperm.',
        causes: ['Older age', 'Race/Ethnicity', 'Family history', 'Obesity', 'Genetic mutations'],
        symptoms: ['Trouble urinating', 'Decreased force in the stream of urine', 'Blood in the urine or semen', 'Bone pain', 'Losing weight without trying'],
        treatments: [
          { name: 'Radical Prostatectomy', slug: 'prostatectomy', description: 'Surgical removal of the entire prostate gland and some surrounding tissue, often using robotic assistance.', image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2080&auto=format&fit=crop' },
          { name: 'Radiation Therapy', slug: 'radiation-therapy', description: 'High-powered energy used to kill cancer cells, sometimes through implanted seeds (brachytherapy).', image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2053&auto=format&fit=crop' }
        ]
      };
  }

  // Fallback for any other condition
  return {
    name: name,
    specialty: 'Medical Condition',
    overview: `Detailed information about ${name}, including symptoms, causes, and world-class treatment options available in India.`,
    causes: ['Genetic predisposition', 'Environmental factors', 'Lifestyle choices', 'Underlying medical conditions'],
    symptoms: ['Varies by patient severity', 'Pain or discomfort', 'Fatigue', 'Changes in normal bodily function'],
    treatments: [
      {
        name: 'Standard Surgical Intervention',
        slug: 'standard-surgery',
        description: `The standard surgical approach for treating ${name}.`,
        image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=2070&auto=format&fit=crop'
      }
    ]
  };
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const condition = getConditionDetails(resolvedParams.slug);
  return {
    title: `${condition.name} - Symptoms, Causes & Treatments in India | Vaidya`,
    description: `Learn about the symptoms, causes, and best treatment options for ${condition.name}. Connect with top specialists in India.`,
  };
}

export default async function ConditionDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const condition = getConditionDetails(resolvedParams.slug);

  if (!condition) {
    notFound();
  }

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center shrink-0">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <span className="text-primary-foreground/80 font-medium tracking-wider uppercase text-sm">
                Condition Overview &bull; {condition.specialty}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {condition.name}
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/90 mb-8 max-w-2xl leading-relaxed">
              {condition.overview}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <EnquiryForm>
                <Button size="lg" className="bg-white text-primary hover:bg-slate-100 px-8 text-md h-12">
                  Get Treatment Plan
                </Button>
              </EnquiryForm>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 mt-12">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Main Content Column */}
          <div className="w-full lg:w-2/3 space-y-12">
            
            <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
              <div className="flex items-center gap-3 mb-6">
                <AlertCircle className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold">Common Symptoms</h2>
              </div>
              <ul className="grid sm:grid-cols-2 gap-4">
                {condition.symptoms.map((symptom, idx) => (
                  <li key={idx} className="flex items-start text-slate-700">
                    <div className="w-2 h-2 rounded-full bg-primary/40 mt-2 mr-3 shrink-0"></div>
                    <span className="leading-relaxed">{symptom}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
              <div className="flex items-center gap-3 mb-6">
                <Info className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold">Causes & Risk Factors</h2>
              </div>
              <ul className="grid sm:grid-cols-2 gap-4">
                {condition.causes.map((cause, idx) => (
                  <li key={idx} className="flex items-start text-slate-700">
                    <div className="w-2 h-2 rounded-full bg-primary/40 mt-2 mr-3 shrink-0"></div>
                    <span className="leading-relaxed">{cause}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Treatment Options */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <Stethoscope className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold">Available Treatments in India</h2>
              </div>
              <p className="text-slate-600 mb-6 text-lg">
                The following advanced medical procedures are available for treating {condition.name} at our top-tier partner hospitals.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-6">
                {condition.treatments.map((treatment, idx) => (
                  <Card key={idx} className="overflow-hidden hover:shadow-lg transition-shadow border-slate-200 flex flex-col h-full group">
                    <div className="h-48 overflow-hidden relative">
                      <img 
                        src={treatment.image} 
                        alt={treatment.name} 
                        className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500"
                      />
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <h3 className="font-bold text-xl mb-3">{treatment.name}</h3>
                      <p className="text-slate-600 text-sm mb-6 flex-1 line-clamp-3">{treatment.description}</p>
                      
                      <Link href={`/treatments/${treatment.slug}`}>
                        <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-white transition-colors">
                          View Procedure Details <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                    </div>
                  </Card>
                ))}
              </div>
            </section>

          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-1/3 space-y-6">
            <Card className="p-6 bg-slate-900 text-white border-0 shadow-xl rounded-2xl">
              <h3 className="text-2xl font-bold mb-4">Need an Expert Opinion?</h3>
              <p className="text-slate-300 mb-6">
                Share your medical reports with us. Our network of top specialists in India will review your case and provide a comprehensive treatment plan within 48 hours.
              </p>
              <EnquiryForm>
                <Button className="w-full bg-white text-slate-900 hover:bg-slate-100 h-12 text-md">
                  Upload Reports Now
                </Button>
              </EnquiryForm>
            </Card>

            <Card className="p-6 border-slate-200 shadow-sm rounded-2xl bg-white">
              <h3 className="font-bold text-lg mb-4">Why Choose India for this?</h3>
              <ul className="space-y-4">
                <li className="flex items-start text-sm text-slate-600">
                  <div className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-3 mt-0.5 shrink-0">✓</div>
                  Cost savings of up to 70% compared to Western countries.
                </li>
                <li className="flex items-start text-sm text-slate-600">
                  <div className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-3 mt-0.5 shrink-0">✓</div>
                  JCI & NABH accredited hospitals with state-of-the-art tech.
                </li>
                <li className="flex items-start text-sm text-slate-600">
                  <div className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-3 mt-0.5 shrink-0">✓</div>
                  Zero wait times for complex surgeries.
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

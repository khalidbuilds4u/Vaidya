import Link from 'next/link';
import { Stethoscope } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t bg-slate-50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Stethoscope className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl tracking-tight text-primary">Vaidya</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Your trusted partner for world-class medical treatment in India. We connect international patients with accredited hospitals and expert doctors.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Discover</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/hospitals" className="hover:text-primary">Top Hospitals</Link></li>
              <li><Link href="/doctors" className="hover:text-primary">Expert Doctors</Link></li>
              <li><Link href="/treatments" className="hover:text-primary">Treatments & Costs</Link></li>
              <li><Link href="/cities" className="hover:text-primary">Medical Cities</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Patient Support</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/medical-travel" className="hover:text-primary">Medical Visa Assistance</Link></li>
              <li><Link href="/medical-travel#accommodation" className="hover:text-primary">Accommodation</Link></li>
              <li><Link href="/medical-travel#interpreters" className="hover:text-primary">Language Interpreters</Link></li>
              <li><Link href="/contact" className="hover:text-primary">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/privacy" className="hover:text-primary">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-primary">Terms of Service</Link></li>
              <li><Link href="/disclaimer" className="hover:text-primary">Medical Disclaimer</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Vaidya Medical Tourism. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

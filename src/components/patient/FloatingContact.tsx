import Link from 'next/link';
import { PhoneCall, MessageCircle } from 'lucide-react';

export function FloatingContact() {
  const dummyPhone = "+1234567890";
  const dummyWhatsApp = "1234567890";

  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2 sm:gap-3 p-2 sm:p-4 pointer-events-none">
      {/* WhatsApp Button */}
      <Link 
        href={`https://wa.me/${dummyWhatsApp}`}
        target="_blank"
        rel="noopener noreferrer"
        className="pointer-events-auto flex items-center justify-end group"
      >
        <div className="flex items-center bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 hover:-translate-x-1">
          <span className="max-w-0 overflow-hidden group-hover:max-w-[100px] transition-all duration-300 ease-in-out whitespace-nowrap opacity-0 group-hover:opacity-100 font-medium pl-0 group-hover:pl-4 hidden sm:block">
            WhatsApp
          </span>
          <div className="p-2.5 sm:p-3">
            <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
        </div>
      </Link>

      {/* Call Button */}
      <Link 
        href={`tel:${dummyPhone}`}
        className="pointer-events-auto flex items-center justify-end group"
      >
        <div className="flex items-center bg-primary hover:bg-primary/90 text-white rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 hover:-translate-x-1">
          <span className="max-w-0 overflow-hidden group-hover:max-w-[100px] transition-all duration-300 ease-in-out whitespace-nowrap opacity-0 group-hover:opacity-100 font-medium pl-0 group-hover:pl-4 hidden sm:block">
            Call Now
          </span>
          <div className="p-2.5 sm:p-3">
            <PhoneCall className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
        </div>
      </Link>
    </div>
  );
}

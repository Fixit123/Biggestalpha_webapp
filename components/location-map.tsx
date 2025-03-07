import { MapPin } from 'lucide-react';

interface LocationMapProps {
  address: string;
  mapUrl: string;
}

export default function LocationMap({ 
  address = "BIGGEST ALPHA, 5 Oduduwa Crescent, Ikeja GRA, Lagos, Nigeria",
  mapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.447501341658!2d3.3350101!3d6.5943951!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b910271506487%3A0xbda903aed6f016e1!2sBIGGEST%20ALPHA!5e0!3m2!1sen!2sng!4v1710836200!5m2!1sen!2sng"
}: LocationMapProps) {
  return (
    <div className="bg-gray-100 p-4 rounded-lg">
      <h3 className="text-lg font-semibold mb-2 flex items-center">
        <MapPin className="mr-2" /> Our Location
      </h3>
      <p className="mb-2">{address}</p>
      <div className="aspect-video w-full h-[400px] md:h-[500px]">
        <iframe
          src={mapUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
} 
import React, { useState, useRef, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import Card from '../components/UI/Card';

const GOOGLE_MAPS_API_KEY = 'AIzaSyAGwLZZGYwOsj5c9_VL6trk1LDo-VFXJx8';

const containerStyle = {
  width: '100%',
  height: '500px',
};

const miniMapStyle = {
  width: '100%',
  height: '200px',
  borderRadius: '8px',
  marginTop: '1rem',
};

const hyderabadCenter = {
  lat: 17.385044,
  lng: 78.486671,
};

const hospitals = [
  {
    name: 'Apollo Hospitals',
    address: 'Jubilee Hills, Hyderabad, Telangana 500033',
    phone: '+91 40 2360 7777',
    lat: 17.4275,
    lng: 78.4346,
    reviews: [
      { user: 'Amit', text: 'Excellent care and facilities.' },
      { user: 'Priya', text: 'Doctors are very professional.' },
    ],
  },
  {
    name: 'Yashoda Hospitals',
    address: 'Alexander Road, Secunderabad, Hyderabad, Telangana 500003',
    phone: '+91 40 4567 4567',
    lat: 17.4412,
    lng: 78.4981,
    reviews: [
      { user: 'Ravi', text: 'Quick emergency response.' },
      { user: 'Sneha', text: 'Clean and well maintained.' },
    ],
  },
  {
    name: 'Care Hospitals',
    address: 'Road No. 1, Banjara Hills, Hyderabad, Telangana 500034',
    phone: '+91 40 3041 8222',
    lat: 17.4126,
    lng: 78.4336,
    reviews: [
      { user: 'Vikram', text: 'Affordable and good service.' },
      { user: 'Anjali', text: 'Friendly staff.' },
    ],
  },
  {
    name: 'KIMS Hospitals',
    address: 'Minister Road, Secunderabad, Hyderabad, Telangana 500003',
    phone: '+91 40 4488 5000',
    lat: 17.4399,
    lng: 78.4862,
    reviews: [
      { user: 'Suresh', text: 'Modern equipment and great doctors.' },
      { user: 'Meena', text: 'Parking is a bit difficult.' },
    ],
  },
  {
    name: 'Sunshine Hospitals',
    address: 'Penderghast Road, Secunderabad, Hyderabad, Telangana 500003',
    phone: '+91 40 4455 0000',
    lat: 17.4415,
    lng: 78.4922,
    reviews: [
      { user: 'Arjun', text: 'Good for orthopedic care.' },
      { user: 'Divya', text: 'Doctors explain everything clearly.' },
    ],
  },
  {
    name: 'Continental Hospitals',
    address: 'Financial District, Gachibowli, Hyderabad, Telangana 500032',
    phone: '+91 40 6700 0000',
    lat: 17.4027,
    lng: 78.3566,
    reviews: [
      { user: 'Rohit', text: 'Spacious and clean.' },
      { user: 'Neha', text: 'A bit far from city center.' },
    ],
  },
  {
    name: 'Global Hospitals',
    address: 'Lakdi Ka Pul, Hyderabad, Telangana 500004',
    phone: '+91 40 2324 4444',
    lat: 17.4062,
    lng: 78.4601,
    reviews: [
      { user: 'Kiran', text: 'Good for liver care.' },
      { user: 'Pooja', text: 'Staff is very helpful.' },
    ],
  },
  {
    name: 'AIG Hospitals',
    address: 'Gachibowli, Hyderabad, Telangana 500032',
    phone: '+91 40 4244 4222',
    lat: 17.4445,
    lng: 78.3526,
    reviews: [
      { user: 'Deepak', text: 'Excellent gastroenterology department.' },
      { user: 'Shreya', text: 'Modern facilities.' },
    ],
  },
  {
    name: "Rainbow Children's Hospital",
    address: 'Banjara Hills, Hyderabad, Telangana 500034',
    phone: '+91 40 4466 9999',
    lat: 17.4146,
    lng: 78.4372,
    reviews: [
      { user: 'Manoj', text: 'Best for children.' },
      { user: 'Lakshmi', text: 'Very caring staff.' },
    ],
  },
  {
    name: 'Osmania General Hospital',
    address: 'Afzal Gunj, Hyderabad, Telangana 500012',
    phone: '+91 40 2460 0245',
    lat: 17.3713,
    lng: 78.4746,
    reviews: [
      { user: 'Sanjay', text: 'Historic hospital.' },
      { user: 'Asha', text: 'Can be crowded.' },
    ],
  },
];

const HospitalsMap: React.FC = () => {
  const [selected, setSelected] = useState<any>(null);
  const [mapCenter, setMapCenter] = useState(hyderabadCenter);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (selected !== null) {
      const idx = hospitals.findIndex(h => h.name === selected.name);
      if (idx !== -1 && cardRefs.current[idx]) {
        cardRefs.current[idx]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setMapCenter({ lat: selected.lat, lng: selected.lng });
      }
    }
  }, [selected]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Hospitals in Hyderabad</h1>
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {hospitals.map((hosp, idx) => (
          <div
            key={idx}
            ref={el => (cardRefs.current[idx] = el)}
            className={
              'transition-shadow duration-300' +
              (selected && selected.name === hosp.name
                ? ' ring-4 ring-primary-500 shadow-lg'
                : '')
            }
            onClick={() => setSelected(hosp)}
          >
            <Card className="p-4 cursor-pointer">
              <h2 className="text-xl font-semibold text-gray-900 mb-1">{hosp.name}</h2>
              <div className="text-gray-700 mb-1">{hosp.address}</div>
              <div className="text-gray-600">Contact: {hosp.phone}</div>
            </Card>
          </div>
        ))}
      </div>
      <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={mapCenter}
          zoom={12}
        >
          {hospitals.map((hosp, idx) => (
            <Marker
              key={idx}
              position={{ lat: hosp.lat, lng: hosp.lng }}
              onClick={() => setSelected(hosp)}
            />
          ))}
        </GoogleMap>
      </LoadScript>
      {/* Modal for hospital details */}
      {selected && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full relative animate-fade-in">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl font-bold"
              onClick={() => setSelected(null)}
              aria-label="Close"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-2">{selected.name}</h2>
            <div className="mb-2 text-gray-700">{selected.address}</div>
            <div className="mb-2 text-gray-600">Contact: {selected.phone}</div>
            <div className="mb-4">
              <span className="font-semibold">Location:</span> <span>{selected.lat}, {selected.lng}</span>
            </div>
            <div className="mb-4">
              <span className="font-semibold">Coordinates:</span>
              <span className="ml-2 px-2 py-1 bg-gray-100 rounded font-mono text-sm select-all">
                Latitude: {selected.lat} <br />Longitude: {selected.lng}
              </span>
            </div>
            <div>
              <h3 className="font-semibold mb-1">Reviews:</h3>
              <ul className="list-disc pl-5 text-gray-700 mb-4">
                {selected.reviews.map((review: any, i: number) => (
                  <li key={i}><span className="font-medium">{review.user}:</span> {review.text}</li>
                ))}
              </ul>
            </div>
            {/* Mini map for selected hospital */}
            <div className="mt-4">
              <GoogleMap
                mapContainerStyle={miniMapStyle}
                center={{ lat: selected.lat, lng: selected.lng }}
                zoom={16}
                options={{
                  disableDefaultUI: true,
                  draggable: false,
                  zoomControl: false,
                  scrollwheel: false,
                }}
              >
                <Marker position={{ lat: selected.lat, lng: selected.lng }} />
              </GoogleMap>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HospitalsMap; 
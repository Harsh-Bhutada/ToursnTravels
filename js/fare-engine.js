/**
 * Gurukrupa Tours & Travels - Dynamic Fare Calculation & Fleet Engine
 * Clean, transparent tariff calculations for Outstation One-Way, Round-Trip & Local Hourly rentals.
 */

const FARE_DATABASE = {
  // Vehicle Profiles matching authentic fleet
  vehicles: [
    {
      id: 'dzire',
      name: 'Maruti Swift Dzire',
      category: 'sedan',
      tag: 'Most Popular Sedan',
      image: 'assets/images/swift-dzire.jpg',
      seats: 4,
      minPax: 1,
      maxPax: 4,
      luggage: '2 Bags + Handbags',
      ac: true,
      fuelType: 'Diesel / Petrol',
      features: ['Air Conditioned', 'Clean & Sanitized', 'Music System', 'Punctual Chauffeur'],
      ratePerKmOutstation: 12,
      minKmPerDay: 250,
      driverBataPerDay: 300,
      localPackages: {
        '4hr40km': { base: 1400, extraKm: 12, extraHr: 120 },
        '8hr80km': { base: 2200, extraKm: 12, extraHr: 120 },
        '12hr120km': { base: 3100, extraKm: 12, extraHr: 120 }
      }
    },
    {
      id: 'etios',
      name: 'Toyota Etios',
      category: 'sedan',
      tag: 'Spacious Trunk',
      image: 'assets/images/etios.png',
      seats: 4,
      minPax: 1,
      maxPax: 4,
      luggage: '3 Large Bags',
      ac: true,
      fuelType: 'Diesel',
      features: ['Large 592L Boot', 'Comfortable Rear Seat', 'Smooth Highway Ride', 'Carrier on Request'],
      ratePerKmOutstation: 12,
      minKmPerDay: 250,
      driverBataPerDay: 300,
      localPackages: {
        '4hr40km': { base: 1400, extraKm: 12, extraHr: 120 },
        '8hr80km': { base: 2200, extraKm: 12, extraHr: 120 },
        '12hr120km': { base: 3100, extraKm: 12, extraHr: 120 }
      }
    },
    {
      id: 'indica',
      name: 'Tata Indica Vista / Swift',
      category: 'hatchback',
      tag: 'Budget Friendly',
      image: 'assets/images/indica-vista.jpg',
      seats: 4,
      minPax: 1,
      maxPax: 4,
      luggage: '2 Small Bags',
      ac: true,
      fuelType: 'Diesel',
      features: ['AC Working', 'City Friendly', 'Economical Tariff'],
      ratePerKmOutstation: 11,
      minKmPerDay: 250,
      driverBataPerDay: 300,
      localPackages: {
        '4hr40km': { base: 1200, extraKm: 11, extraHr: 100 },
        '8hr80km': { base: 1900, extraKm: 11, extraHr: 100 },
        '12hr120km': { base: 2700, extraKm: 11, extraHr: 100 }
      }
    },
    {
      id: 'innova',
      name: 'Toyota Innova / Crysta',
      category: 'suv',
      tag: 'Executive Family Choice',
      image: 'assets/images/innova.jpg',
      seats: 7,
      minPax: 1,
      maxPax: 7,
      luggage: '4 Large Bags',
      ac: true,
      fuelType: 'Diesel',
      features: ['Captain Comfort Seats', 'Dual AC Vents for all rows', 'Superior Suspension', 'Highway Stability'],
      ratePerKmOutstation: 18,
      minKmPerDay: 300,
      driverBataPerDay: 400,
      localPackages: {
        '4hr40km': { base: 2200, extraKm: 18, extraHr: 200 },
        '8hr80km': { base: 3600, extraKm: 18, extraHr: 200 },
        '12hr120km': { base: 4900, extraKm: 18, extraHr: 200 }
      }
    },
    {
      id: 'scorpio',
      name: 'Mahindra Scorpio',
      category: 'suv',
      tag: 'Rugged & Sturdy',
      image: 'assets/images/scorpio.jpg',
      seats: 7,
      minPax: 1,
      maxPax: 7,
      luggage: '3 Large Bags',
      ac: true,
      fuelType: 'Diesel',
      features: ['High Ground Clearance', 'Ideal for Ghats & Temple Roads', 'Roof Carrier', 'AC Cabin'],
      ratePerKmOutstation: 15,
      minKmPerDay: 300,
      driverBataPerDay: 350,
      localPackages: {
        '4hr40km': { base: 1800, extraKm: 15, extraHr: 150 },
        '8hr80km': { base: 2800, extraKm: 15, extraHr: 150 },
        '12hr120km': { base: 3900, extraKm: 15, extraHr: 150 }
      }
    },
    {
      id: 'tavera',
      name: 'Chevrolet Tavera / Xylo',
      category: 'suv',
      tag: 'Spacious Group MUV',
      image: 'assets/images/chevrolet-tavera.png',
      seats: 8,
      minPax: 4,
      maxPax: 8,
      luggage: '4 Large Bags',
      ac: true,
      fuelType: 'Diesel',
      features: ['8-9 Seating Capacity', 'Comfortable for Large Families', 'Air Conditioned', 'Roof Luggage Carrier'],
      ratePerKmOutstation: 15,
      minKmPerDay: 300,
      driverBataPerDay: 350,
      localPackages: {
        '4hr40km': { base: 1800, extraKm: 15, extraHr: 150 },
        '8hr80km': { base: 2800, extraKm: 15, extraHr: 150 },
        '12hr120km': { base: 3900, extraKm: 15, extraHr: 150 }
      }
    },
    {
      id: 'sumo',
      name: 'Tata Sumo Gold',
      category: 'suv',
      tag: 'Economical SUV',
      image: 'assets/images/tata-sumo.jpg',
      seats: 7,
      minPax: 4,
      maxPax: 7,
      luggage: '3 Bags',
      ac: true,
      fuelType: 'Diesel',
      features: ['High Seating Position', 'Reliable Pilgrimage Vehicle', 'Spacious Cabin'],
      ratePerKmOutstation: 14,
      minKmPerDay: 300,
      driverBataPerDay: 300,
      localPackages: {
        '4hr40km': { base: 1600, extraKm: 14, extraHr: 130 },
        '8hr80km': { base: 2500, extraKm: 14, extraHr: 130 },
        '12hr120km': { base: 3500, extraKm: 14, extraHr: 130 }
      }
    },
    {
      id: 'tempo-17',
      name: '13 / 17 Seater Tempo Traveller',
      category: 'tempo',
      tag: 'Best for Pilgrimage Groups',
      image: 'assets/images/tempo-traveller.jpeg',
      seats: 17,
      minPax: 6,
      maxPax: 17,
      luggage: '10 Bags + Cargo',
      ac: true,
      fuelType: 'Diesel',
      features: ['2x1 Pushback Luxury Recliners', 'High Roof & Sound System', 'Individual AC Vents', 'Dedicated Driver'],
      ratePerKmOutstation: 25,
      minKmPerDay: 300,
      driverBataPerDay: 500,
      localPackages: {
        '4hr40km': { base: 3500, extraKm: 25, extraHr: 300 },
        '8hr80km': { base: 5500, extraKm: 25, extraHr: 300 },
        '12hr120km': { base: 7500, extraKm: 25, extraHr: 300 }
      }
    },
    {
      id: 'bus-luxury',
      name: '32 / 50 Seater Luxury Bus',
      category: 'bus',
      tag: 'Weddings & Big Tours',
      image: 'assets/images/gurukrupa-bus-rental-service.jpeg',
      seats: 45,
      minPax: 18,
      maxPax: 50,
      luggage: 'Underbelly Huge Cargo',
      ac: true,
      fuelType: 'Diesel',
      features: ['Air Suspension', 'Plush High-Back Seats', 'PA System & Mic', 'Full AC'],
      ratePerKmOutstation: 45,
      minKmPerDay: 350,
      driverBataPerDay: 800,
      localPackages: {
        '4hr40km': { base: 7000, extraKm: 45, extraHr: 500 },
        '8hr80km': { base: 11000, extraKm: 45, extraHr: 500 },
        '12hr120km': { base: 15000, extraKm: 45, extraHr: 500 }
      }
    }
  ],

  // Predefined Standard Highway Distances (km from Solapur)
  routes: [
    { to: 'Akkalkot', distance: 40, duration: '45 mins', tollEst: 0 },
    { to: 'Tuljapur', distance: 45, duration: '50 mins', tollEst: 60 },
    { to: 'Pandharpur', distance: 72, duration: '1.5 hrs', tollEst: 85 },
    { to: 'Ganagapur', distance: 100, duration: '2.5 hrs', tollEst: 110 },
    { to: 'Vijapur (Bijapur)', distance: 100, duration: '2 hrs', tollEst: 90 },
    { to: 'Kolhapur', distance: 235, duration: '4.5 hrs', tollEst: 240 },
    { to: 'Pune', distance: 250, duration: '4.5 hrs', tollEst: 260 },
    { to: 'Pune Airport', distance: 255, duration: '4.5 hrs', tollEst: 260 },
    { to: 'Hyderabad', distance: 310, duration: '5.5 hrs', tollEst: 340 },
    { to: 'Aurangabad / Sambhajinagar', distance: 310, duration: '5.5 hrs', tollEst: 320 },
    { to: 'Shirdi', distance: 330, duration: '6 hrs', tollEst: 380 },
    { to: 'Mumbai', distance: 400, duration: '7.5 hrs', tollEst: 480 },
    { to: 'Goa', distance: 420, duration: '8.5 hrs', tollEst: 420 }
  ],

  // Authentic Curated Tour Packages from Gurukrupa
  tourPackages: [
    {
      id: 'solapur-temple',
      title: 'Siddheshwar Temple & Solapur City Tour',
      destination: 'Solapur City',
      duration: 'Half Day / Full Day',
      image: 'assets/images/solapur-temple.jpg',
      shortDesc: 'Visit holy Shri Siddheshwar Temple, Solapur Bhuikot Fort, Rupabhavani Temple, and famous Solapur Chaddar market.',
      itinerary: [
        { day: 'Morning / Evening', title: 'Solapur Darshan & Sightseeing', details: 'Pickup from hotel or station. Darshan at Siddheshwar Temple in the middle of the holy lake. Visit historic Solapur Bhuikot Fort and authentic handloom textile shopping.' }
      ],
      includes: ['Dedicated City AC Cab', 'Flexible Darshan Time', 'Station / Hotel Pickup & Drop']
    },
    {
      id: 'akkalkot-temple',
      title: 'Akkalkot Swami Samarth Maharaj Darshan',
      destination: 'Akkalkot',
      duration: 'Half Day / Same Day',
      image: 'assets/images/akkalkot-temple.jpg',
      shortDesc: 'Smooth 40 km direct pilgrimage cab to Shri Swami Samarth Maharaj Vatavruksha Temple and Samadhi Math with Mahaprasad wait time.',
      itinerary: [
        { day: 'Day 1', title: 'Solapur to Akkalkot', details: 'Early departure from Solapur (40 km, 45 mins). Attend temple aarti, visit Swami Samarth Vatavruksha Mandir, Choli Khan, and Anna Chhatra for Mahaprasad. Return to Solapur.' }
      ],
      includes: ['Doorstep AC Cab', 'Driver Waiting Included', 'All Tolls Included']
    },
    {
      id: 'tuljapur-temple',
      title: 'Tuljapur Bhavani Mata Mandir Darshan',
      destination: 'Tuljapur',
      duration: 'Half Day / Same Day',
      image: 'assets/images/tuljapur-temple.jpg',
      shortDesc: 'Direct round-trip taxi to Shri Tuljabhavani Mata Shakti Peeth temple atop Yamunachala hill.',
      itinerary: [
        { day: 'Day 1', title: 'Solapur to Tuljapur', details: 'Comfortable 45 km drive on 4-lane highway. Chauffeur assists with parking near temple ghat. Ample time for VIP / General Darshan and Prasad shopping. Return drop in Solapur.' }
      ],
      includes: ['Round-trip AC Cab', 'Toll Taxes Included', 'Flexible Timing']
    },
    {
      id: 'pandharpur-temple',
      title: 'Pandharpur Shri Vitthal Rukmini Yatra',
      destination: 'Pandharpur',
      duration: 'Same Day Return',
      image: 'assets/images/pandharpur-temple.jpg',
      shortDesc: 'Sacred pilgrimage to the divine abode of Lord Panduranga (Vitthal) and Goddess Rukmini on the banks of Chandrabhaga river.',
      itinerary: [
        { day: 'Day 1', title: 'Solapur to Pandharpur', details: '72 km drive via Mohol. Holy Chandrabhaga river snan, Mukh Darshan / Padsparsha Darshan at Vitthal Rukmini Mandir, visit ISKCON temple and Pundalik Mandir. Return evening drive.' }
      ],
      includes: ['Dedicated Highway AC Cab', 'Driver Bata Included', 'Safe Parking Assistance']
    },
    {
      id: 'gangapur-temple',
      title: 'Ganagapur Dattatreya Nirguna Paduka Yatra',
      destination: 'Ganagapur',
      duration: 'Same Day Tour',
      image: 'assets/images/ganagapur.jpg',
      shortDesc: 'Spiritual tour to Shri Narasimha Saraswati Dattatreya Peeth at Ganagapur with holy Bheema-Amarja Sangam snan.',
      itinerary: [
        { day: 'Day 1', title: 'Solapur to Ganagapur (Karnataka)', details: '100 km scenic drive. Visit holy Bheema-Amarja River Sangam, seek blessings of Nirguna Padukas at the main temple, participate in Madhukari, visit Audumbar tree. Return drive to Solapur.' }
      ],
      includes: ['Interstate Permit & Tolls Included', 'Sanitized AC Cab', 'Driver Allowance']
    },
    {
      id: 'kolhapur-temple',
      title: 'Kolhapur Mahalaxmi (Ambabai) Mandir Tour',
      destination: 'Kolhapur',
      duration: '1 Day / 2 Days',
      image: 'assets/images/Kolhapur-Mahalakshmi-Temple-Timings.jpg',
      shortDesc: 'Darshan of Karveer Nivasini Shri Mahalakshmi Ambabai, Rankala Lake, Panhala Fort, and authentic Kolhapuri cuisine tour.',
      itinerary: [
        { day: 'Day 1', title: 'Solapur to Kolhapur', details: 'Morning departure via NH-166 (235 km). Reach Kolhapur for Ambabai Temple Darshan, visit Rankala Lake and famous Kolhapuri chappal markets. Return same evening or next day.' }
      ],
      includes: ['High-speed Highway AC Vehicle', 'Experienced Driver', 'Customizable Stops']
    },
    {
      id: 'narsobawadi-tour',
      title: 'Narsobawadi Dattatreya Kshetra Tour',
      destination: 'Narsobawadi (Nrisinghavadi)',
      duration: 'Same Day Tour',
      image: 'assets/images/narsobawadi.jpg',
      shortDesc: 'Holy pilgrimage to the sacred confluence of Krishna and Panchaganga rivers at Narsobawadi temple.',
      itinerary: [
        { day: 'Day 1', title: 'Solapur to Narsobawadi', details: 'Drive via Sangli/Kolhapur road to the serene riverside temple of Lord Dattatreya. Enjoy fresh traditional Kavath barfi and pedhas. Evening return to Solapur.' }
      ],
      includes: ['AC Car / SUV', 'Driver Bata & Fuel', 'Doorstep Pickup']
    },
    {
      id: 'bijapur-tour',
      title: 'Vijapur (Bijapur) Gol Gumbaz Heritage Tour',
      destination: 'Bijapur (Vijapur)',
      duration: '1 Day Excursion',
      image: 'assets/images/Gol-Gumbaz-Bijapur.jpg',
      shortDesc: 'Marvel at the Whispering Gallery at Gol Gumbaz, Ibrahim Rauza, Malik-e-Maidan cannon, and Bara Kaman.',
      itinerary: [
        { day: 'Day 1', title: 'Solapur to Bijapur Sightseeing', details: 'Quick 100 km drive. Explore world-famous Gol Gumbaz dome acoustics, Ibrahim Rauza mausoleum, ancient cannons, and historic Adil Shahi monuments. Return by evening.' }
      ],
      includes: ['Interstate Travel Cab', 'All Tolls & Border Tax Included', 'Driver Assistance']
    },
    {
      id: 'ajanta-ellora-tour',
      title: 'Ajanta & Ellora Caves UNESCO World Heritage',
      destination: 'Aurangabad • Ellora • Ajanta',
      duration: '2 Days / 3 Days',
      image: 'assets/images/ajanta-ellora-car-rental.jpg',
      shortDesc: 'Monolithic rock-cut Kailasa Temple at Ellora, Grishneshwar Jyotirlinga, Daulatabad Fort, and 2,000-year-old Buddhist caves of Ajanta.',
      itinerary: [
        { day: 'Day 1', title: 'Solapur to Aurangabad & Ellora Caves', details: 'Drive to Aurangabad (310 km). Visit Grishneshwar Jyotirlinga and Ellora Caves (Kailasa temple). Night stay in Aurangabad.' },
        { day: 'Day 2', title: 'Ajanta Caves & Return', details: 'Drive to Ajanta Caves (100 km). Marvel at world-famous murals and ancient Buddhist architecture. Return drive to Solapur.' }
      ],
      includes: ['2 Days AC Vehicle at Disposal', 'Driver Night Allowance Included', 'Tolls & Taxes']
    }
  ]
};

class FareEngine {
  /**
   * Get approximate distance based on Solapur origin
   */
  static getRouteDistance(from, to) {
    if (!to) return { distance: 150, duration: '3 hrs', tollEst: 150 };
    const normTo = to.trim().toLowerCase();

    const matched = FARE_DATABASE.routes.find(r => r.to.toLowerCase().includes(normTo) || normTo.includes(r.to.toLowerCase()));
    if (matched) {
      return matched;
    }

    // Heuristics
    let dist = 200;
    if (normTo.includes('akkalkot')) dist = 40;
    else if (normTo.includes('tuljapur')) dist = 45;
    else if (normTo.includes('pandharpur')) dist = 72;
    else if (normTo.includes('ganagapur') || normTo.includes('gangapur')) dist = 100;
    else if (normTo.includes('bijapur') || normTo.includes('vijapur')) dist = 100;
    else if (normTo.includes('kolhapur')) dist = 235;
    else if (normTo.includes('pune')) dist = 250;
    else if (normTo.includes('hyderabad')) dist = 310;
    else if (normTo.includes('aurangabad') || normTo.includes('sambhajinagar') || normTo.includes('ajanta') || normTo.includes('ellora')) dist = 310;
    else if (normTo.includes('shirdi')) dist = 330;
    else if (normTo.includes('mumbai')) dist = 400;
    else if (normTo.includes('goa')) dist = 420;

    return {
      distance: dist,
      duration: `${Math.round(dist / 55)} hrs`,
      tollEst: Math.round(dist * 1.1)
    };
  }

  /**
   * Calculate fare for a specific vehicle and trip parameters
   */
  static calculateFare(vehicle, tripConfig) {
    const {
      tripType = 'outstation-oneway',
      fromCity = 'Solapur',
      toCity = 'Pune',
      days = 1,
      localPackage = '8hr80km'
    } = tripConfig;

    const routeInfo = this.getRouteDistance(fromCity, toCity);
    let baseFare = 0;
    let billedKm = 0;
    let driverBata = 0;
    let tollEst = 0;
    let total = 0;
    let breakdown = {};

    if (tripType === 'outstation-oneway') {
      const actualKm = routeInfo.distance;
      // One way billing includes standard return base (1.75 multiplier)
      billedKm = Math.round(actualKm * 1.75);
      baseFare = billedKm * vehicle.ratePerKmOutstation;
      driverBata = vehicle.driverBataPerDay;
      tollEst = routeInfo.tollEst;
      total = baseFare + driverBata + tollEst;

      breakdown = {
        tripTypeLabel: 'Outstation One-Way Drop',
        distanceText: `${actualKm} km (Drop Route)`,
        billedDistanceText: `${billedKm} km (Base Calculation)`,
        rateText: `₹${vehicle.ratePerKmOutstation} / km`,
        baseFare: Math.round(baseFare),
        driverBata: driverBata,
        tollEst: tollEst,
        total: Math.round(total),
        terms: 'Includes fuel, clean AC vehicle & driver charges. Tolls/parking charged as per actual receipts.'
      };
    } else if (tripType === 'outstation-round') {
      const actualOneWay = routeInfo.distance;
      const totalKmActual = actualOneWay * 2;
      const numDays = Math.max(1, parseInt(days) || 1);
      const minKms = vehicle.minKmPerDay * numDays;
      billedKm = Math.max(totalKmActual, minKms);

      baseFare = billedKm * vehicle.ratePerKmOutstation;
      driverBata = vehicle.driverBataPerDay * numDays;
      tollEst = routeInfo.tollEst * 2;
      total = baseFare + driverBata + tollEst;

      breakdown = {
        tripTypeLabel: `Outstation Round-Trip (${numDays} Day${numDays > 1 ? 's' : ''})`,
        distanceText: `${totalKmActual} km (Round Route)`,
        billedDistanceText: `${billedKm} km (Min ${vehicle.minKmPerDay} km/day)`,
        rateText: `₹${vehicle.ratePerKmOutstation} / km`,
        baseFare: Math.round(baseFare),
        driverBata: driverBata,
        tollEst: tollEst,
        total: Math.round(total),
        terms: `Cab remains at your disposal. Min ${vehicle.minKmPerDay} km billed per calendar day. Tolls/parking at actuals.`
      };
    } else if (tripType === 'local-hourly') {
      const pkg = vehicle.localPackages[localPackage] || vehicle.localPackages['8hr80km'];
      baseFare = pkg.base;
      driverBata = 0; // Included in local
      tollEst = 0;
      total = baseFare;

      const pkgNames = {
        '4hr40km': '4 Hours / 40 Km Local Package',
        '8hr80km': '8 Hours / 80 Km Full Day City Package',
        '12hr120km': '12 Hours / 120 Km Extended City Package'
      };

      breakdown = {
        tripTypeLabel: 'Solapur Local City Rental',
        distanceText: localPackage.split('hr')[1].replace('km', ' Km Included'),
        billedDistanceText: pkgNames[localPackage] || 'City Package',
        rateText: `Extra: ₹${pkg.extraKm}/km, ₹${pkg.extraHr}/hr`,
        baseFare: Math.round(baseFare),
        driverBata: 0,
        tollEst: 0,
        total: Math.round(total),
        terms: `Includes ${localPackage.replace('hr', ' hrs / ').replace('km', ' km')}. Additional km @ ₹${pkg.extraKm}/km, extra hour @ ₹${pkg.extraHr}/hr.`
      };
    }

    return {
      vehicleId: vehicle.id,
      vehicleName: vehicle.name,
      category: vehicle.category,
      seats: vehicle.seats,
      minPax: vehicle.minPax,
      maxPax: vehicle.maxPax,
      luggage: vehicle.luggage,
      image: vehicle.image,
      tag: vehicle.tag,
      features: vehicle.features,
      ratePerKm: vehicle.ratePerKmOutstation,
      breakdown
    };
  }

  /**
   * Filter and return vehicles tailored strictly for the chosen passenger count
   */
  static getFilteredFleetQuotes(tripConfig) {
    const pax = parseInt(tripConfig.passengers) || 4;

    // Filter compatible vehicles
    let suitableVehicles = FARE_DATABASE.vehicles.filter(v => {
      if (pax <= 4) {
        // For 1-4 passengers: show Sedans, Hatchbacks, plus allow 7-seater Innova as a premium option
        return v.maxPax >= 4 && v.maxPax <= 7;
      } else if (pax <= 7) {
        // For 5-7 passengers: show only SUVs & MUVs (Innova, Scorpio, Tavera, Sumo)
        return v.maxPax >= 7 && v.maxPax <= 8;
      } else if (pax <= 17) {
        // For 8-17 passengers: show Tempo Travellers
        return v.category === 'tempo';
      } else {
        // For 18+ passengers: show Luxury Buses
        return v.category === 'bus';
      }
    });

    if (suitableVehicles.length === 0) {
      suitableVehicles = FARE_DATABASE.vehicles;
    }

    return suitableVehicles.map(v => this.calculateFare(v, tripConfig));
  }
}

// Global exports
window.FARE_DATABASE = FARE_DATABASE;
window.FareEngine = FareEngine;

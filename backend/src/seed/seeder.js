import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Country from '../models/Country.js';
import Destination from '../models/Destination.js';
import TourPackage from '../models/TourPackage.js';
import Hotel from '../models/Hotel.js';
import Activity from '../models/Activity.js';
import Coupon from '../models/Coupon.js';
import BlogPost from '../models/BlogPost.js';
import Offer from '../models/Offer.js';
import { createSlug } from '../utils/slugify.js';

dotenv.config();

const seedData = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/dream_miles';
    await mongoose.connect(mongoUri);
    console.log('[Seeder]: Connected to MongoDB...');

    // Clear existing data
    await Promise.all([
      User.deleteMany(),
      Country.deleteMany(),
      Destination.deleteMany(),
      TourPackage.deleteMany(),
      Hotel.deleteMany(),
      Activity.deleteMany(),
      Coupon.deleteMany(),
      BlogPost.deleteMany(),
      Offer.deleteMany(),
    ]);

    console.log('[Seeder]: Cleared old collection data.');

    // 1. Seed Admin & Test Users
    const adminUser = await User.create({
      name: 'Dream Miles Administrator',
      email: process.env.ADMIN_EMAIL || 'admin@dreammiles.com',
      password: process.env.ADMIN_PASSWORD || 'Admin@123456',
      role: 'Admin',
      phone: '+91 98765 43210',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    });

    const sampleUser = await User.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'User@123456',
      role: 'User',
      phone: '+1 555 019 2831',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    });

    console.log('[Seeder]: Created Admin and Sample User.');

    // 2. Seed Countries
    const countriesData = [
      {
        name: 'India',
        isoAlpha2: 'IN',
        isoAlpha3: 'IND',
        countryCode: '+91',
        capital: 'New Delhi',
        continent: 'Asia',
        region: 'Southern Asia',
        currency: 'INR',
        currencySymbol: '₹',
        primaryLanguages: ['Hindi', 'English'],
        flag: '🇮🇳',
        image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1200&q=80',
        shortDescription: 'Land of royal palaces, vibrant cultures, backwaters, and ancient heritage.',
        description: 'India offers an unparalleled mosaic of landscapes, from the snow-capped Himalayas in the north to the sun-kissed beaches of Goa and tranquility of Kerala backwaters.',
        bestTimeToVisit: 'October to March',
        visaInfo: 'e-Visa available for over 160 nationalities. Instant approval online.',
        timezone: 'GMT+5:30',
        popularActivities: ['Palace Tours', 'Desert Safari', 'Houseboat Stay', 'Himalayan Trekking'],
        averageTripDuration: '7 - 14 Days',
        travelDifficulty: 'Easy',
        safetyInfo: 'Generally safe for tourists. Follow standard travel precautions.',
        entryRequirements: 'Valid passport with at least 6 months validity, approved e-Visa or sticker visa.',
        isFeatured: true,
      },
      {
        name: 'France',
        isoAlpha2: 'FR',
        isoAlpha3: 'FRA',
        countryCode: '+33',
        capital: 'Paris',
        continent: 'Europe',
        region: 'Western Europe',
        currency: 'EUR',
        currencySymbol: '€',
        primaryLanguages: ['French'],
        flag: '🇫🇷',
        image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80',
        shortDescription: 'The pinnacle of art, gastronomy, fashion, and romantic Parisian architecture.',
        description: 'From iconic Eiffel Tower views to sunny Mediterranean coastlines of Nice and vineyards of Bordeaux, France captivates every traveler with timeless charm.',
        bestTimeToVisit: 'April to October',
        visaInfo: 'Schengen Visa required for non-EU citizens.',
        timezone: 'GMT+1',
        popularActivities: ['Eiffel Tower Dinner', 'Louvre Museum Tour', 'Vineyard Tasting', 'French Riviera Cruise'],
        averageTripDuration: '6 - 10 Days',
        travelDifficulty: 'Easy',
        safetyInfo: 'High level of tourist safety. Be aware of pickpockets near major attractions.',
        entryRequirements: 'Valid passport & Schengen Visa if applicable.',
        isFeatured: true,
      },
      {
        name: 'Japan',
        isoAlpha2: 'JP',
        isoAlpha3: 'JPN',
        countryCode: '+81',
        capital: 'Tokyo',
        continent: 'Asia',
        region: 'Eastern Asia',
        currency: 'JPY',
        currencySymbol: '¥',
        primaryLanguages: ['Japanese'],
        flag: '🇯🇵',
        image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80',
        shortDescription: 'A seamless blend of ultra-futuristic cities, ancient temples, and cherry blossoms.',
        description: 'Explore bullet trains, serene Shinto shrines in Kyoto, Mount Fuji views, and world-renowned culinary excellence.',
        bestTimeToVisit: 'March to May & September to November',
        visaInfo: 'Visa-free entry for up to 90 days for 68 countries. e-Visa available.',
        timezone: 'GMT+9',
        popularActivities: ['Bullet Train Journey', 'Cherry Blossom Viewing', 'Onsen Hot Spring Spa', 'Tea Ceremony'],
        averageTripDuration: '7 - 12 Days',
        travelDifficulty: 'Easy',
        safetyInfo: 'One of the safest countries in the world with virtually non-existent crime.',
        entryRequirements: 'Valid passport and travel declaration.',
        isFeatured: true,
      },
      {
        name: 'United Arab Emirates',
        isoAlpha2: 'AE',
        isoAlpha3: 'ARE',
        countryCode: '+971',
        capital: 'Abu Dhabi',
        continent: 'Middle East',
        region: 'Middle East',
        currency: 'AED',
        currencySymbol: 'AED',
        primaryLanguages: ['Arabic', 'English'],
        flag: '🇦🇪',
        image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80',
        shortDescription: 'Futuristic skyscrapers, luxury shopping, desert dunes, and world-class resorts.',
        description: 'Home to Burj Khalifa, Palm Jumeirah, Louvre Abu Dhabi, and thrilling desert safaris.',
        bestTimeToVisit: 'November to March',
        visaInfo: 'Visa on arrival for 70+ nationalities or 30-day tourist visa online.',
        timezone: 'GMT+4',
        popularActivities: ['Burj Khalifa Observation Deck', 'Desert Dune Bashing', 'Dhow Cruise Dinner', 'Shopping Festivals'],
        averageTripDuration: '4 - 7 Days',
        travelDifficulty: 'Easy',
        safetyInfo: 'Extremely safe with strict law enforcement.',
        entryRequirements: 'Valid passport & health declaration.',
        isFeatured: true,
      },
      {
        name: 'Switzerland',
        isoAlpha2: 'CH',
        isoAlpha3: 'CHE',
        countryCode: '+41',
        capital: 'Bern',
        continent: 'Europe',
        region: 'Central Europe',
        currency: 'CHF',
        currencySymbol: 'CHF',
        primaryLanguages: ['German', 'French', 'Italian'],
        flag: '🇨🇭',
        image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80',
        shortDescription: 'Alpine peak majesty, crystalline lakes, scenic train rides, and luxury watchmakers.',
        description: 'Ride the Glacier Express, gaze upon the Matterhorn, stroll through Lucerne, and indulge in world-class Swiss chocolates.',
        bestTimeToVisit: 'December to March (Skiing) & June to September (Hiking)',
        visaInfo: 'Schengen Visa required.',
        timezone: 'GMT+1',
        popularActivities: ['Jungfraujoch Top of Europe', 'Glacier Express Scenic Train', 'Lake Lucerne Cruise', 'Alpine Skiing'],
        averageTripDuration: '7 - 10 Days',
        travelDifficulty: 'Easy',
        safetyInfo: 'Exceptionally safe and clean environment.',
        entryRequirements: 'Passport valid 3+ months beyond intended stay.',
        isFeatured: true,
      },
      {
        name: 'Indonesia',
        isoAlpha2: 'ID',
        isoAlpha3: 'IDN',
        countryCode: '+62',
        capital: 'Jakarta',
        continent: 'Asia',
        region: 'South-Eastern Asia',
        currency: 'IDR',
        currencySymbol: 'Rp',
        primaryLanguages: ['Indonesian', 'English'],
        flag: '🇮🇩',
        image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80',
        shortDescription: 'Tropical paradise featuring Bali beaches, volcanic mountains, and lush jungle sanctuaries.',
        description: 'Discover sacred temples in Ubud, surf seminyak waves, and witness sunrises over Mount Bromo.',
        bestTimeToVisit: 'April to October',
        visaInfo: 'Visa on Arrival (VoA) available for 86 countries.',
        timezone: 'GMT+8',
        popularActivities: ['Ubud Rice Terrace Tour', 'Scuba Diving in Nusa Penida', 'Ketaq Fire Dance', 'Waterfall Trekking'],
        averageTripDuration: '6 - 9 Days',
        travelDifficulty: 'Easy',
        safetyInfo: 'Safe tropical destination. Practice standard beach safety.',
        entryRequirements: 'Passport with at least 6 months validity.',
        isFeatured: true,
      },
    ];

    const countries = await Promise.all(
      countriesData.map(async (c) => {
        const slug = createSlug(c.name);
        return await Country.create({ ...c, slug });
      })
    );

    const countryMap = countries.reduce((acc, c) => ({ ...acc, [c.name]: c }), {});
    console.log(`[Seeder]: Created ${countries.length} Countries.`);

    // 3. Seed Destinations
    const destinationsData = [
      {
        name: 'Jaipur',
        country: countryMap['India']._id,
        countryName: 'India',
        stateProvince: 'Rajasthan',
        city: 'Jaipur',
        heroImage: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1200&q=80',
        gallery: [
          'https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1603262110263-fb0112e7cc33?auto=format&fit=crop&w=800&q=80',
        ],
        shortDescription: 'The Pink City of grand forts, royal palaces, and vibrant artisan bazaars.',
        description: 'Jaipur is the capital of Rajasthan, famous for Hawa Mahal, Amber Fort, City Palace, and rich cultural traditions.',
        latitude: 26.9124,
        longitude: 75.7873,
        rating: 4.9,
        popularityScore: 98,
        bestTime: 'October to March',
        startingPrice: 399,
        categoryTag: 'Popular',
        isFeatured: true,
      },
      {
        name: 'Udaipur',
        country: countryMap['India']._id,
        countryName: 'India',
        stateProvince: 'Rajasthan',
        city: 'Udaipur',
        heroImage: 'https://images.unsplash.com/photo-1615836245337-f5b9b2303f1c?auto=format&fit=crop&w=1200&q=80',
        gallery: ['https://images.unsplash.com/photo-1568495248636-6432b97bd949?auto=format&fit=crop&w=800&q=80'],
        shortDescription: 'The Venice of the East, famed for serene Lake Pichola and regal lake palaces.',
        description: 'Nestled beside lush Aravalli hills, Udaipur offers romantic boat rides, intricate marble architecture, and royal heritage stays.',
        latitude: 24.5854,
        longitude: 73.7125,
        rating: 4.9,
        popularityScore: 96,
        bestTime: 'October to March',
        startingPrice: 450,
        categoryTag: 'Honeymoon',
        isFeatured: true,
      },
      {
        name: 'Goa',
        country: countryMap['India']._id,
        countryName: 'India',
        stateProvince: 'Goa',
        city: 'Panaji',
        heroImage: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80',
        gallery: ['https://images.unsplash.com/photo-1587922546307-776227941871?auto=format&fit=crop&w=800&q=80'],
        shortDescription: 'Golden beaches, Portuguese architecture, water sports, and lively nightlife.',
        description: 'Goa features pristine coastlines, historic churches in Old Goa, spice plantations, and laid-back coastal vibes.',
        latitude: 15.2993,
        longitude: 74.124,
        rating: 4.8,
        popularityScore: 99,
        bestTime: 'November to February',
        startingPrice: 299,
        categoryTag: 'Beach',
        isFeatured: true,
      },
      {
        name: 'Paris',
        country: countryMap['France']._id,
        countryName: 'France',
        stateProvince: 'Île-de-France',
        city: 'Paris',
        heroImage: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80',
        gallery: ['https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=800&q=80'],
        shortDescription: 'The global capital of romance, art, haute couture, and world-renowned gastronomy.',
        description: 'Immerse yourself in Paris with visits to the Eiffel Tower, Notre-Dame Cathedral, Louvre Museum, and charming Seine riverfront cafes.',
        latitude: 48.8566,
        longitude: 2.3522,
        rating: 4.9,
        popularityScore: 100,
        bestTime: 'April to October',
        startingPrice: 899,
        categoryTag: 'Luxury',
        isFeatured: true,
      },
      {
        name: 'Tokyo',
        country: countryMap['Japan']._id,
        countryName: 'Japan',
        stateProvince: 'Kanto',
        city: 'Tokyo',
        heroImage: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80',
        gallery: ['https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80'],
        shortDescription: 'Electric neon lights, historic shrines, Michelin culinary spots, and pop culture.',
        description: 'Tokyo seamlessly blends ultra-modern skyscrapers in Shinjuku with peaceful gardens surrounding Senso-ji Temple in Asakusa.',
        latitude: 35.6762,
        longitude: 139.6503,
        rating: 4.9,
        popularityScore: 97,
        bestTime: 'March to May & September to November',
        startingPrice: 999,
        categoryTag: 'Trending',
        isFeatured: true,
      },
      {
        name: 'Dubai',
        country: countryMap['United Arab Emirates']._id,
        countryName: 'United Arab Emirates',
        stateProvince: 'Dubai',
        city: 'Dubai',
        heroImage: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80',
        gallery: ['https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&w=800&q=80'],
        shortDescription: 'Ultra-luxurious metropolis featuring Burj Khalifa, mega malls, and golden sand dunes.',
        description: 'Experience futuristic architecture, gold souks, desert safaris with camel rides, and world-class luxury beach resorts.',
        latitude: 25.2048,
        longitude: 55.2708,
        rating: 4.8,
        popularityScore: 99,
        bestTime: 'November to March',
        startingPrice: 699,
        categoryTag: 'Luxury',
        isFeatured: true,
      },
      {
        name: 'Zurich',
        country: countryMap['Switzerland']._id,
        countryName: 'Switzerland',
        stateProvince: 'Zurich',
        city: 'Zurich',
        heroImage: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=1200&q=80',
        gallery: ['https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=800&q=80'],
        shortDescription: 'Picturesque alpine lake views, historic Old Town, and premier luxury shopping.',
        description: 'Zurich offers pristine lake waters, snow-dusted peak backdrops, charming cobblestone lanes, and gateways to the Swiss Alps.',
        latitude: 47.3769,
        longitude: 8.5417,
        rating: 4.9,
        popularityScore: 94,
        bestTime: 'May to September & Dec to Feb',
        startingPrice: 1199,
        categoryTag: 'Adventure',
        isFeatured: true,
      },
      {
        name: 'Bali',
        country: countryMap['Indonesia']._id,
        countryName: 'Indonesia',
        stateProvince: 'Bali',
        city: 'Denpasar',
        heroImage: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80',
        gallery: ['https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=800&q=80'],
        shortDescription: 'Island of the Gods featuring lush terraced rice fields, sacred temples, and turquoise waves.',
        description: 'Bali presents serene yoga retreats in Ubud, cliffside Uluwatu sunset views, beach clubs in Seminyak, and volcanic hiking.',
        latitude: -8.4095,
        longitude: 115.1889,
        rating: 4.9,
        popularityScore: 98,
        bestTime: 'April to October',
        startingPrice: 499,
        categoryTag: 'Honeymoon',
        isFeatured: true,
      },
    ];

    const destinations = await Promise.all(
      destinationsData.map(async (d) => {
        const slug = createSlug(d.name);
        return await Destination.create({ ...d, slug });
      })
    );

    const destMap = destinations.reduce((acc, d) => ({ ...acc, [d.name]: d }), {});
    console.log(`[Seeder]: Created ${destinations.length} Destinations.`);

    // 4. Seed Tour Packages
    const packagesData = [
      {
        title: 'Rajasthan Royal Heritage Tour',
        destination: destMap['Jaipur']._id,
        destinationName: 'Jaipur, Jodhpur, Udaipur, Jaisalmer',
        country: countryMap['India']._id,
        countryName: 'India',
        category: 'Cultural',
        days: 7,
        nights: 6,
        price: 55000,
        childPrice: 35000,
        infantPrice: 10000,
        discountPercentage: 15,
        coverImage: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1200&q=80',
        gallery: [
          'https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1615836245337-f5b9b2303f1c?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1603262110263-fb0112e7cc33?auto=format&fit=crop&w=800&q=80',
        ],
        overview: 'Experience the regal splendor of Rajasthan. From the iconic pink facades of Jaipur and golden sands of Jaisalmer to the serene lakes of Udaipur, journey through centuries of royal heritage.',
        highlights: [
          'Elephant / Jeep ride up to Amber Fort in Jaipur',
          'Sunset boat cruise on Lake Pichola in Udaipur',
          'Overnight desert camp stay with folk dance & camel safari in Jaisalmer',
          'Guided tour of Mehrangarh Fort in Jodhpur',
          'Heritage 4-star palace hotel accommodations',
        ],
        inclusions: [
          '6 Nights Accommodation in Heritage 4-Star Hotels',
          'Daily Buffet Breakfast and Royal Rajasthani Dinners',
          'AC Private Sedan / SUV for all transfers and sightseeing',
          'All monument entry tickets & English speaking tour guide',
          'Jaisalmer desert camp experience with folk performance',
        ],
        exclusions: ['Flight / Train tickets', 'Personal expenses & tips', 'GST 5%'],
        itinerary: [
          {
            day: 1,
            title: 'Arrival in Jaipur - The Pink City Welcome',
            description: 'Arrive at Jaipur International Airport or Railway station. Pick up by private chauffeur and transfer to heritage hotel. Evening visit to Chokhi Dhani for cultural performance and traditional dinner.',
            meals: 'Dinner included',
            hotel: 'Shahpura House / Similar Heritage Property',
            activities: ['Airport Pick up', 'Chokhi Dhani Cultural Night'],
          },
          {
            day: 2,
            title: 'Jaipur Full Day Forts & Palaces Exploration',
            description: 'Visit Amber Fort with optional elephant ride, photo stop at Jal Mahal, explore City Palace museum and astronomical marvel Jantar Mantar. Walk through Johari Bazaar for handcrafted silver jewelry.',
            meals: 'Breakfast included',
            hotel: 'Shahpura House',
            activities: ['Amber Fort Tour', 'Hawa Mahal Photo Stop', 'City Palace Visit'],
          },
          {
            day: 3,
            title: 'Jaipur to Jodhpur - The Blue City',
            description: 'Drive to Jodhpur (approx. 5 hours). Check in at hotel and visit Mehrangarh Fort standing tall over the blue houses, followed by Jaswant Thada marble cenotaph.',
            meals: 'Breakfast & Dinner included',
            hotel: 'Ranbanka Palace Jodhpur',
            activities: ['Mehrangarh Fort Tour', 'Jaswant Thada Visit'],
          },
          {
            day: 4,
            title: 'Jodhpur to Jaisalmer Desert Gateway',
            description: 'Travel to Jaisalmer, the Golden City. Check in at desert resort near Sam Sand Dunes. Enjoy sunset camel safari across golden dunes and traditional Kalbelia dance performance around campfire.',
            meals: 'Breakfast & Camp Dinner included',
            hotel: 'Desert Heritage Resort & Camp Jaisalmer',
            activities: ['Camel Safari', 'Sunset on Dunes', 'Cultural Folk Dance'],
          },
          {
            day: 5,
            title: 'Jaisalmer Fort & Haveli Exploration',
            description: 'Explore the living Jaisalmer Fort (Sonar Qila) housing intricate Jain temples and ancient residences. Tour Patwon Ki Haveli and Nathmal Ki Haveli.',
            meals: 'Breakfast included',
            hotel: 'Fort Rajwada Jaisalmer',
            activities: ['Jaisalmer Fort Tour', 'Haveli Walking Tour'],
          },
          {
            day: 6,
            title: 'Jaisalmer to Udaipur - City of Lakes',
            description: 'Scenic drive to Udaipur visiting Ranakpur Jain Temple on the way. Check in at lakefront resort in Udaipur and enjoy a relaxing evening Lake Pichola boat ride.',
            meals: 'Breakfast included',
            hotel: 'Fateh Garh Resort Udaipur',
            activities: ['Ranakpur Temple Visit', 'Sunset Lake Pichola Boat Ride'],
          },
          {
            day: 7,
            title: 'Udaipur Sightseeing & Departure',
            description: 'Visit City Palace Udaipur, Jagdish Temple, and Saheliyon Ki Bari gardens. Transfer to Udaipur airport for return flight.',
            meals: 'Breakfast included',
            hotel: 'Check out',
            activities: ['City Palace Tour', 'Airport Drop-off'],
          },
        ],
        mealsIncluded: 'Breakfast & Dinner',
        transportation: 'AC Private SUV with Driver',
        pickupLocation: 'Jaipur Airport / Railway Station',
        dropLocation: 'Udaipur Airport',
        maxGroupSize: 12,
        difficulty: 'Easy',
        bestSeason: 'October - March',
        rating: 4.9,
        reviewsCount: 48,
        availableDates: ['2026-09-10', '2026-10-01', '2026-10-20', '2026-11-05'],
        availableSeats: 16,
        isFeatured: true,
        isTrending: true,
      },
      {
        title: 'Bali Escape & Tropical Paradise',
        destination: destMap['Bali']._id,
        destinationName: 'Bali, Ubud, Seminyak',
        country: countryMap['Indonesia']._id,
        countryName: 'Indonesia',
        category: 'Honeymoon',
        days: 6,
        nights: 5,
        price: 68000,
        childPrice: 42000,
        infantPrice: 12000,
        discountPercentage: 20,
        coverImage: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80',
        gallery: [
          'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&w=800&q=80',
        ],
        overview: 'Escape to tropical bliss in Bali! Spend romantic days amongst Ubud’s emerald rice terraces, sacred monkey forest sanctuaries, and Seminyak’s vibrant sunset beach clubs.',
        highlights: [
          'Private pool villa stay in Ubud & beachfront hotel in Seminyak',
          'Tegallalang Rice Terrace swing photo experience',
          'Sunset dinner near cliffside Tanah Lot Temple',
          'Fast boat excursion to Nusa Penida island & Kelingking Beach',
          'Balinese couples aromatherapy spa massage',
        ],
        inclusions: [
          '3 Nights Private Pool Villa in Ubud + 2 Nights Beach Resort Seminyak',
          'Daily Floating Breakfast in Ubud Villa & Daily Buffet Breakfast',
          'Nusa Penida Day Trip with snorkeling equipment & lunch',
          'All private air-conditioned vehicle transfers throughout Bali',
          '1-Hour Balinese Massage Session for travelers',
        ],
        exclusions: ['International airfare', 'Personal expenses', 'Visa on Arrival fee (~$35)'],
        itinerary: [
          {
            day: 1,
            title: 'Arrival in Bali - Welcome to Ubud',
            description: 'Arrive at Ngurah Rai International Airport (DPS). Private driver pickup with flower garland welcome. Transfer to luxury villa in Ubud.',
            meals: 'Welcome Drink & Dinner',
            hotel: 'The Kayon Jungle Resort Ubud',
            activities: ['Airport Pick up', 'Villa Check-in'],
          },
          {
            day: 2,
            title: 'Ubud Rice Terrace, Bali Swing & Waterfalls',
            description: 'Visit Tegallalang Rice Terraces, take breathtaking pictures on the famous Bali jungle swing, visit sacred Monkey Forest and Tegenungan Waterfall.',
            meals: 'Floating Breakfast & Lunch',
            hotel: 'The Kayon Jungle Resort Ubud',
            activities: ['Tegallalang Rice Terrace', 'Bali Swing', 'Monkey Forest'],
          },
          {
            day: 3,
            title: 'Nusa Penida Island Paradise Day Tour',
            description: 'Early morning fast boat to Nusa Penida island. Visit iconic Kelingking T-Rex Beach, Broken Beach, Angel’s Billabong, and snorkel with Manta Rays.',
            meals: 'Breakfast & Island Lunch',
            hotel: 'The Kayon Jungle Resort Ubud',
            activities: ['Nusa Penida Boat Tour', 'Kelingking Beach', 'Snorkeling'],
          },
          {
            day: 4,
            title: 'Transfer to Seminyak & Tanah Lot Sunset',
            description: 'Check out from Ubud and drive south to Seminyak. Afternoon visit to iconic Tanah Lot sea temple for spectacular sunset views, followed by dinner at Seminyak beach club.',
            meals: 'Breakfast included',
            hotel: 'The Seminyak Beach Resort & Spa',
            activities: ['Tanah Lot Sunset Tour', 'Beach Club Evening'],
          },
          {
            day: 5,
            title: 'Water Sports & Uluwatu Kecak Fire Dance',
            description: 'Morning banana boat & jet ski session at Tanjung Benoa beach. Evening visit to Uluwatu Temple perched on 70-meter cliffs and watch the dramatic Kecak Fire Dance.',
            meals: 'Breakfast included',
            hotel: 'The Seminyak Beach Resort & Spa',
            activities: ['Water Sports', 'Uluwatu Temple Visit', 'Kecak Fire Dance'],
          },
          {
            day: 6,
            title: 'Balinese Spa & Farewell Bali',
            description: 'Enjoy a relaxing 60-minute Balinese massage session. Souvenir shopping at Kuta Art Market before transfer to airport.',
            meals: 'Breakfast included',
            hotel: 'Check out',
            activities: ['Spa Session', 'Airport Transfer'],
          },
        ],
        mealsIncluded: 'Breakfast & Selected Lunches',
        transportation: 'Private AC Car with English Guide',
        pickupLocation: 'Bali DPS Airport',
        dropLocation: 'Bali DPS Airport',
        maxGroupSize: 10,
        difficulty: 'Easy',
        bestSeason: 'April - October',
        rating: 4.9,
        reviewsCount: 62,
        availableDates: ['2026-09-05', '2026-09-20', '2026-10-10', '2026-11-01'],
        availableSeats: 12,
        isFeatured: true,
        isTrending: true,
      },
      {
        title: 'Dubai Luxury & Desert Safari Experience',
        destination: destMap['Dubai']._id,
        destinationName: 'Dubai & Abu Dhabi',
        country: countryMap['United Arab Emirates']._id,
        countryName: 'United Arab Emirates',
        category: 'Luxury',
        days: 5,
        nights: 4,
        price: 85000,
        childPrice: 55000,
        infantPrice: 15000,
        discountPercentage: 10,
        coverImage: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80',
        gallery: [
          'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=800&q=80',
        ],
        overview: 'Immerse in the glamorous lifestyle of the UAE. Experience At The Top Burj Khalifa, thrilling 4x4 desert dune bashing, Marina Dhow cruises, and a day trip to Sheikh Zayed Grand Mosque in Abu Dhabi.',
        highlights: [
          'Burj Khalifa 124th & 125th Floor Observation Deck Tickets',
          '4x4 Land Cruiser Desert Safari with BBQ Dinner & Belly Dance',
          'Marina Luxury Dhow Cruise with International Buffet Dinner',
          'Abu Dhabi Day Tour: Sheikh Zayed Mosque & Louvre Abu Dhabi',
          'Stay in 5-Star Luxury City / Palm Jumeirah Hotel',
        ],
        inclusions: [
          '4 Nights Accommodation in 5-Star Hotel (JW Marriott / Atlantis)',
          'Daily Grand Buffet Breakfast',
          'Desert Safari with Quad Biking & Dune Bashing',
          'Dubai Marina Dhow Dinner Cruise',
          'Abu Dhabi City Tour with Sheikh Zayed Mosque Entry',
        ],
        exclusions: ['Airfare', 'UAE Tourist Visa fee', 'Tourism Dirham Fee (~$4/night)'],
        itinerary: [
          {
            day: 1,
            title: 'Arrival in Dubai & Marina Dhow Dinner Cruise',
            description: 'Arrive at Dubai International Airport (DXB). Luxury transfer to 5-star hotel. Evening boarding on a illuminated Dhow Cruise along Dubai Marina with live music and buffet.',
            meals: 'Dinner included',
            hotel: 'JW Marriott Marquis Dubai',
            activities: ['Airport Pick up', 'Dubai Marina Dhow Cruise'],
          },
          {
            day: 2,
            title: 'Dubai City Tour & Burj Khalifa At The Top',
            description: 'Guided tour covering Dubai Frame, Palm Jumeirah, Atlantis photo stop, Dubai Mall, and fast-track entry to Burj Khalifa 124th & 125th floor observation decks.',
            meals: 'Breakfast included',
            hotel: 'JW Marriott Marquis Dubai',
            activities: ['Dubai Frame Visit', 'Palm Jumeirah Tour', 'Burj Khalifa At The Top'],
          },
          {
            day: 3,
            title: 'Morning Free & Premium Desert Safari Experience',
            description: 'Morning free for shopping at Mall of the Emirates. Afternoon pick up in 4x4 Land Cruisers for thrilling dune bashing in Lahbab desert, camel rides, henna painting, and BBQ dinner show.',
            meals: 'Breakfast & Desert BBQ Dinner',
            hotel: 'JW Marriott Marquis Dubai',
            activities: ['4x4 Dune Bashing', 'Camel Riding', 'BBQ Dinner & Fire Show'],
          },
          {
            day: 4,
            title: 'Full Day Abu Dhabi Tour & Louvre Museum',
            description: 'Excursion to Abu Dhabi. Visit breathtaking Sheikh Zayed Grand Mosque, drive along Corniche, photo stop at Emirates Palace, and explore Louvre Abu Dhabi museum.',
            meals: 'Breakfast included',
            hotel: 'JW Marriott Marquis Dubai',
            activities: ['Sheikh Zayed Mosque Tour', 'Louvre Abu Dhabi Visit'],
          },
          {
            day: 5,
            title: 'Gold Souk Shopping & Departure',
            description: 'Visit traditional Deira Gold & Spice Souks, cross Dubai Creek in a wooden Abra boat. Private transfer to airport for departure.',
            meals: 'Breakfast included',
            hotel: 'Check out',
            activities: ['Gold Souk Shopping', 'Abra Boat Ride', 'Airport Transfer'],
          },
        ],
        mealsIncluded: 'Breakfast & 2 Special Dinners',
        transportation: 'Private Luxury Luxury Sedan / Van',
        pickupLocation: 'Dubai DXB Airport',
        dropLocation: 'Dubai DXB Airport',
        maxGroupSize: 15,
        difficulty: 'Easy',
        bestSeason: 'November - March',
        rating: 4.8,
        reviewsCount: 39,
        availableDates: ['2026-09-15', '2026-10-05', '2026-10-25', '2026-11-15'],
        availableSeats: 14,
        isFeatured: true,
        isTrending: false,
      },
      {
        title: 'Switzerland Alpine Wonders Journey',
        destination: destMap['Zurich']._id,
        destinationName: 'Zurich, Lucerne, Interlaken, Grindelwald',
        country: countryMap['Switzerland']._id,
        countryName: 'Switzerland',
        category: 'Adventure',
        days: 8,
        nights: 7,
        price: 185000,
        childPrice: 135000,
        infantPrice: 35000,
        discountPercentage: 12,
        coverImage: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80',
        gallery: [
          'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1527668752968-14dc70a27c95?auto=format&fit=crop&w=800&q=80',
        ],
        overview: 'Discover Europe’s pinnacle alpine beauty. Journey through Zurich, ride the cable car up Mt. Titlis in Lucerne, explore Jungfraujoch Top of Europe, and marvel at Grindelwald’s majestic mountain peaks.',
        highlights: [
          '1st Class Swiss Travel Pass for unlimited train, bus & boat travel',
          'Jungfraujoch Top of Europe excursion with Ice Palace tour',
          'Mt. Titlis 360-degree rotating cable car ride & Cliff Walk',
          'Scenic boat cruise on Lake Lucerne and Lake Brienz',
          'Stroll through medieval Lucerne & Chapel Bridge',
        ],
        inclusions: [
          '7 Nights 4-Star Central Hotel Accommodations (Zurich, Lucerne, Interlaken)',
          'Daily Swiss Breakfast Buffet',
          '8-Day 1st Class Swiss Travel Pass',
          'Jungfraujoch Excursion Ticket',
          'Mt. Titlis Cable Car Pass',
        ],
        exclusions: ['Airfare', 'Schengen Visa Fee', 'City Tourist Taxes (~CHF 4/night)'],
        itinerary: [
          {
            day: 1,
            title: 'Arrival in Zurich - Swiss Gateway',
            description: 'Arrive at Zurich Airport (ZRH). Activate Swiss Travel Pass and board train to central Zurich hotel. Evening walking tour of Bahnhofstrasse and Lake Zurich Promenade.',
            meals: 'Breakfast included',
            hotel: 'Hotel St. Gotthard Zurich',
            activities: ['Airport Train Transfer', 'Zurich Old Town Walk'],
          },
          {
            day: 2,
            title: 'Zurich to Lucerne & Lake Lucerne Cruise',
            description: 'Short scenic train ride to Lucerne. Check in at hotel, visit Chapel Bridge, Lion Monument, and take an afternoon panoramic steamboat cruise on Lake Lucerne.',
            meals: 'Breakfast included',
            hotel: 'Radisson Blu Hotel Lucerne',
            activities: ['Chapel Bridge Visit', 'Lake Lucerne Cruise'],
          },
          {
            day: 3,
            title: 'Mt. Titlis Snow Adventure & Revolving Cable Car',
            description: 'Excursion to Engelberg and ride the Rotair 360-degree revolving cable car up Mt. Titlis (3,020m). Walk across Europe’s highest cliff suspension bridge and explore Ice Cave.',
            meals: 'Breakfast included',
            hotel: 'Radisson Blu Hotel Lucerne',
            activities: ['Mt Titlis Cable Car', 'Ice Cave', 'Cliff Suspension Bridge'],
          },
          {
            day: 4,
            title: 'Lucerne to Interlaken Alpine Valley',
            description: 'Board the Luzern-Interlaken Express scenic train along crystal lakes and waterfalls. Arrive in Interlaken nestled between Lake Thun and Lake Brienz.',
            meals: 'Breakfast included',
            hotel: 'Lindner Hotel Beau Rivage Interlaken',
            activities: ['Scenic Train Ride', 'Interlaken Town Stroll'],
          },
          {
            day: 5,
            title: 'Jungfraujoch - Top of Europe Mountain Summit',
            description: 'Board the Eiger Express cable car and cogwheel train up to Jungfraujoch (3,454m), the highest railway station in Europe. Experience Sphinx Observatory views over Aletsch Glacier.',
            meals: 'Breakfast included',
            hotel: 'Lindner Hotel Beau Rivage Interlaken',
            activities: ['Jungfraujoch Railway', 'Sphinx Observatory', 'Ice Palace Tour'],
          },
          {
            day: 6,
            title: 'Grindelwald First Cliff Walk & Lake Brienz',
            description: 'Visit fairy-tale mountain village Grindelwald. Walk the First Cliff Walk by Tissot and option to ride First Flyer zip line. Afternoon boat cruise on Lake Brienz.',
            meals: 'Breakfast included',
            hotel: 'Lindner Hotel Beau Rivage Interlaken',
            activities: ['Grindelwald First Visit', 'Lake Brienz Cruise'],
          },
          {
            day: 7,
            title: 'Interlaken to Zurich via Bern Capital',
            description: 'Return train to Zurich via Bern, Switzerland’s UNESCO-listed capital. See the Zytglogge clock tower and Bear Park before checking in at Zurich hotel.',
            meals: 'Breakfast included',
            hotel: 'Hotel St. Gotthard Zurich',
            activities: ['Bern Old Town Tour', 'Zurich Shopping Evening'],
          },
          {
            day: 8,
            title: 'Swiss Chocolate Tour & Departure',
            description: 'Morning visit to Lindt Home of Chocolate museum before transfer to Zurich Airport for departure.',
            meals: 'Breakfast included',
            hotel: 'Check out',
            activities: ['Lindt Chocolate Museum', 'Airport Departure'],
          },
        ],
        mealsIncluded: 'Swiss Breakfast Buffet',
        transportation: '1st Class Swiss Rail Pass',
        pickupLocation: 'Zurich Airport ZRH',
        dropLocation: 'Zurich Airport ZRH',
        maxGroupSize: 15,
        difficulty: 'Moderate',
        bestSeason: 'May - October & Dec - Feb',
        rating: 5.0,
        reviewsCount: 54,
        availableDates: ['2026-09-01', '2026-09-18', '2026-10-10', '2026-12-20'],
        availableSeats: 10,
        isFeatured: true,
        isTrending: true,
      },
      {
        title: 'Paris & Romantic French Riviera Escape',
        destination: destMap['Paris']._id,
        destinationName: 'Paris & Nice',
        country: countryMap['France']._id,
        countryName: 'France',
        category: 'Luxury',
        days: 7,
        nights: 6,
        price: 145000,
        childPrice: 95000,
        infantPrice: 25000,
        discountPercentage: 10,
        coverImage: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80',
        gallery: ['https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=800&q=80'],
        overview: 'Immerse yourself in Parisian elegance and the sun-soaked Mediterranean glamorous vibe of the French Riviera.',
        highlights: [
          'Eiffel Tower 2nd Floor Skip-the-Line Entry',
          'Seine River Romantic Sunset Dinner Cruise',
          'Louvre Museum Guided Masterpieces Tour',
          'TGV High Speed Train from Paris to Nice',
          'Day trip to Monaco & Monte Carlo Casino',
        ],
        inclusions: [
          '3 Nights 4-Star Hotel Paris + 3 Nights Resort Nice',
          'Daily Buffet Breakfast & Gourmet Dinners',
          'TGV High Speed Train First Class Ticket',
          'All Excursions and Monument Entries',
        ],
        exclusions: ['Airfare', 'Schengen Visa'],
        itinerary: [
          {
            day: 1,
            title: 'Welcome to Paris City of Lights',
            description: 'Arrive at Paris Charles de Gaulle (CDG). Private transfer to boutique hotel near Champs-Élysées. Evening leisure walk.',
            meals: 'Dinner included',
            hotel: 'Hotel Novotel Paris Tour Eiffel',
            activities: ['Airport Transfer', 'Champs-Élysées Evening Walk'],
          },
          {
            day: 2,
            title: 'Eiffel Tower, Louvre Museum & Seine Cruise',
            description: 'Ascend Eiffel Tower 2nd floor for panorama, tour Mona Lisa in Louvre Museum, and enjoy evening Seine River Dinner Cruise.',
            meals: 'Breakfast & Cruise Dinner',
            hotel: 'Hotel Novotel Paris Tour Eiffel',
            activities: ['Eiffel Tower Tour', 'Louvre Museum Entry', 'Seine Cruise'],
          },
        ],
        mealsIncluded: 'Breakfast & 2 Dinners',
        transportation: 'Private Transfers & TGV Rail',
        pickupLocation: 'Paris CDG Airport',
        dropLocation: 'Nice NCE Airport',
        maxGroupSize: 12,
        difficulty: 'Easy',
        bestSeason: 'April - October',
        rating: 4.9,
        reviewsCount: 31,
        availableDates: ['2026-09-12', '2026-10-08'],
        availableSeats: 8,
        isFeatured: true,
        isTrending: false,
      },
    ];

    const tourPackages = await Promise.all(
      packagesData.map(async (p) => {
        const slug = createSlug(p.title);
        const finalPrice = Math.round(p.price - p.price * (p.discountPercentage / 100));
        return await TourPackage.create({ ...p, slug, finalPrice });
      })
    );

    console.log(`[Seeder]: Created ${tourPackages.length} Tour Packages.`);

    // 5. Seed Hotels
    const hotelsData = [
      {
        name: 'Rambagh Palace Jaipur',
        destination: destMap['Jaipur']._id,
        country: countryMap['India']._id,
        location: 'Bhawani Singh Road, Jaipur, Rajasthan',
        images: ['https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80'],
        rating: 4.9,
        starRating: 5,
        pricePerNight: 28000,
        amenities: ['WiFi', 'Pool', 'Gym', 'Spa', 'Parking', 'Restaurant', 'Airport Transfer', 'AC'],
        description: 'Former residence of the Maharaja of Jaipur, offering unparalleled royal luxury, sprawling gardens, and opulent suite chambers.',
        isFeatured: true,
      },
      {
        name: 'The Kayon Jungle Resort Ubud',
        destination: destMap['Bali']._id,
        country: countryMap['Indonesia']._id,
        location: 'Ubud, Gianyar, Bali',
        images: ['https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80'],
        rating: 4.9,
        starRating: 5,
        pricePerNight: 22000,
        amenities: ['WiFi', 'Pool', 'Gym', 'Spa', 'Restaurant', 'AC'],
        description: 'Sanctuary perched on Ubud jungle valley featuring 3-tier infinity pools and organic farm-to-table dining.',
        isFeatured: true,
      },
      {
        name: 'JW Marriott Marquis Hotel Dubai',
        destination: destMap['Dubai']._id,
        country: countryMap['United Arab Emirates']._id,
        location: 'Business Bay, Sheikh Zayed Road, Dubai',
        images: ['https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80'],
        rating: 4.8,
        starRating: 5,
        pricePerNight: 18000,
        amenities: ['WiFi', 'Pool', 'Gym', 'Spa', 'Parking', 'Restaurant', 'Airport Transfer', 'AC'],
        description: 'Iconic twin 5-star skyscraper hotel offering panoramic views of Dubai Water Canal and Burj Khalifa.',
        isFeatured: true,
      },
    ];

    await Promise.all(
      hotelsData.map(async (h) => {
        const slug = createSlug(h.name);
        return await Hotel.create({ ...h, slug });
      })
    );

    console.log(`[Seeder]: Created Hotels.`);

    // 6. Seed Activities
    const activitiesData = [
      {
        title: 'Amber Fort Elephant & Jeep Safari Tour',
        destination: destMap['Jaipur']._id,
        country: countryMap['India']._id,
        price: 2500,
        duration: '4 Hours',
        images: ['https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?auto=format&fit=crop&w=800&q=80'],
        rating: 4.9,
        reviewsCount: 88,
        difficulty: 'Easy',
        description: 'Ascend Amber Fort on elephant back or open jeep, explore Sheesh Mahal mirror palace and royal courtyard gardens.',
        isFeatured: true,
      },
      {
        title: 'Premium 4x4 Dubai Desert Dune Bashing & BBQ',
        destination: destMap['Dubai']._id,
        country: countryMap['United Arab Emirates']._id,
        price: 4500,
        duration: '6 Hours',
        images: ['https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=800&q=80'],
        rating: 4.8,
        reviewsCount: 142,
        difficulty: 'Moderate',
        description: 'Thrilling sand dune bashing in Land Cruisers, quad biking, camel rides, henna painting, and desert buffet dinner.',
        isFeatured: true,
      },
    ];

    await Promise.all(
      activitiesData.map(async (a) => {
        const slug = createSlug(a.title);
        return await Activity.create({ ...a, slug });
      })
    );

    console.log(`[Seeder]: Created Activities.`);

    // 7. Seed Coupons
    await Coupon.create([
      {
        code: 'WELCOME100',
        discountType: 'Fixed',
        value: 1000,
        minBookingAmount: 5000,
        maxDiscountAmount: 1000,
        validUntil: new Date('2027-12-31'),
        isActive: true,
      },
      {
        code: 'SUMMER20',
        discountType: 'Percentage',
        value: 20,
        minBookingAmount: 10000,
        maxDiscountAmount: 5000,
        validUntil: new Date('2027-12-31'),
        isActive: true,
      },
      {
        code: 'HONEYMOON15',
        discountType: 'Percentage',
        value: 15,
        minBookingAmount: 20000,
        maxDiscountAmount: 10000,
        validUntil: new Date('2027-12-31'),
        isActive: true,
      },
    ]);

    console.log(`[Seeder]: Created Discount Coupons.`);

    // 8. Seed Blog Posts / Travel Guides
    const blogData = [
      {
        title: '10 Essential Packing Tips for Your First Trip to Europe',
        category: 'Packing',
        coverImage: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80',
        excerpt: 'Packing light while covering unpredictable European weather can be tricky. Here is our master checklist for a hassle-free vacation.',
        content: `Planning your dream trip to Europe? Packing efficiently is the secret to moving smoothly across cobble-stone streets, train platforms, and vintage elevators.

1. Invest in a Quality Lightweight Hard-Shell Spinner Suitcase.
2. Layering is key: Pack versatile merino wool sweaters, weather-proof jackets, and breathable inner wear.
3. Don’t forget a Universal Power Adapter with Type C & F plugs.
4. Keep physical photocopies of passport and Schengen visa alongside digital cloud backups.
5. Comfortable walking sneakers are non-negotiable!`,
        readTime: '6 min read',
        tags: ['Europe', 'Packing', 'Travel Tips'],
        isFeatured: true,
      },
      {
        title: 'The Ultimate Guide to Cherry Blossom Season in Japan',
        category: 'Destinations',
        coverImage: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80',
        excerpt: 'Everything you need to know about tracking Sakura blossoms in Tokyo, Kyoto, and Osaka from March to May.',
        content: `Cherry blossom (Sakura) season in Japan is one of the world's most magical natural spectacles. The pink blooms sweep from southern Kyushu up to northern Hokkaido.

Top Spots for Hanami (Blossom Viewing):
- Meguro River, Tokyo: Illuminated cherry tree tunnels over water.
- Maruyama Park, Kyoto: Ancient weeping cherry trees surrounding tea houses.
- Osaka Castle Park: Over 3,000 cherry trees framing the historic castle walls.`,
        readTime: '8 min read',
        tags: ['Japan', 'Sakura', 'Kyoto', 'Tokyo'],
        isFeatured: true,
      },
    ];

    await Promise.all(
      blogData.map(async (b) => {
        const slug = createSlug(b.title);
        return await BlogPost.create({ ...b, slug });
      })
    );

    console.log(`[Seeder]: Created Blog Posts.`);

    console.log(`=================================================`);
    console.log(`  🎉  DREAM MILES DATABASE SEEDED SUCCESSFULLY! `);
    console.log(`=================================================`);
    process.exit(0);
  } catch (error) {
    console.error(`[Seeder Error]: ${error.message}`, error);
    process.exit(1);
  }
};

seedData();

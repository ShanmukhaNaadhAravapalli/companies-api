const mongoose = require('mongoose');
const Company = require('../models/Company');
require('dotenv').config();

const sampleCompanies = [
  {
    name: 'TechCorp Solutions',
    industry: 'Technology',
    country: 'United States',
    place: 'San Francisco, CA',
    employeeCount: 250,
    foundedYear: 2015,
    revenue: 50000000,
    website: 'https://techcorp.com',
    description: 'Leading technology solutions provider specializing in cloud services.'
  },
  {
    name: 'Green Energy Co',
    industry: 'Energy',
    country: 'United States',
    place: 'Austin, TX',
    employeeCount: 150,
    foundedYear: 2018,
    revenue: 25000000,
    website: 'https://greenenergy.com',
    description: 'Sustainable energy solutions for commercial and residential use.'
  },
  {
    name: 'Healthcare Plus',
    industry: 'Healthcare',
    country: 'United States',
    place: 'New York, NY',
    employeeCount: 500,
    foundedYear: 2010,
    revenue: 100000000,
    website: 'https://healthcareplus.com',
    description: 'Comprehensive healthcare services and medical technology.'
  },
  {
    name: 'FinanceFirst',
    industry: 'Finance',
    country: 'United States',
    place: 'Chicago, IL',
    employeeCount: 300,
    foundedYear: 2012,
    revenue: 75000000,
    website: 'https://financefirst.com',
    description: 'Digital banking and financial services provider.'
  },
  {
    name: 'EduTech Innovations',
    industry: 'Education',
    country: 'United States',
    place: 'Boston, MA',
    employeeCount: 100,
    foundedYear: 2020,
    revenue: 15000000,
    website: 'https://edutech.com',
    description: 'Online education platform and learning management systems.'
  },
  {
    name: 'Global Manufacturing Ltd',
    industry: 'Manufacturing',
    country: 'Germany',
    place: 'Munich',
    employeeCount: 800,
    foundedYear: 2005,
    revenue: 150000000,
    website: 'https://globalmanufacturing.de',
    description: 'Advanced manufacturing solutions and industrial automation.'
  },
  {
    name: 'Digital Marketing Pro',
    industry: 'Marketing',
    country: 'United Kingdom',
    place: 'London',
    employeeCount: 75,
    foundedYear: 2019,
    revenue: 12000000,
    website: 'https://digitalmarketingpro.co.uk',
    description: 'Full-service digital marketing agency specializing in e-commerce.'
  },
  {
    name: 'Retail Solutions Inc',
    industry: 'Retail',
    country: 'Canada',
    place: 'Toronto, ON',
    employeeCount: 200,
    foundedYear: 2016,
    revenue: 35000000,
    website: 'https://retailsolutions.ca',
    description: 'Innovative retail technology and point-of-sale systems.'
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    await Company.deleteMany({});
    console.log('Existing companies deleted');

    await Company.insertMany(sampleCompanies);
    console.log('Sample companies inserted successfully');

    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
};

seedDatabase();
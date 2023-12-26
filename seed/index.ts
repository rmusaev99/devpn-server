import { database } from '../src/database/index';
import countriesByAbbreviation from 'country-json/src/country-by-abbreviation.json';

(async () => {
  await database.country.createMany({
    data: countriesByAbbreviation.map((country) => ({
      iso2: country.abbreviation,
      countryName: country.country,
    })),
  });

  await database.server.createMany({
    data: [
      {
        name: 'US#1',
        ip: '228.234.16.241',
        countryIso2: 'US',
        workload: 2,
      },
      {
        name: 'US#2',
        ip: '235.218.211.77',
        countryIso2: 'US',
        workload: 2,
      },
      {
        name: 'NL#1',
        ip: '255.120.19.224',
        countryIso2: 'NL',
        workload: 2,
      },
      {
        name: 'NL#2',
        ip: '54.174.58.68',
        countryIso2: 'NL',
        workload: 2,
      },
      {
        name: 'NZ#1',
        ip: '48.208.125.242',
        countryIso2: 'NZ',
        workload: 2,
      },
    ],
  });

  await database.plan.createMany({
    data: [
      {
        name: '2 Weeks Trial (Free)',
        price: 0,
        duration: 7,
        usageLimit: 24064,
      },
      {
        name: '1 Month',
        price: 7,
        duration: 30,
        usageLimit: 96256,
      },
      {
        name: '3 Months',
        price: 5,
        duration: 90,
        sale: 30,
        usageLimit: 96256,
      },
      {
        name: '6 Months',
        price: 4,
        duration: 180,
        sale: 40,
        usageLimit: 96256,
      },
      {
        name: '1 Year',
        price: 3,
        duration: 365,
        sale: 60,
        usageLimit: 96256,
      },
    ],
  });

  process.exit(0);
})();

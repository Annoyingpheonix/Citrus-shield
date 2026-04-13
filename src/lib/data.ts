export interface Server {
  id: string;
  name: string;
  country: string;
  countryCode: string;
}

export const servers: Server[] = [
  { id: 'us-ny', name: 'New York, USA', country: 'United States', countryCode: 'US' },
  { id: 'us-sf', name: 'San Francisco, USA', country: 'United States', countryCode: 'US' },
  { id: 'uk-lon', name: 'London, UK', country: 'United Kingdom', countryCode: 'GB' },
  { id: 'de-fra', name: 'Frankfurt, DE', country: 'Germany', countryCode: 'DE' },
  { id: 'jp-tok', name: 'Tokyo, Japan', country: 'Japan', countryCode: 'JP' },
  { id: 'au-syd', name: 'Sydney, Australia', country: 'Australia', countryCode: 'AU' },
  { id: 'ca-tor', name: 'Toronto, Canada', country: 'Canada', countryCode: 'CA' },
  { id: 'sg-sin', name: 'Singapore', country: 'Singapore', countryCode: 'SG' },
];

export const speedTestData: Record<string, number> = {
    'us-ny': 120,
    'us-sf': 95,
    'uk-lon': 110,
    'de-fra': 130,
    'jp-tok': 80,
    'au-syd': 75,
    'ca-tor': 115,
    'sg-sin': 90,
};

export const latencyData: Record<string, number> = {
    'us-ny': 25,
    'us-sf': 60,
    'uk-lon': 80,
    'de-fra': 85,
    'jp-tok': 150,
    'au-syd': 180,
    'ca-tor': 30,
    'sg-sin': 160,
};

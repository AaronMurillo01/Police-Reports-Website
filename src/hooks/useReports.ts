import { useQuery, useQueryClient } from '@tanstack/react-query';
import type { PoliceReport, Filters } from '../types';
import { isWithinInterval, parseISO, subMonths } from 'date-fns';

// Use the correct SODA API endpoint with proper query parameters
const API_ENDPOINT = 'https://data.sfgov.org/resource/wg3w-h783.json';
const CACHE_TIME = 30 * 60 * 1000; // 30 minutes

const CRIME_CATEGORIES = [
  'Larceny Theft',
  'Assault',
  'Burglary',
  'Vehicle Theft',
  'Robbery',
  'Drug Offense',
  'Vandalism',
  'Fraud',
  'Weapons Offense',
  'Suspicious Activity',
  'Other'
];

export function useReports(filters: Filters) {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ['reports'],
    queryFn: async () => {
      try {
        // Calculate date 6 months ago for initial data fetch
        const sixMonthsAgo = subMonths(new Date(), 6);
        const formattedDate = sixMonthsAgo.toISOString().split('.')[0];
        
        // Construct the SODA API query with proper parameters
        const query = new URLSearchParams({
          '$limit': '500',
          '$order': 'incident_datetime DESC',
          '$where': `incident_datetime > '${formattedDate}'`
        }).toString();
        
        const response = await fetch(`${API_ENDPOINT}?${query}`, {
          headers: {
            'Accept': 'application/json'
          }
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (!Array.isArray(data)) {
          throw new Error('Invalid data format received');
        }

        return data.map((item: any) => ({
          case_number: item.incident_number || 'N/A',
          date_occurred: item.incident_datetime || new Date().toISOString(),
          date_reported: item.incident_datetime || new Date().toISOString(),
          incident_type: item.incident_description || 'Unknown',
          location_type: item.resolution || 'Unknown',
          address: item.intersection || item.address || 'Unknown Location',
          lat: item.latitude || '37.7749',
          long: item.longitude || '-122.4194',
          ucr_crime_category: mapCrimeCategory(item.incident_category),
        }));
      } catch (err) {
        console.error('Error fetching data:', err);
        throw new Error('Failed to load police reports. Please try again later.');
      }
    },
    staleTime: CACHE_TIME,
    refetchInterval: CACHE_TIME,
    retry: 3,
    refetchOnWindowFocus: false,
  });

  // Apply filters
  const filteredReports = data?.filter((report: PoliceReport) => {
    const matchesDateRange = !filters.dateRange.start || !filters.dateRange.end || 
      isWithinInterval(parseISO(report.date_occurred), {
        start: filters.dateRange.start,
        end: filters.dateRange.end
      });

    const matchesCrimeType = !filters.crimeType || 
      report.ucr_crime_category.toLowerCase() === filters.crimeType.toLowerCase();

    const matchesLocation = !filters.location || 
      report.address.toLowerCase().includes(filters.location.toLowerCase());

    return matchesDateRange && matchesCrimeType && matchesLocation;
  }) ?? [];

  return {
    reports: filteredReports,
    isLoading,
    error: error ? String(error) : null,
    crimeCategories: CRIME_CATEGORIES,
  };
}

function mapCrimeCategory(category: string): string {
  const lowerCategory = (category || '').toLowerCase();
  
  if (lowerCategory.includes('larceny') || lowerCategory.includes('theft')) return 'Larceny Theft';
  if (lowerCategory.includes('assault')) return 'Assault';
  if (lowerCategory.includes('burglary')) return 'Burglary';
  if (lowerCategory.includes('vehicle')) return 'Vehicle Theft';
  if (lowerCategory.includes('robbery')) return 'Robbery';
  if (lowerCategory.includes('drug')) return 'Drug Offense';
  if (lowerCategory.includes('vandalism')) return 'Vandalism';
  if (lowerCategory.includes('fraud')) return 'Fraud';
  if (lowerCategory.includes('weapon')) return 'Weapons Offense';
  if (lowerCategory.includes('suspicious')) return 'Suspicious Activity';
  
  return 'Other';
}
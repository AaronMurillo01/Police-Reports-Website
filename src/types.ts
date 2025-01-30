export interface PoliceReport {
  case_number: string;
  date_occurred: string;
  date_reported: string;
  incident_type: string;
  location_type: string;
  address: string;
  lat: string;
  long: string;
  ucr_crime_category: string;
}

export interface ReportsState {
  reports: PoliceReport[];
  loading: boolean;
  error: string | null;
}

export interface Filters {
  dateRange: {
    start: Date | null;
    end: Date | null;
  };
  crimeType: string;
  location: string;
}
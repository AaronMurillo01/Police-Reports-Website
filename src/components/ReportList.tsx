import React from 'react';
import { PoliceReport } from '../types';
import { FileText, MapPin, Calendar, Clock, Tag, ExternalLink } from 'lucide-react';
import { format } from 'date-fns';

interface ReportListProps {
  reports: PoliceReport[];
  onLoadMore: () => void;
  hasMore: boolean;
  selectedReport: string | null;
  onSelectReport: (reportId: string | null) => void;
}

export function ReportList({ 
  reports, 
  onLoadMore, 
  hasMore,
  selectedReport,
  onSelectReport 
}: ReportListProps) {
  const getReportUrl = (report: PoliceReport) => {
    const query = encodeURIComponent(`incident_number = '${report.case_number}'`);
    return `https://data.sfgov.org/Public-Safety/Police-Department-Incident-Reports-2018-to-Present/wg3w-h783/data?q=${query}`;
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {reports.map((report, index) => (
          <div 
            key={`${report.case_number}-${index}`}
            className={`bg-white/5 backdrop-blur-sm rounded-lg p-4 md:p-6 hover-lift transition-all duration-300 border border-white/10 hover:border-white/20 ${
              selectedReport === report.case_number ? 'ring-2 ring-white' : ''
            }`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex flex-col h-full">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
                <h3 className="text-base md:text-lg font-semibold text-white/90 flex items-center">
                  <FileText className="h-4 w-4 md:h-5 md:w-5 mr-2 flex-shrink-0" />
                  Case #{report.case_number}
                </h3>
                <span className="inline-flex px-2 py-1 rounded-full text-xs md:text-sm font-medium bg-white/10 text-white/90 self-start">
                  {report.ucr_crime_category}
                </span>
              </div>
              
              <p className="text-white/70 mt-2 text-sm md:text-base">
                <span className="font-medium">{report.incident_type}</span>
              </p>
              
              <div className="mt-3 space-y-2">
                <p className="text-white/70 text-sm flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-white/50 flex-shrink-0" />
                  <span className="line-clamp-1">{report.address}</span>
                </p>
                <div className="flex flex-wrap gap-3 text-sm">
                  <p className="text-white/70 flex items-center">
                    <Calendar className="h-4 w-4 mr-1 text-white/50 flex-shrink-0" />
                    {format(new Date(report.date_occurred), 'PP')}
                  </p>
                  <p className="text-white/70 flex items-center">
                    <Clock className="h-4 w-4 mr-1 text-white/50 flex-shrink-0" />
                    {format(new Date(report.date_reported), 'PP')}
                  </p>
                  <p className="text-white/70 flex items-center">
                    <Tag className="h-4 w-4 mr-1 text-white/50 flex-shrink-0" />
                    {report.location_type}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 mt-4">
                <a
                  href={getReportUrl(report)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors duration-300 text-sm"
                >
                  <ExternalLink className="h-4 w-4 mr-2 flex-shrink-0" />
                  View Case Details
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center pt-6 md:pt-8">
          <button
            onClick={onLoadMore}
            className="px-4 md:px-6 py-2 md:py-3 bg-white/10 text-white rounded-full hover:bg-white/20 transition-all duration-300 border border-white/20 text-sm md:text-base"
          >
            Load More Reports
          </button>
        </div>
      )}
    </div>
  );
}
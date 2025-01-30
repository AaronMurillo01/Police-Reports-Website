import React from 'react';
import { Filter, X, Calendar, MapPin, Tag } from 'lucide-react';
import { format } from 'date-fns';
import type { Filters } from '../types';

interface FiltersProps {
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
  crimeTypes: string[];
}

export function Filters({ filters, onFilterChange, crimeTypes }: FiltersProps) {
  const minDate = '2024-01-01';
  const maxDate = new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0];

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 md:p-6 mb-6 md:mb-8 border border-white/10">
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <h3 className="text-base md:text-lg font-semibold text-white/90 flex items-center">
          <Filter className="h-4 w-4 md:h-5 md:w-5 mr-2" />
          Filter Reports
        </h3>
        <button
          onClick={() => onFilterChange({
            dateRange: { start: null, end: null },
            crimeType: '',
            location: ''
          })}
          className="text-sm text-white/70 hover:text-white flex items-center transition-colors duration-300"
        >
          <X className="h-4 w-4 mr-1" />
          Clear
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-white/70">
            <Calendar className="h-4 w-4 inline-block mr-2" />
            Date Range
          </label>
          <div className="flex flex-col space-y-2">
            <input
              type="date"
              min={minDate}
              max={maxDate}
              value={filters.dateRange.start ? format(filters.dateRange.start, 'yyyy-MM-dd') : ''}
              onChange={(e) => onFilterChange({
                ...filters,
                dateRange: {
                  ...filters.dateRange,
                  start: e.target.value ? new Date(e.target.value) : null
                }
              })}
              className="block w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm md:text-base text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-300"
            />
            <input
              type="date"
              min={minDate}
              max={maxDate}
              value={filters.dateRange.end ? format(filters.dateRange.end, 'yyyy-MM-dd') : ''}
              onChange={(e) => onFilterChange({
                ...filters,
                dateRange: {
                  ...filters.dateRange,
                  end: e.target.value ? new Date(e.target.value) : null
                }
              })}
              className="block w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm md:text-base text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-300"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-white/70 mb-2">
            <Tag className="h-4 w-4 inline-block mr-2" />
            Crime Type
          </label>
          <select
            value={filters.crimeType}
            onChange={(e) => onFilterChange({ ...filters, crimeType: e.target.value })}
            className="block w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm md:text-base text-white focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-300 [&>option]:text-black"
          >
            <option value="">All Types</option>
            {crimeTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-white/70 mb-2">
            <MapPin className="h-4 w-4 inline-block mr-2" />
            Location Search
          </label>
          <input
            type="text"
            value={filters.location}
            onChange={(e) => onFilterChange({ ...filters, location: e.target.value })}
            placeholder="Enter address or area..."
            className="block w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm md:text-base text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-300"
          />
        </div>
      </div>
    </div>
  );
}
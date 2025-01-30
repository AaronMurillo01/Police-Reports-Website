import React, { useState, useEffect, useMemo } from 'react';
import { Shield, Menu, X } from 'lucide-react';
import { ReportList } from './components/ReportList';
import { Filters } from './components/Filters';
import { useReports } from './hooks/useReports';
import type { Filters as FiltersType } from './types';

const ITEMS_PER_PAGE = 10;

function App() {
  const [filters, setFilters] = useState<FiltersType>({
    dateRange: { start: null, end: null },
    crimeType: '',
    location: '',
  });

  const [page, setPage] = useState(1);
  const [selectedReport, setSelectedReport] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const { reports, isLoading, error, crimeCategories } = useReports(filters);

  const paginatedReports = reports.slice(0, page * ITEMS_PER_PAGE);
  const hasMore = paginatedReports.length < reports.length;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLoadMore = () => {
    setPage(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header 
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled ? 'bg-black/90 backdrop-blur-sm' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 py-4 md:py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Shield className="h-6 w-6 md:h-8 md:w-8" />
              <h1 className="text-xl md:text-2xl font-bold gradient-text">SF Police Reports</h1>
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-300 md:hidden"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="mt-4 pb-4 border-t border-white/10 md:hidden animate-fade-in">
              <button
                onClick={() => {
                  setShowFilters(!showFilters);
                  setIsMenuOpen(false);
                }}
                className="w-full text-left px-4 py-3 hover:bg-white/10 rounded-lg transition-colors duration-300"
              >
                {showFilters ? 'Hide Filters' : 'Show Filters'}
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="h-[80vh] md:h-screen flex items-center justify-center gradient-bg relative overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1449034446853-66c86144b0ad?auto=format&fit=crop&q=80"
            alt="San Francisco cityscape"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black"></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 gradient-text">
            San Francisco Police Reports
          </h1>
          <p className="text-base md:text-xl text-gray-300 max-w-2xl mx-auto mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Explore real-time crime data and police reports from across the city
          </p>
          <button
            onClick={() => window.scrollTo({ top: window.innerHeight * 0.8, behavior: 'smooth' })}
            className="px-6 md:px-8 py-3 bg-white text-black rounded-full hover:bg-gray-100 transition-all duration-300 animate-fade-in"
            style={{ animationDelay: '0.4s' }}
          >
            View Reports
          </button>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 md:py-16">
        <div className={`${showFilters ? 'block' : 'hidden md:block'}`}>
          <Filters
            filters={filters}
            onFilterChange={setFilters}
            crimeTypes={crimeCategories}
          />
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-2 border-white border-t-transparent"></div>
          </div>
        ) : error ? (
          <div className="bg-red-900/20 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg animate-fade-in">
            {error}
          </div>
        ) : (
          <div className="animate-fade-in">
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold gradient-text">Recent Reports</h2>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="md:hidden px-4 py-2 text-sm bg-white/10 rounded-lg hover:bg-white/20 transition-colors duration-300"
                >
                  {showFilters ? 'Hide Filters' : 'Show Filters'}
                </button>
              </div>
              <p className="text-gray-400 mt-1">
                Showing {paginatedReports.length} of {reports.length} reports
              </p>
            </div>

            <ReportList
              reports={paginatedReports}
              onLoadMore={handleLoadMore}
              hasMore={hasMore}
              selectedReport={selectedReport}
              onSelectReport={setSelectedReport}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-black/50 backdrop-blur-sm border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-6 text-center">
          <p className="text-sm text-white/70">
            Created by <span className="text-white font-medium">Aaron Murillo</span>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
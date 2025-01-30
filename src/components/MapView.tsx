import React, { useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import type { PoliceReport, MapViewState } from '../types';
import { MapPin } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

interface MapViewProps {
  reports: PoliceReport[];
  selectedReport: string | null;
  onSelectReport: (reportId: string | null) => void;
  viewState: MapViewState;
  onViewStateChange: (viewState: MapViewState) => void;
}

// Custom marker icon using Lucide React icon as SVG
const createCustomIcon = (isSelected: boolean) => {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${isSelected ? '#60A5FA' : '#F87171'}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  `;

  return L.divIcon({
    html: svg,
    className: '',
    iconSize: [24, 24],
    iconAnchor: [12, 24],
    popupAnchor: [0, -24],
  });
};

// Map controller component to handle view state changes
function MapController({ viewState, onViewStateChange }: { 
  viewState: MapViewState;
  onViewStateChange: (viewState: MapViewState) => void;
}) {
  const map = useMap();

  useEffect(() => {
    map.setView([viewState.latitude, viewState.longitude], viewState.zoom);
  }, [map, viewState]);

  useEffect(() => {
    const handleMoveEnd = () => {
      const center = map.getCenter();
      onViewStateChange({
        latitude: center.lat,
        longitude: center.lng,
        zoom: map.getZoom(),
      });
    };

    map.on('moveend', handleMoveEnd);
    return () => {
      map.off('moveend', handleMoveEnd);
    };
  }, [map, onViewStateChange]);

  return null;
}

export function MapView({ 
  reports, 
  selectedReport, 
  onSelectReport,
  viewState,
  onViewStateChange
}: MapViewProps) {
  const markers = useMemo(() => {
    return reports
      .map((report, index) => ({
        ...report,
        id: `${report.case_number}-${index}`,
        latitude: parseFloat(report.lat),
        longitude: parseFloat(report.long)
      }))
      .filter(report => 
        !isNaN(report.latitude) && 
        !isNaN(report.longitude) &&
        report.latitude !== 0 &&
        report.longitude !== 0
      );
  }, [reports]);

  return (
    <div className="h-[600px] rounded-lg overflow-hidden shadow-lg border border-white/10">
      <MapContainer
        center={[viewState.latitude, viewState.longitude]}
        zoom={viewState.zoom}
        className="h-full w-full"
        zoomControl={false}
      >
        <MapController viewState={viewState} onViewStateChange={onViewStateChange} />
        
        <TileLayer
          attribution='&copy; <a href="https://stadiamaps.com/" target="_blank">Stadia Maps</a>'
          url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
        />

        {markers.map((report) => (
          <Marker
            key={report.id}
            position={[report.latitude, report.longitude]}
            icon={createCustomIcon(selectedReport === report.case_number)}
            eventHandlers={{
              click: () => onSelectReport(report.case_number),
            }}
          >
            <Popup className="rounded-lg overflow-hidden">
              <div className="p-3 bg-black/90 text-white min-w-[200px]">
                <h3 className="font-semibold text-sm mb-1">{report.incident_type}</h3>
                <p className="text-xs text-gray-300">{report.address}</p>
                <div className="mt-2 pt-2 border-t border-white/10">
                  <p className="text-xs text-gray-400">
                    Case #{report.case_number}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {report.ucr_crime_category}
                  </p>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
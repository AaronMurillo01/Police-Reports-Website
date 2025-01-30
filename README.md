# SF Police Reports Dashboard

A modern, real-time dashboard for viewing and analyzing San Francisco Police Department incident reports. Built with React and Vite, this application provides an intuitive interface for exploring crime data across the city.

## Features

🚔 Real-time police report data
🗺️ Interactive crime mapping
🔍 Advanced filtering capabilities
📱 Mobile-responsive design
⚡ Fast and efficient data loading
🎨 Beautiful, dark-themed UI
🔄 Automatic data refresh

## Why SF Police Reports?

Public safety awareness and transparency are crucial for community well-being. This dashboard provides:

- Real-time access to police incident reports
- Geographic visualization of crime patterns
- Detailed incident information and statistics
- User-friendly filtering and search capabilities
- Mobile accessibility for on-the-go information

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (v7 or higher)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd sf-police-reports
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at http://localhost:5173

## Project Structure

```
sf-police-reports/
├── src/
│   ├── components/
│   │   ├── Filters.tsx
│   │   ├── MapView.tsx
│   │   └── ReportList.tsx
│   ├── hooks/
│   │   └── useReports.ts
│   ├── types/
│   │   └── index.ts
│   ├── App.tsx
│   └── main.tsx
├── public/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## Key Components

- `App.tsx`: Main application component with layout and routing
- `Filters.tsx`: Advanced filtering interface for reports
- `MapView.tsx`: Interactive map visualization of incidents
- `ReportList.tsx`: Paginated list of police reports
- `useReports.ts`: Custom hook for data fetching and management

## Features in Detail

### Real-time Data Integration

- Direct integration with SF Police Department's Open Data API
- Automatic data refresh every 30 minutes
- Efficient data caching and state management
- Error handling and loading states

### Advanced Filtering

- Date range selection
- Crime type categorization
- Location-based filtering
- Real-time filter application

### Interactive Map

- Crime incident location markers
- Custom marker styling for different crime types
- Interactive popups with incident details
- Dark-themed map style

### Responsive Design

- Mobile-first approach
- Adaptive layout for all screen sizes
- Touch-friendly interface
- Collapsible filters on mobile

### Performance Optimization

- Efficient data pagination
- Lazy loading of components
- Optimized re-renders
- Smooth animations and transitions

## Technologies Used

- React 18
- TypeScript
- Vite
- TanStack Query
- Tailwind CSS
- Lucide Icons
- date-fns

## Data Source

This application uses data from the San Francisco Police Department's Open Data Initiative. The data is accessed through the SODA API and is updated regularly.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Author

Created by Aaron Murillo

## Acknowledgments

- Data provided by SF Police Department Open Data
- Map tiles by Stadia Maps
- Icons by Lucide
- City imagery from Unsplash

## About

SF Police Reports Dashboard transforms public safety data into an accessible, user-friendly interface, helping residents and researchers better understand crime patterns and police activity in San Francisco.
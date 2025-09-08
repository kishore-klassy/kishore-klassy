# BOL Dashboard - Weave AI Agents

A comprehensive React.js dashboard application for BOL (Bill of Lading) document verification and processing, built with TailwindCSS and Recharts.

## Features

- **Left Sidebar Navigation**: Dark sidebar with Weave AI Agents branding, agent sections, and menu items
- **Top Navbar**: Notification system, settings, and user profile management
- **Dashboard Metrics**: Six key performance indicator cards showing BOL processing statistics
- **Interactive Charts**: Pie chart, bar chart, and horizontal category charts using Recharts
- **Data Table**: Comprehensive BOL Pipeline Records with filtering and actions
- **Responsive Design**: Clean, modern UI that works across different screen sizes

## Tech Stack

- **React 18**: Modern React with functional components and hooks
- **TailwindCSS**: Utility-first CSS framework for styling
- **Recharts**: Composable charting library for React
- **Lucide React**: Beautiful & consistent icon library
- **Vite**: Fast build tool and development server

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to the local development URL (typically `http://localhost:5173`)

## Project Structure

```
src/
├── components/
│   ├── Sidebar.jsx       # Left navigation sidebar
│   ├── Navbar.jsx        # Top navigation bar
│   ├── FilterBar.jsx     # Dashboard filters
│   ├── DashboardCards.jsx # Metric cards
│   ├── Charts.jsx        # Chart components
│   └── DataTable.jsx     # BOL records table
├── App.jsx              # Main application layout
├── main.jsx            # Application entry point
└── index.css           # Global styles
```

## Dashboard Components

### Sidebar Features
- Weave AI Agents logo and branding
- BOL DocVerify Agent section with Reasoning Agent pill
- Navigation menu items (Dashboard, BOL Master Agent, BOL Extraction Agent, BOL Matching Agent)
- UI Agents section (Rule UI Agent, Repository UI Agent)
- Build the Agent action button

### Dashboard Metrics
- Total Assigned: 18 Today
- Completed: 10 Successfully processed
- Incomplete: 18 Requires attention
- Avg BOL Processing Time: 3.5 sec
- Extraction Accuracy: 97%
- Matching Accuracy: 95%

### Charts
- **Donut Chart**: Total Assigned breakdown (82% Completed, 8% Failed, 10% Pending)
- **Bar Chart**: BOL Exception & Resolution Status
- **Horizontal Bar Chart**: BOL Issue Root Cause Category

### Data Table
Comprehensive BOL Pipeline Records with columns for:
- BOL Number, File Name, Product Name
- MOT (Mode of Transport), Origin, Assigned To
- Issue Status, Root Cause, Shipment Date
- BOL Status (with colored badges)
- Actions menu

## Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory, ready for deployment.
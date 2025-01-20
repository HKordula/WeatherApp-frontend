
# WeatherApp-frontend

A Next.js application that serves as the frontend for the WeatherApp project. It provides a user-friendly interface for accessing weather forecasts and summaries using the WeatherApp backend.

---

## Features

- Search for weather information by city or coordinates.
- View a 7-day weather forecast, including:
  - Weather conditions.
  - Minimum and maximum temperatures.
  - Estimated solar energy production.
- Access weekly weather summaries, including:
  - Average pressure.
  - Average sun exposure.
  - Temperature extremes.
- Interactive map for location selection.

---

## Backend Integration

This frontend is designed to work seamlessly with the [WeatherApp Backend](https://github.com/HKordula/WeatherApp-backend), which provides the necessary APIs for weather data.

- **Backend Repository**: [HKordula/WeatherApp-backend](https://github.com/HKordula/WeatherApp-backend)
- **Backend Technologies**: Spring Boot, OpenMeteo API.

### Setting Up the Backend

1. Clone the backend repository:
   ```bash
   git clone https://github.com/HKordula/WeatherApp-backend.git
   cd WeatherApp-backend
   ```

2. Follow the setup instructions in the backend `README.md` to configure and run the API.

3. Ensure the backend API is running on `http://localhost:8080`, or update the frontend configuration if the API is hosted elsewhere.

---

## Technologies Used

- **Next.js**: Framework for server-side rendering and building React applications.
- **React.js**: Core library for building the user interface.
- **Leaflet**: Interactive maps for location selection.
- **FontAwesome**: Icons for weather conditions.
- **TypeScript**: Type-safe development.

---

## Setup and Installation

### Prerequisites

Ensure that you have the following installed:
- Node.js (v16 or higher)
- npm, yarn, or pnpm (package managers)

### Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/HKordula/WeatherApp-frontend.git
   cd WeatherApp-frontend
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the Development Server**:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Access the Application**:
   Open your browser and navigate to [http://localhost:3000](http://localhost:3000).

---

## API Endpoints

This frontend communicates with the WeatherApp backend's REST API:

### 1. Get 7-Day Forecast
**URL**: `/api/weather/forecast`  
**Method**: `GET`  
**Query Parameters**:
- `latitude` (double): Latitude of the location.
- `longitude` (double): Longitude of the location.

### 2. Get Weekly Weather Summary
**URL**: `/api/weather/summary`  
**Method**: `GET`  
**Query Parameters**:
- `latitude` (double): Latitude of the location.
- `longitude` (double): Longitude of the location.

---

## Deployment

This application can be deployed using any platform that supports Next.js, such as Vercel.

### Deploy on Vercel

1. Install the [Vercel CLI](https://vercel.com/cli) (optional):
   ```bash
   npm install -g vercel
   ```

2. Deploy the application:
   ```bash
   vercel
   ```

3. Follow the prompts to complete the deployment process.

For detailed deployment documentation, visit the [Next.js Deployment Guide](https://nextjs.org/docs/app/building-your-application/deploying).
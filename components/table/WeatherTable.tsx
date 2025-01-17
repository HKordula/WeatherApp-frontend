"use client"
import React, { useEffect, useState } from 'react';
import { getWeatherForecast, getWeatherSummary } from '@/services/WeatherService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faCloud, faSmog, faCloudRain, faCloudShowersHeavy, faSnowflake, faBolt, IconDefinition} from '@fortawesome/free-solid-svg-icons';
import { LatLng } from 'leaflet';

const weatherIcons: { [key: number]: IconDefinition } = {
    0: faSun,
    1: faCloud,
    2: faCloud,
    3: faCloud,
    45: faSmog,
    48: faSmog,
    51: faCloudRain,
    53: faCloudRain,
    55: faCloudRain,
    56: faCloudRain,
    57: faCloudRain,
    61: faCloudShowersHeavy,
    63: faCloudShowersHeavy,
    65: faCloudShowersHeavy,
    66: faCloudShowersHeavy,
    67: faCloudShowersHeavy,
    71: faSnowflake,
    73: faSnowflake,
    75: faSnowflake,
    77: faSnowflake,
    80: faCloudShowersHeavy,
    81: faCloudShowersHeavy,
    82: faCloudShowersHeavy,
    85: faSnowflake,
    86: faSnowflake,
    95: faBolt,
    96: faBolt,
    99: faBolt,
};

interface Forecast {
    date: string;
    weatherCode: number;
    minTemperature: number;
    maxTemperature: number;
    estimatedEnergy: number;
}

interface Summary {
    minTemperature: number;
    maxTemperature: number;
    avgPressure: number;
    avgSunExposure: number;
    comment: string;
}

interface WeatherTableProps {
    location: LatLng | null;
}

const WeatherTable = ({ location }: WeatherTableProps) => {
    const [forecast, setForecast] = useState<Forecast[]>([]);
    const [summary, setSummary] = useState<Summary | null>(null);
    const [locationError, setLocationError] = useState<string | null>(null);

    useEffect(() => {
        if (!location) return;

        const fetchForecast = async (latitude: number, longitude: number) => {
            try {
                console.log(`Fetching weather forecast for coordinates: Latitude ${latitude}, Longitude ${longitude}`);
                const data = await getWeatherForecast(latitude, longitude);
                setForecast(data);
            } catch (error) {
                console.error('Error fetching weather forecast:', error);
            }
        };

        const fetchSummary = async (latitude: number, longitude: number) => {
            try {
                const data = await getWeatherSummary(latitude, longitude);
                setSummary(data);
            } catch (error) {
                console.error('Error fetching weather summary:', error);
            }
        };

        fetchForecast(location.lat, location.lng);
        fetchSummary(location.lat, location.lng);
    }, [location]);

    if (locationError) {
        return <div>{locationError}</div>;
    }

    if (forecast.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <table className="min-w-full">
                <thead>
                    <tr>
                        {forecast.map((day, index) => (
                            <th key={index} className="py-2 px-4 border-b border-gray-200">
                                {new Date(day.date).toLocaleDateString('pl-PL')}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {forecast.map((day, index) => (
                            <td key={index} className="py-2 px-4 border-b border-gray-200 text-center">
                                <FontAwesomeIcon icon={weatherIcons[day.weatherCode]} size="2x" />
                            </td>
                        ))}
                    </tr>
                    <tr>
                        {forecast.map((day, index) => (
                            <td key={index} className="py-2 px-4 border-b border-gray-200 text-center">
                                {day.maxTemperature}°C / {day.minTemperature}°C
                            </td>
                        ))}
                    </tr>
                    <tr>
                        {forecast.map((day, index) => (
                            <td key={index} className="py-2 px-4 border-b border-gray-200 text-center">
                                {day.estimatedEnergy} kWh
                            </td>
                        ))}
                    </tr>
                </tbody>
                <tfoot>
                    {summary && (
                        <tr>
                            <td colSpan={forecast.length} className="py-2 px-4 border-t border-gray-200 text-center">
                                <div>Extreme temperatures: {summary.minTemperature}°C to {summary.maxTemperature}°C</div>
                                <div>Average pressure: {summary.avgPressure} hPa</div>
                                <div>Average sun exposure time: {summary.avgSunExposure} hours</div>
                                <div>Comment: {summary.comment}</div>
                            </td>
                        </tr>
                    )}
                </tfoot>
            </table>
        </div>
    );
};

export default WeatherTable;
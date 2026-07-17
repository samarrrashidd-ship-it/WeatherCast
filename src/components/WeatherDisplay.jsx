import React from 'react';

const WeatherDisplay = ({ weatherData }) => {
  if (!weatherData) return null;

  const { current, forecast } = weatherData;

  // Extract relevant forecast data (e.g., next 4 items for hourly, and group by day for daily)
  const hourlyForecast = forecast.list.slice(0, 4);

  // Group daily forecast (simple approximation: take 1 item per day at noon)
  const dailyForecast = forecast.list.filter(item => item.dt_txt.includes('12:00:00')).slice(0, 5);

  return (
    <div className="mt-4">
      {/* Main Top Section */}
      <div className="glass-panel mb-4">
        <div className="row align-items-center">
          {/* Main Info */}
          <div className="col-md-5 text-start">
            <h1 className="temperature-large mb-0">{Math.round(current.main.temp)}°C</h1>
            <h3 className="fw-bold mt-2">{current.name}, {current.sys.country}</h3>
            <p className="text-capitalize fs-5">{current.weather[0].description}</p>
            
            <div className="row mt-4">
              <div className="col-6">
                <div className="detail-item">
                  <i className="bi bi-thermometer-half"></i> Feels Like: {Math.round(current.main.feels_like)}°C
                </div>
                <div className="detail-item">
                  <i className="bi bi-droplet"></i> Humidity: {current.main.humidity}%
                </div>
              </div>
              <div className="col-6">
                <div className="detail-item">
                  <i className="bi bi-wind"></i> Wind: {current.wind.speed} m/s
                </div>
                <div className="detail-item">
                  <i className="bi bi-speedometer2"></i> Pressure: {current.main.pressure} hPa
                </div>
              </div>
            </div>
          </div>

          {/* Center Graphic */}
          <div className="col-md-3 text-center">
            <img 
              src={`https://openweathermap.org/img/wn/${current.weather[0].icon}@4x.png`} 
              alt="Weather icon" 
              className="weather-icon-large"
              style={{ filter: 'drop-shadow(0px 10px 15px rgba(0,0,0,0.3))' }}
            />
          </div>

          {/* Hourly Forecast (Standard Boxes) */}
          <div className="col-md-4">
            <h5 className="mb-3 text-end fw-bold">Hourly Forecast</h5>
            <div className="row g-2 justify-content-end">
              {hourlyForecast.map((item, index) => {
                const time = new Date(item.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                return (
                  <div className="col-6" key={index}>
                    <div className="forecast-box">
                      <div className="small fw-bold">{time}</div>
                      <img src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`} alt="icon" width="40" />
                      <div className="fs-5 fw-bold">{Math.round(item.main.temp)}°</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom 5-Day Forecast */}
      <h5 className="mb-3 text-start fw-bold">5-Day Forecast</h5>
      <div className="row g-3">
        {dailyForecast.map((item, index) => {
          const date = new Date(item.dt * 1000);
          const dayName = date.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();
          return (
            <div className="col" key={index}>
              <div className="glass-panel text-center py-4">
                <h5 className="fw-bold mb-1">{dayName}</h5>
                <img src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`} alt="icon" width="60" />
                <h4 className="fw-bold mb-1">{Math.round(item.main.temp)}°C</h4>
                <div className="small opacity-75 text-capitalize">{item.weather[0].description}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WeatherDisplay;

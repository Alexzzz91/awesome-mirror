import { useActions, useStore, useStoreSelector } from '@tramvai/state';
import { useEffect } from 'react';
import { ConfigStore } from '~entities/config';
import { WeatherStore, fetchWeatherAction } from '~entities/weather';
import styles from './Weather.module.css';

const TEMP_CONSTANT = 273.15;
// const ICON_SIZE = '@2x';
const ICON_SIZE = '';

export const Weather = () => {
  const weatherStore = useStore(WeatherStore);

  console.log('weatherStore', weatherStore);

  const weatheApiKey = useStoreSelector(
    ConfigStore,
    (state) => state.weatheApiKey
  );
  const weather = useStoreSelector(
    WeatherStore,
    (state) => state.weather && state.weather[0] && state.weather[0]
  );

  const loadWeather = useActions(fetchWeatherAction);

  useEffect(() => {
    const getWeather = (lat: number, lon: number) =>
      loadWeather({
        apiKey: weatheApiKey,
        lat,
        lon,
      }).catch(error);
    const savedData = localStorage.getItem('position.coords');
    if (savedData) {
      const lat = savedData.split('+')[0];
      const lon = savedData.split('+')[1];

      getWeather(lat as unknown as number, lon as unknown as number);
    }

    if (!navigator.geolocation) {
      return console.warn('Geolocation not supported!');
    }
    function error(e) {
      console.error(e);
    }

    navigator.geolocation.getCurrentPosition(function (position) {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      localStorage.setItem('position.coords', `${lat}+${lon}`);
      getWeather(lat, lon);
    }, error);
  }, [loadWeather, weatheApiKey]);

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        {weather?.icon && (
          <img
            alt={weather.description}
            src={`https://openweathermap.org/img/wn/${weather?.icon}${ICON_SIZE}.png`}
          />
        )}

        <span>
          {Math.floor(
            (weatherStore?.main?.temp ?? TEMP_CONSTANT) - TEMP_CONSTANT
          )}
          ℃
        </span>
      </div>
      <div className={styles.row}>
        Ощущается как:{' '}
        {Math.floor(
          (weatherStore?.main?.feels_like ?? TEMP_CONSTANT) - TEMP_CONSTANT
        )}
        ℃
        <span />
      </div>
      <span>{weatherStore?.name}</span>
    </div>
  );
};

Weather.actions = [fetchWeatherAction];

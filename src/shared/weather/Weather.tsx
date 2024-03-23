// import styles from './Weather.module.css';

import { useActions, useStore, useStoreSelector } from '@tramvai/state';
import { useEffect } from 'react';
import { ConfigStore } from '~entities/config';
import { WeatherStore, fetchWeatherAction } from '~entities/weather';

export const Weather = () => {
  const weatherStore = useStore(WeatherStore);

  console.log('weatherStore', weatherStore);

  const weatheApiKey = useStoreSelector(
    ConfigStore,
    (state) => state.weatheApiKey
  );

  const loadWeather = useActions(fetchWeatherAction);

  useEffect(() => {
    const getWeather = (lat: number, lon: number) =>
      loadWeather({
        apiKey: weatheApiKey,
        lat,
        lon,
      })
        .then((e) => console.log('e', e))
        .catch(error);
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
    <div className="text-right top-right weather">
      <div>
        <i className="wi wi-day-sunny" />
        &nbsp;
        <span />
        &#8451;
      </div>
      <div>
        Ощущается как:
        <span />
        &#8451
      </div>
      <h5>Moscow</h5>
    </div>
  );
};

Weather.actions = [fetchWeatherAction];

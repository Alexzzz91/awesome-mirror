export interface WeatherResponce {
  coord: Coord;
  weather: Weather[];
  base: string;
  main: Main;
  visibility: number;
  wind: Wind;
  clouds: Clouds;
  dt: number;
  sys: Sys;
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export interface Coord {
  lon: number;
  lat: number;
}

export const enum MainWeather {
  Clear = 'Clear',
  Clouds = 'Clouds',
  Rain = 'Rain',
  Thunderstorm = 'Thunderstorm',
  Snow = 'Snow',
  Fog = 'Fog',
}

export interface Weather {
  id: number;
  main: MainWeather;
  description: string;
  icon: string;
}

export interface Main {
  temp: number;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  feels_like: number;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  temp_min: number;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  temp_max: number;
  pressure: number;
  humidity: number;
}

export interface Wind {
  speed: number;
  deg: number;
}

export interface Clouds {
  all: number;
}

export interface Sys {
  type: number;
  id: number;
  country: string;
  sunrise: number;
  sunset: number;
}

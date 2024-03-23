/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable no-undef */
window.momentum = window.momentum || {};

// Weather

momentum.WeatherCtrl = function () {
  this.apiKey = 'e7238ba6d604e266124dd596dfdf2645';
  this.apiUrl = `http://api.openweathermap.org/data/2.5/weather?APPID=${this.apiKey}`;
};

momentum.WeatherCtrl.prototype = {
  // `fetchWeather(cb<Function>)` method
  // This function should fetch the current weather in Philly by performing an AJAX call. It should pass the given cb (callback) function to the success property of the call.
  //
  // hint. look into $.ajax here: http://api.jquery.com/jquery.ajax/
  // hint. read through the documentation for the OpenWeatherAPI.

  fetchWeather(lat, lon, cb) {
    $.ajax({
      url: `${this.apiUrl}&lat=${lat}&lon=${lon}`,
      method: 'GET',
      success: cb,
    });
  },
};

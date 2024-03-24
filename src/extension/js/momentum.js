/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable eslint-comments/no-duplicate-disable */
// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-undef */
window.momentum = window.momentum || {};

// Core - time, image

const getRandomInt = (min, max) =>
  Math.floor(Math.random() * (max - min)) + min;

// eslint-disable-next-line no-undef
momentum.Core = function () {
  this.timeStr = '';
  this.quoteStr = '';
  this.weatherStr = '';
  this.weatherFeelsLikeStr = '';
  this.weather = 'Clear';
  this.ampm = 'AM';
  this.salutation = 'morning';
  this.location = 'Moscow';

  // eslint-disable-next-line no-undef
  this.timeEl = $('#time');
  this.quoteEl = $('#quote-text');
  this.weatherEl = $('#weather');
  this.weatherFeelsLikeEl = $('#weatherFeelsLike');
  this.weatherIconEl = $('#weatherIcon');
  this.greetingEl = $('#greetings');
  this.ampmEl = $('#ampm');
  this.city = $('#location');
  // eslint-disable-next-line no-unused-expressions
  this.lat;
  // eslint-disable-next-line no-unused-expressions
  this.lon;

  // weather controller
  // eslint-disable-next-line no-undef
  this.weatherCtrl = new momentum.WeatherCtrl();

  // quote controller
  // eslint-disable-next-line no-undef
  this.quoteCtrl = new momentum.QuoteCtrl();
};

// eslint-disable-next-line no-undef
momentum.Core.prototype = {
  // `setTime` method
  // This method should calculate the current time and save it to timeStr in the form HH:MM, like: 12:01 or 21:34.
  //
  // hint. check out the `Date` object! Use `getHours` and `getMinutes`.
  setTime() {
    // YOUR CODE HERE
    const date = new Date();
    let hours = date.getHours();
    if (hours > 22 || (hours > 0 && hours < 6)) {
      this.salutation = 'night';
    }
    if (hours > 6) {
      this.salutation = 'morning';
    }
    if (hours > 12) {
      this.salutation = 'afternoon';
    }
    if (hours > 18) {
      this.salutation = 'evening';
    }
    if (hours > 22) {
      this.salutation = 'night';
    }
    if (hours > 11 && hours < 24) {
      this.ampm = 'PM';
    }
    if (hours > 12) {
      hours -= 12;
    }
    let mins = date.getMinutes();
    if (mins < 10) {
      const txt = `0${mins}`;
      mins = txt;
    }
    let ret = '';
    ret = `${ret + hours}:${mins}`;
    this.timeStr = ret;
  },
  // `setQuote` method
  // This method should set the `quoteStr` property of the momentum core. This method will be used as the callback for quoteCtrl's `fetchQuote` function.
  //
  // hint. check out the `Date` object! Use `getHours` and `getMinutes`.
  // hint. figure out what kind of response the quoteData is going to be, and see how you might be able to access the quote of the day from that.
  setQuote(quoteData) {
    this.quoteStr = quoteData.message;
    this.quoteEl.text(this.quoteStr);
    this.render();
  },
  // `setWeather` method
  // This method should set the `weatherStr` property of the momentum core. This method will be used as the callback for weatherCtrl's `fetchWeather` function.
  //
  // hint. figure out what kind of response the weatherData is going to be, and see how you might be able to access the quote of the day from that.
  setWeather(weatherData) {
    const dataJSON = JSON.stringify({
      weatherData,
      time: new Date(),
    })

    localStorage.setItem('weatherData', dataJSON)

    // YOUR CODE HERE
    this.weather =
      weatherData.weather &&
      weatherData.weather[0] &&
      weatherData.weather[0].main;
    this.weathericon =
      weatherData.weather &&
      weatherData.weather[0] &&
      weatherData.weather[0].icon;

    this.weatherStr = Math.floor(weatherData.main.temp - 273.15);
    this.weatherFeelsLikeStr = Math.floor(weatherData.main.feels_like - 273.15);
    this.weatherIconEl[0].setAttribute(
      'src',
      `https://openweathermap.org/img/wn/${this.weathericon}@2x.png`
    );
    this.location = weatherData.name;
    this.updateQuote();
    this.render();
  },
  // `updateTime` method
  // This function should call setTime() so that this.timeStr is updated.
  updateTime() {
    // YOUR CODE HERE
    this.setTime();
  },
  // `updateWeather` method
  // This function should call weatherCtrl.fetchWeather and pass in this.setWeather as the callback.
  //
  // note. you might run into scoping issues again. You should know how to solve them by now, using .call, .apply, or .bind.
  updateWeather() {
    const getWeather = () => {
      this.weatherCtrl.fetchWeather(
        this.lat,
        this.lon,
        this.setWeather.bind(this)
      );
    };

    try {
      const cachedWeatherData = JSON.parse(localStorage.getItem('weatherData'))

      if (!cachedWeatherData) {
        getWeather();
      } else {
        const cachedWeatherTime = new Date(cachedWeatherData.time)

        if ((new Date().getTime() - cachedWeatherTime.getTime()) > 1200000) {
          localStorage.removeItem('weatherData')
          getWeather();
        }

        this.setWeather(cachedWeatherData.weatherData)
      }
    } catch (error) {
      getWeather();
    }
  },
  // `updateQuote` method
  // This function should call quoteCtrl.fetchQuote and pass in this.setQuote as the callback.
  //
  // note. you might run into scoping issues again. You should know how to solve them by now, using .call, .apply, or .bind.
  updateQuote() {
    // YOUR CODE HERE
    const allCompliments = {
      morning: {
        time_start: 6,
        time_stop: 12,
        generic: [
          'Выглядишь как несвежий труп',
          'Смени прическу. Тебе не идет.',
          'Иди работай!',
        ],
        Clear: ['Какое замечательное утро!'],
        Clouds: ['Опять тучи. Как обычно', 'Долбанные тучи на небе'],
        Rain: ['На улице дождь. Опять.'],
        Thunderstorm: ['Гроза, епт! Оо'],
        Snow: ['Не выходи из дома, не совершай ошибку!'],
        Fog: ["Ты читал 'Туман' Кинга?"],
      },
      afternoon: {
        time_start: 12,
        time_stop: 18,
        generic: [
          'Что ты дома-то делаешь днем?',
          'Сделай что-нибудь полезное',
          'Дома уберись, что ли',
        ],
        Clear: ['Вампирам на улицу не выходить!'],
        Clouds: [
          'Солнца опять не видно за тучами',
          'Тучи опять закрыли все небо',
        ],
        Rain: ['Да там ливень! Офигеть!', 'Мокрый дождя не боится.'],
        Thunderstorm: ['Вау, гроза!'],
        Snow: ['Снег это фигово. Но зато не дождь. Надо же искать плюсы?'],
        Fog: ['Туман? Серьезно? Ебануться!'],
      },
      evening: {
        time_start: 18,
        time_stop: 22,
        generic: ['Хватит работать, отдохни!'],
        Clear: ['Сфоткай небо, закат наверное шикарный?'],
        Clouds: ['Эти тучи даже вечером не уходят'],
        Rain: ['Опять льет? Сколько можно?'],
        Thunderstorm: ['Гром гремит, земля трясется'],
        Snow: ['К счастье, не надо идти в этот снег. Не надо же, да?'],
        Fog: ['Режим: Сайлент Хилл - активирован'],
      },
      night: {
        time_start: 22,
        time_stop: 6,
        generic: ['Ложись спать, хули тупишь?', 'Иди спать, тупень'],
        Clear: ['Небо чистое, но ночью на это пофиг'],
        Clouds: ['Тут тучи даже ночью! Какое счастье, что их не видно'],
        Rain: ['Лучше пусть ночью льет, чем днем'],
        Thunderstorm: ['Ты боишься молний?', 'Иди, смотри, там молнии ебашут!'],
        Snow: ['Завтра утром будет бело. Фиг проберешься через снег'],
        Fog: ['Туман, вау'],
      },
    };

    // this.quoteCtrl.fetchQuote(this.setQuote.bind(this));
    const complimentsObj = allCompliments[this.salutation];
    let complimentVariants = [...complimentsObj.generic];

    if (this.weather && complimentsObj[this.weather]) {
      complimentVariants = complimentVariants.concat(
        complimentsObj[this.weather]
      );
    }

    this.setQuote({
      message: complimentVariants[getRandomInt(0, complimentVariants.length)],
    });
  },

  getCurrentPosition() {
    if (!navigator.geolocation) {
      // eslint-disable-next-line no-throw-literal
      throw 'Geolocation not supported!';
    }
    function error(e) {
      this.updateQuote();
      console.error(e);
    }

    navigator.geolocation.getCurrentPosition(
      function (position) {
        this.lat = position.coords.latitude;
        this.lon = position.coords.longitude;
        this.updateWeather();
      }.bind(this),
      error
    );
  },

  // `start` method
  // This method will call some of the `update...` methods. This function will be called when the page has finished loading, so that Momentum can start off with the more up-to-date data.
  start() {
    // get location

    this.getCurrentPosition();
    this.setTime();

    this.render();
  },
  // `render` method
  // This method should "render" the time, quote and weather strings on your page by replacing the text value of your elements with their respective properties.
  // ex. this.timeStr will be rendered on to the screen using this.timeEl.text(this.timeStr);
  render() {
    // YOUR CODE HERE
    this.timeEl.text(this.timeStr);
    this.greetingEl.text(`Good ${this.salutation}, Alexander`);
    this.ampmEl.text(this.ampm);
    this.weatherEl.text(this.weatherStr);
    this.weatherFeelsLikeEl.text(this.weatherFeelsLikeStr);
    this.quoteEl.text(this.quoteStr);
    this.city.text(this.location);
  },
};

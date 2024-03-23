import { useEffect, useState } from 'react';
import { useStoreSelector } from '@tramvai/state';
import { WeatherStore } from '~entities/weather';
import styles from './Focus.module.css';

const allCompliments = {
  morning: {
    timeStart: 6,
    timeStop: 12,
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
    timeStart: 12,
    timeStop: 18,
    generic: [
      'Что ты дома-то делаешь днем?',
      'Сделай что-нибудь полезное',
      'Дома уберись, что ли',
    ],
    Clear: ['Вампирам на улицу не выходить!'],
    Clouds: ['Солнца опять не видно за тучами', 'Тучи опять закрыли все небо'],
    Rain: ['Да там ливень! Офигеть!', 'Мокрый дождя не боится.'],
    Thunderstorm: ['Вау, гроза!'],
    Snow: ['Снег это фигово. Но зато не дождь. Надо же искать плюсы?'],
    Fog: ['Туман? Серьезно? Ебануться!'],
  },
  evening: {
    timeStart: 18,
    timeStop: 22,
    generic: ['Хватит работать, отдохни!'],
    Clear: ['Сфоткай небо, закат наверное шикарный?'],
    Clouds: ['Эти тучи даже вечером не уходят'],
    Rain: ['Опять льет? Сколько можно?'],
    Thunderstorm: ['Гром гремит, земля трясется'],
    Snow: ['К счастье, не надо идти в этот снег. Не надо же, да?'],
    Fog: ['Режим: Сайлент Хилл - активирован'],
  },
  night: {
    timeStart: 22,
    timeStop: 6,
    generic: ['Ложись спать, хули тупишь?', 'Иди спать, тупень'],
    Clear: ['Небо чистое, но ночью на это пофиг'],
    Clouds: ['Тут тучи даже ночью! Какое счастье, что их не видно'],
    Rain: ['Лучше пусть ночью льет, чем днем'],
    Thunderstorm: ['Ты боишься молний?', 'Иди, смотри, там молнии ебашут!'],
    Snow: ['Завтра утром будет бело. Фиг проберешься через снег'],
    Fog: ['Туман, вау'],
  },
};

const getRandomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min)) + min;

enum SALUTATION {
  NIGHT = 'night',
  MORNING = 'morning',
  AFTERNOON = 'afternoon',
  EVENING = 'evening',
}

export const Focus = () => {
  const [focus, setFocus] = useState<string>('Соберись!');
  const [salutation, setSalutation] = useState<SALUTATION>();
  const weather = useStoreSelector(WeatherStore, (store) => {
    return store?.weather && store?.weather[0] && store?.weather[0]?.main;
  });

  useEffect(() => {
    const getSalutation = () => {
      const date = new Date();
      const hours = date.getHours();
      if (hours > 22 || (hours > 0 && hours < 6)) {
        setSalutation(SALUTATION.NIGHT);
      }
      if (hours > 6) {
        setSalutation(SALUTATION.MORNING);
      }
      if (hours > 12) {
        setSalutation(SALUTATION.AFTERNOON);
      }
      if (hours > 18) {
        setSalutation(SALUTATION.EVENING);
      }
    };

    getSalutation();
    setInterval(getSalutation, 3600000);
  }, []);

  useEffect(() => {
    if (!salutation) {
      return;
    }

    console.log('weather', weather);
    const complimentsObj = allCompliments[salutation];
    let complimentVariants = [...complimentsObj.generic];

    if (weather && complimentsObj[weather]) {
      complimentVariants = complimentVariants.concat(complimentsObj[weather]);
    }
    setFocus(complimentVariants[getRandomInt(0, complimentVariants.length)]);
  }, [salutation, weather]);

  return (
    <section className={styles.Container} aria-label="Focus">
      <div className={styles.Text}>{focus}</div>
    </section>
  );
};

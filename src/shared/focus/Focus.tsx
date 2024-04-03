import { useEffect, useState } from 'react';
import { useStore, useStoreSelector } from '@tramvai/state';
import { WeatherStore } from '~entities/weather';
import { ConfigStore } from '~entities/config';
import styles from './Focus.module.css';
import { allCompliments } from './Focus.const';

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
  const { userName } = useStore(ConfigStore);
  const weather = useStoreSelector(WeatherStore, (store) => {
    return store?.weather && store?.weather[0] && store?.weather[0]?.main;
  });

  useEffect(() => {
    const getSalutation = () => {
      const date = new Date();
      const hours = date.getHours();

      if (hours > 22 || (hours >= 0 && hours < 6)) {
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

    const complimentsObj = allCompliments[salutation];
    let complimentVariants = [...complimentsObj.generic];

    if (weather && complimentsObj[weather]) {
      complimentVariants = complimentVariants.concat(complimentsObj[weather]);
    }

    setFocus(complimentVariants[getRandomInt(0, complimentVariants.length)]);
  }, [salutation, weather]);

  return (
    <section className={styles.Container} aria-label="Focus">
      {userName && <div className={styles.UserName}>{userName}</div>}
      <div className={styles.Text}>{focus}</div>
    </section>
  );
};

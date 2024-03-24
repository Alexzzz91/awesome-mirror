import { Clock } from '~shared/clock/Clock';
import { Focus } from '~shared/focus/Focus';
import { News } from '~shared/news/News';
import { Weather } from '~shared/weather/Weather';

import styles from './index.module.css';

// console.log('styles.bgWrapper', styles.bgWrapper);

export const MirrorPage = () => {
  return (
    <main>
      <div className={styles.topRow}>
        <Clock />
        <Weather />
      </div>
      <News />
      <Focus />
    </main>
  );
};

export default MirrorPage;

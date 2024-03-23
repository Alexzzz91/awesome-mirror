import { Clock } from '~shared/clock/Clock';
import { Focus } from '~shared/focus/Focus';
import { News } from '~shared/news/News';
import { Weather } from '~shared/weather/Weather';

// import styles from './index.module.css';

export const MirrorPage = () => {
  return (
    <main>
      <Clock />
      <News />
      <Focus />
      <Weather />
    </main>
  );
};

export default MirrorPage;

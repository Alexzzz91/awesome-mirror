import { Clock } from '~shared/clock/Clock';
import { News } from '~shared/news/News';

// import styles from './index.module.css';

// console.log('styles.bgWrapper', styles.bgWrapper);

export const MirrorPage = () => {
  return (
    <main>
      <Clock />
      <News />
    </main>
  );
};

export default MirrorPage;

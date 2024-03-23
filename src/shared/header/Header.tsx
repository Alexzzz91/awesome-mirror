import { Navigation } from '~shared/navigation/Navigation';
import styles from './Header.module.css';

export const Header = () => {
  return (
    <header className={styles.Header}>
      <Navigation />
    </header>
  );
};

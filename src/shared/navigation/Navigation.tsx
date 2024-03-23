import { Link } from '@tramvai/module-router';
import styles from './Navigation.module.css';

export const Navigation = () => {
  return (
    <ul className={styles.Menu}>
      <li className={styles.MenuItem}>
        <Link url="/config/" className={styles.MenuAnchor}>
          Config PAge
        </Link>
      </li>
      <li className={styles.MenuItem}>
        <Link url="/mirror/" className={styles.MenuAnchor}>
          Mirror PAge
        </Link>
      </li>
      <li className={styles.MenuItem}>
        <Link url="/" className={styles.MenuAnchor}>
          Index
        </Link>
      </li>
    </ul>
  );
};

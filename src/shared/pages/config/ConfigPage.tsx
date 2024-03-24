import { useEvents, useStore } from '@tramvai/state';
import type { ChangeEvent } from 'react';
import { useCallback, useEffect, useState } from 'react';
import { ConfigStore, pushUserNameEvent } from '~entities/config';

import styles from './ConfigPage.module.css';

const events = [pushUserNameEvent];

export const CommonConfigPage = () => {
  const handleFullscreen = useCallback(() => {
    const app = document.getElementsByClassName('application')[0];
    if (app?.webkitSupportsFullscreen) {
      app.webkitEnterFullscreen();
      return;
    }

    app?.requestFullscreen();
  }, []);

  const { userName } = useStore(ConfigStore);
  const [dispatchUserName] = useEvents(events);
  const [currentUserName, setUserName] = useState(userName);

  useEffect(() => {
    setUserName(userName);
  }, [userName]);

  const handleOnChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => setUserName(event.target.value),
    []
  );

  const handleSetNameEvent = useCallback(() => {
    dispatchUserName(currentUserName);
  }, [dispatchUserName, currentUserName]);

  return (
    <main className={styles.container}>
      <button type="button" onClick={handleFullscreen} className={styles.btn}>
        fullScreen
      </button>

      <div className={styles.inputBox}>
        <label htmlFor="input">Имя пользователя -</label>
        <div className={styles.inputBoxWithButton}>
          <input
            placeholder="Ваше имя"
            value={currentUserName}
            onChange={handleOnChange}
          />
          <button
            type="button"
            onClick={handleSetNameEvent}
            className={styles.btn}
          >
            Сохранить
          </button>
        </div>
      </div>
    </main>
  );
};

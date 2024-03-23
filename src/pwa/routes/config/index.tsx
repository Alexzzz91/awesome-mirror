import { useCallback } from 'react';

export const ConfigPage = () => {
  const handleFullscreen = useCallback(() => {
    const app = document.getElementsByClassName('application')[0];
    if (app?.webkitSupportsFullscreen) {
      app?.webkitEnterFullscreen();
      return;
    }

    app?.requestFullscreen();
  }, []);

  return (
    <main>
      <p>Welcome! config</p>

      <button type="button" onClick={handleFullscreen}>
        fullScreen
      </button>
    </main>
  );
};

export default ConfigPage;

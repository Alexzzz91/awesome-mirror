import cn from 'classnames';
import styles from './News.module.css';

export const News = () => {
  return (
    <section className={styles.Carousel} aria-label="Gallery">
      <ol className={styles.CarouselViewport}>
        <li className={styles.CarouselSlide}>
          <div className={styles.CarouselSnapper} />
          <div className={cn(styles.PreviousItem, styles.Item)}>
            <div className={styles.ItemTitle}>
              &quot;Яндекс&quot; перерегистрировал часть приложений на сербского
              провайдера
            </div>
            <span className={styles.ItemSubTitile}>
              Суд назначил Google третий оборотный штраф в размере 4,6 миллиарда
              рублей
            </span>
          </div>
        </li>
        <li className={styles.CarouselSlide}>
          <div className={styles.CarouselSnapper} />
          <div className={cn(styles.CurrentItem, styles.Item)}>
            <div className={styles.ItemTitle}>
              Клименко: Украина столкнулась тем, что если про вас не пишут, то
              вас нет
            </div>
            <span className={styles.ItemSubTitile}>
              Клименко: Украина &quot;выпала из тренда&quot;, это показали
              данные Google Trends
            </span>
          </div>
        </li>
        <li className={styles.CarouselSlide}>
          <div className={styles.CarouselSnapper} />
          <div className={cn(styles.NextItem, styles.Item)}>
            <div className={styles.ItemTitle}>
              рнк оштрафовал Google и Telegram на 900 тысяч рублей
            </div>
            <span className={styles.ItemSubTitile}>
              рнк оштрафовал Google и Telegram из-за неисполнения закона
            </span>
          </div>
        </li>
      </ol>
    </section>
  );
};

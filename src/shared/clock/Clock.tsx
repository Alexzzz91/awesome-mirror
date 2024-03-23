import { useEffect, useRef, useState } from 'react';
import styles from './Clock.module.css';

// const days = [
//   'sunday',
//   'monday',
//   'tuesday',
//   'wednesday',
//   'thursday',
//   'friday',
//   'saturday',
// ];

const days = [
  'Воскресенье',
  'Понедельник',
  'Вторник',
  'Среда',
  'Четверг',
  'Пятница',
  'Суббота',
];

// const months = [
//   'January',
//   'February',
//   'March',
//   'April',
//   'May',
//   'June',
//   'July',
//   'August',
//   'September',
//   'October',
//   'November',
//   'December',
// ];

const months = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июля',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
];

const pad = (number: number, padValue: number) => {
  let r = number.toString();

  for (r = number.toString(); r.length < padValue; r = 0 + r);

  return r;
};

export const Clock = () => {
  const monthRef = useRef<HTMLDivElement | null>(null);
  const dayRef = useRef<HTMLDivElement | null>(null);
  const yearRef = useRef<HTMLDivElement | null>(null);

  const dayNameRef = useRef<HTMLDivElement | null>(null);

  const hourRef = useRef<HTMLDivElement | null>(null);
  const minutesRef = useRef<HTMLDivElement | null>(null);
  const secondsRef = useRef<HTMLDivElement | null>(null);
  const milliSecondsRef = useRef<HTMLDivElement | null>(null);
  const [everySecondsUpdate, setEverySecondsUpdate] = useState<boolean>(true);

  global.console.log('setEverySecondsUpdate', setEverySecondsUpdate);

  useEffect(() => {
    const animator = () => {
      if (
        !monthRef.current ||
        !dayRef.current ||
        !yearRef.current ||
        !hourRef.current ||
        !minutesRef.current ||
        // !secondsRef.current ||
        // !milliSecondsRef.current ||
        !dayNameRef.current
      ) {
        return;
      }

      const now = new Date();
      const mo = now.getMonth();
      const dy = now.getDate();
      const yr = now.getFullYear();

      const hou = now.getHours();
      const min = now.getMinutes();
      // const sec = now.getSeconds();
      // const milli = now.getMilliseconds();

      monthRef.current.textContent = months[mo];

      dayRef.current.textContent = `${dy}`;
      yearRef.current.textContent = `${yr}`;

      hourRef.current.textContent = pad(hou, 2);
      minutesRef.current.textContent = pad(min, 2);
      // secondsRef.current.textContent = pad(sec, 2);
      // milliSecondsRef.current.textContent = `${milli}`;

      dayNameRef.current.textContent = days[now.getDay()];

      if (everySecondsUpdate) {
        window.requestAnimationFrame(animator);

        return;
      }

      setTimeout(() => {
        window.requestAnimationFrame(animator);
      }, 1000);
    };

    window.requestAnimationFrame(animator);
  }, [
    everySecondsUpdate,
    monthRef,
    dayRef,
    yearRef,
    hourRef,
    minutesRef,
    secondsRef,
    milliSecondsRef,
  ]);

  return (
    <div className={styles.Container}>
      <div className={styles.Clock}>
        <div className={styles.Row}>
          <div ref={monthRef}>January</div>
          <div ref={dayRef}>1</div>,<div ref={yearRef}>0</div>
        </div>
        <div className={styles.Row}>
          <div ref={dayNameRef}> </div>
        </div>
        <div className={styles.Row}>
          <div ref={hourRef}>12</div> :<div ref={minutesRef}>00</div>
          {/* {everySecondsUpdate && (
            <>
              : <div ref={secondsRef}>00</div> :
              <div ref={milliSecondsRef}>000</div>
            </>
          )} */}
        </div>
      </div>
    </div>
  );
};

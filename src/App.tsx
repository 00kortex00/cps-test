import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { ClickArea } from './components/ClickArea'
import { TimeLeft } from './components/TimeLeft';
import { TimeSelect } from './components/TimeSelect';
import { FinishPopup } from './components/FinishPopup';
import style from './app.module.css';

function App() {
  const [isRunning, setRunning] = useState<boolean>(false);
  const [startTime, setStartTime] = useState<number>(10);
  const [timeLeft, setTimeLeft] = useState<number>(10);
  const [popup, setPopup] = useState<ReactNode | null>(null);
  const clicksRef = useRef<number>(0);

  const onClick = useCallback(() => {
    if(!isRunning) setRunning(true);
    clicksRef.current = clicksRef.current + 1;
  }, [isRunning])

  function finish() {
    setRunning(false);
    setTimeLeft(startTime);
    setPopup(<FinishPopup clicks={clicksRef.current} startTime={startTime} closePopup={closePopup}  />)
  }

  function closePopup() {
    setPopup(null);
  }

  useEffect(() => {
    if(!isRunning) return;
    clicksRef.current = 1;
    const timerInterval = setInterval(() => {
      setTimeLeft((prev) => {
        if(prev - 1 <= 0) {
          finish();
          return startTime;
        }
        return (prev - 1);
      });
    }, 1000)

    return () => {
      clearInterval(timerInterval);
    }
  }, [isRunning, startTime])

  return (
    <>
      <h1>CPS test</h1>
      <p>How fast can you click?</p>
      <ClickArea onClick={onClick} isRunning={isRunning} />
      <TimeLeft time={timeLeft} />

      <TimeSelect setTimeLeft={setTimeLeft} setStartTime={setStartTime} isRunning={isRunning} />

      {popup && (
        <div className={style.popup}>
          {popup}
        </div>
      )}
    </>
  )
}

export default App

import { memo, type FC } from 'react';
import style from './time-select.module.css';

interface TimeSelectProps {
    setTimeLeft: (time: number) => void;
    setStartTime: (time: number) => void;
    isRunning: boolean;
}

export const TimeSelect: FC<TimeSelectProps> = memo(({ setTimeLeft, setStartTime, isRunning }) => {
    const times: Array<number> = [1, 3, 5, 10, 15, 20, 30];
    function selectTime(time: number) {
        setStartTime(time);
        setTimeLeft(time);
    }

    return (
        <div className={style.timeSelect}>
            <strong>Select time</strong>
            <div>
                {times.map((time) => (
                    <button disabled={isRunning} key={time} onClick={() => selectTime(time)}>{time}s</button>
                ))}
            </div>
        </div>
    );
})
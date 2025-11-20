import { memo, type FC } from "react";
import style from './time-left.module.css';

interface TimeLeftProps {
    time: number;
}

export const TimeLeft: FC<TimeLeftProps> = memo(({ time }) => {
    return (
        <div className={style.timeLeft}>
            <span>Time left:</span>
            <span>{time}s</span>
        </div>
    );
})
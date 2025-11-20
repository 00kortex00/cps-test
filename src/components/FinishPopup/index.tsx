import type { FC } from "react";
import style from './finish-popup.module.css';

interface FinishPopupProps {
    clicks: number;
    startTime: number;
    closePopup: () => void;
}

export const FinishPopup: FC<FinishPopupProps> = ({ clicks, startTime, closePopup }) => {
    return (
        <div className={style.finishPopup}>
            <h2>Result</h2>
            <p>Your CPS: {parseFloat((clicks / startTime).toFixed(2))}</p>
            <button onClick={closePopup}>Close</button>
        </div>
    );
}
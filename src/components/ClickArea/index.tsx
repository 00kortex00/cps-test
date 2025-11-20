import { memo, useEffect, useRef, type FC, type MouseEventHandler } from 'react';
import style from './click-area.module.css';

interface ClickAreaProps {
    isRunning: boolean;
    onClick: () => void;
    disabled?: boolean;
}

export const ClickArea: FC<ClickAreaProps> = memo(({ isRunning, onClick, disabled=false }) => {
    const clickTimeoutRef = useRef<number | null>(null);

    const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
        onClick();
        if(clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);

        const button = event.currentTarget as HTMLButtonElement;
        button.classList.add(style.click);

        clickTimeoutRef.current = setTimeout(() => {
            button.classList.remove(style.click);
        }, 50);
    }

    useEffect(() => {
        return () => {
            if(clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
        }
    }, [])

    return (
        <button
            className={[
                style.clickArea,
                (isRunning) && style.started
            ].filter(Boolean).join(' ')}
            onClick={handleClick}
            disabled={disabled}
        >
            {!isRunning && 'Click here to start!'}
            {isRunning && 'Click as fast as you can!'}
        </button>
    );
})
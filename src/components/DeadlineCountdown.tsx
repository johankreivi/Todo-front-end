import React from 'react';
import dayjs from 'dayjs';

interface Props {
    deadline: string | null;
}

const DeadlineCountdown: React.FC<Props> = ({ deadline }) => {
    if (!deadline) {
        return (
            <>
            "null va de här"
            </>
            );
    }

    const now = dayjs();
    const deadlineDate = dayjs(deadline);
    const diff = deadlineDate.diff(now, 'minute');

    let color = "#ff4d4f"; // default color for when deadline has passed
    if (diff > 0 && diff <= 1440) {
        color = "#ffa940"; // orange color for when deadline is within 1 day
    } else if (diff > 1440) {
        color = "#52c41a"; // green color for when deadline is more than 1 day away
    }

    if (diff < 0) {
        const diffInDays = Math.abs(deadlineDate.diff(now, 'day'));
        const diffInHours = Math.abs(deadlineDate.diff(now, 'hour') % 24);
        const diffInMinutes = Math.abs(deadlineDate.diff(now, 'minute') % 60);
        return (
            <>
                <span style={{color}}>
                    Deadline passed: {diffInDays} d, {diffInHours} h and {diffInMinutes} m ago
                </span>
            </>
        );
    }

    const diffInDays = Math.floor(diff / 1440);
    const diffInHours = Math.floor((diff % 1440) / 60);
    const diffInMinutes = diff % 60;

    return (
        <>
            <span style={{color}}>
                {diffInDays} d, {diffInHours} h and {diffInMinutes} m until deadline
            </span>
        </>
    );
};

export default DeadlineCountdown;

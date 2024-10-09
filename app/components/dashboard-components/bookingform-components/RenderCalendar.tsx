'use client'
import React, { useEffect, useState } from 'react'
import BookingCalenderForm from '../BookingForm'
import { today, getLocalTimeZone, parseDate, CalendarDate } from '@internationalized/date';
import { DateValue } from '@react-types/calendar'
import { useRouter, useSearchParams } from 'next/navigation';

interface iAppProps {
    availability: {
        day: string;
        isActive: boolean;
    }[];
}
const RenderCalendar: React.FC<iAppProps> = ({ availability }) => {
    const searchParam = useSearchParams();
    const router = useRouter();

    const [date, setDate] = useState(() => {
        const dateParam = searchParam.get('date');
        return dateParam ? parseDate(dateParam) : today(getLocalTimeZone());
    });

    useEffect(()=>{
        const dateParam = searchParam.get('date');
        if(dateParam){
           setDate(parseDate(dateParam));
        }
    },[searchParam]);

    const handleDateChange = (date:DateValue) => {
        setDate(date as CalendarDate);
        const url = new URL(window.location.href);
        url.searchParams.set("date",date.toString());
        router.push(url.toString());
    }

    const isDateUnavailable = (date: DateValue) => {
        const dayOfweek = date.toDate(getLocalTimeZone()).getDay();
        const adjustedIndex = dayOfweek === 0 ? 6 : dayOfweek - 1;
        console.log(!availability[adjustedIndex]?.isActive);
        return !availability[adjustedIndex]?.isActive;
    };

    return (
        <BookingCalenderForm
            minValue={today(getLocalTimeZone())}
            isDateUnavailable={isDateUnavailable}
            value={date}
            onChange={handleDateChange}
        />
    )
}

export default RenderCalendar
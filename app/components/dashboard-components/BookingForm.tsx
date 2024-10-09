'use client'
import React from 'react';
import { CalendarProps, useCalendar, useLocale } from 'react-aria';
import { useCalendarState } from 'react-stately';
import {DateValue} from '@react-types/calendar'
import { createCalendar } from '@internationalized/date';
import { CalenderGrid, CalenderHeader } from './bookingform-components';

const BookingCalenderForm = (props: CalendarProps<DateValue> & {
    isDateUnavailable?: (date: DateValue) => boolean
}) => {
    const { locale } = useLocale();
    let state = useCalendarState({
        ...props,
        visibleDuration: {
            months: 1,
        },
        locale,
        createCalendar
    });
    let {
        calendarProps,
        prevButtonProps,
        nextButtonProps,
        title
    } = useCalendar(props, state);
    return (
        <section {...calendarProps} className="inline-block">
            <CalenderHeader
                state={state}
                calendarProps={calendarProps}
                prevButtonProps={prevButtonProps}
                nextButtonProps={nextButtonProps}
            />
            <div className="flex gap-8">
                <CalenderGrid
                    state={state}
                    isDateUnavailable={props.isDateUnavailable}
                />
            </div>
        </section>
    )
}

export default BookingCalenderForm
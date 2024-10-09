'use client'
import React from 'react';
import { CalendarProps, useCalendar, useLocale } from 'react-aria';
import { useCalendarState } from 'react-stately';
import { DateValue } from '@react-types/calendar'
import { createCalendar } from '@internationalized/date';
import { CalenderGrid, CalenderHeader } from './bookingform-components';

const BookingCalenderForm = (props: CalendarProps<DateValue> & {
    isDateUnavailable?: (date: DateValue) => boolean
}) => {
    const { locale } = useLocale();
    const state = useCalendarState({
        ...props,
        visibleDuration: {
            months: 1,
        },
        locale,
        createCalendar
    });
    const {
        calendarProps,
        prevButtonProps,
        nextButtonProps,
    } = useCalendar(props, state);

    return (
        <section {...calendarProps} className="inline-block relative max-md:my-10">
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
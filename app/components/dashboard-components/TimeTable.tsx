import React from 'react';
import { addMinutes, format, fromUnixTime, isAfter, isBefore, parse } from 'date-fns';
import { getTimeData } from '@/app/lib/function';
import { GetFreeBusyResponse, NylasResponse } from 'nylas';
import Link from 'next/link';
import { Button } from '../ui';

interface iAppProps {
    selectedDate: Date;
    userName: string;
    duration: number
}

const calculateAvailableTimeSlots = (date: string, dbAvailability: {
    fromTime: string | undefined;
    tillTime: string | undefined;
}, nylasData: NylasResponse<GetFreeBusyResponse[]>, duration: number) => {
    const now = new Date();

    const availableForm = parse(
        `${date} ${dbAvailability.fromTime}`,
        "yyyy-MM-dd HH:mm",
        new Date(),
    );

    const availableTill = parse(
        `${date} ${dbAvailability.tillTime}`,
        "yyyy-MM-dd HH:mm",
        new Date(),
    );

    const busySlots = nylasData.data[0].timeSlots.map((slot) => ({
        start: fromUnixTime(slot.startTime),
        end: fromUnixTime(slot.endTime),
    }));

    const allSlots: Date[] = [];
    let currentSlot = availableForm;
    while (isBefore(currentSlot, availableTill)) {
        allSlots.push(currentSlot);
        currentSlot = addMinutes(currentSlot, duration);
    }

    const freeSlots = allSlots.filter((slot) => {
        const slotEnd = addMinutes(slot, duration);
        return (
            isAfter(slot, now) &&
            !busySlots.some(
                (busy: { start: any; end: any }) =>
                    (!isBefore(slot, busy.start) && isBefore(slot, busy.end)) ||
                    (isAfter(slotEnd, busy.start) && !isAfter(slotEnd, busy.end)) ||
                    (isBefore(slot, busy.start) && isAfter(slotEnd, busy.end))
            )

        );
    });

    return freeSlots.map((slot) => format(slot, "HH:mm"))
};

const TimeTable: React.FC<iAppProps> = async ({ selectedDate, userName, duration }) => {
    const { data, nylasCalendar } = await getTimeData(userName, selectedDate);
    const formattedDate = format(selectedDate, "yyyy-MM-dd");
    const dbAvailability = {
        fromTime: data?.fromTime,
        tillTime: data?.tillTime
    }
    const availableSlots = calculateAvailableTimeSlots(
        formattedDate,
        dbAvailability,
        nylasCalendar,
        duration
    );
    return (
        <section className="relative">
            <p className="text-base font-semibold">
                {format(selectedDate, "EEE")}{" "}
                <span className="text-sm text-muted-foreground">
                    {format(selectedDate, "MMM. d")}
                </span>
            </p>
            <div className="mt-3 max-h-[350px] overflow-y-auto">
                {
                    availableSlots.length > 0 ? (
                        availableSlots.map((slot, index: number) => (
                            <Link href={`?date=${format(selectedDate,"YYYY-MM-DD")}&time=${slot}`} key={index} className=''>
                                <Button className='w-full mb-2' variant={"outline"}>
                                    {slot}
                                </Button>
                            </Link>
                        ))
                    ) : (
                        <p className="">No time slots available</p>
                    )
                }
            </div>
        </section>
    )
}

export default TimeTable
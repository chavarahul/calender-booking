import prisma from '@/app/lib/db'
import { notFound, redirect } from 'next/navigation'
import { format } from 'date-fns';
import { Prisma } from '@prisma/client';
import { nylas } from './nylas';

export const getData = async (userId: string) => {
    const data = await prisma.user.findUnique({
        where: {
            id: userId
        },
        select: {
            userName: true,
            grantId: true
        },
    });
    if (!data?.userName) {
        return redirect('/onboarding')
    }
    if (!data?.grantId) {
        return redirect("/onboarding/grant-id")
    }
}

export const getProfileData = async (id: string) => {
    const data = await prisma.user.findUnique({
        where: {
            id
        },
        select: {
            name: true,
            email: true,
            image: true,
        }
    });

    if (!data) {
        return notFound();
    }

    return data;
}

export const getAvailability = async (userId: string) => {
    const data = await prisma.availability.findMany({
        where: {
            userId: userId
        },
    });

    if (!data) {
        return notFound();
    }

    return data;
}

export const getEventData = async (userId: string) => {
    const data = await prisma.user.findUnique({
        where: {
            id: userId
        },
        select: {
            userName: true,
            eventType: {
                select: {
                    id: true,
                    active: true,
                    title: true,
                    url: true,
                    duration: true
                },
            },
        },
    });
    if (!data) {
        return notFound();
    }
    return data;
}

export const getUserBookingData = async (eventUrl: string, userName: string) => {
    const data = await prisma.eventType.findFirst({
        where: {
            url: eventUrl,
            User: {
                userName: userName,
            },
            active: true
        },
        select: {
            id: true,
            title: true,
            description: true,
            duration: true,
            videoCallsSoftware: true,
            User: {
                select: {
                    image: true,
                    name: true,
                    availability: {
                        select: {
                            day: true,
                            isActive: true
                        },
                    },
                },
            },
        },
    });

    if (!data) {
        return notFound();
    }
    return data;
};

export const getTimeData = async (userName: string, selectedDate: Date) => {

    const currentDate = format(selectedDate, "EEEE");

    const startOfDay = new Date(selectedDate);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(selectedDate);
    endOfDay.setHours(23, 59, 59, 999);

    const data = await prisma.availability.findFirst({
        where: {
            day: currentDate as Prisma.EnumDayFilter,
            User: {
                userName
            }
        },
        select: {
            fromTime: true,
            tillTime: true,
            id: true,
            User: {
                select: {
                    grantEmail: true,
                    grantId: true
                },
            },
        },
    });

    const nylasCalendar = await nylas.calendars.getFreeBusy({
        identifier: data?.User?.grantId as string,
        requestBody: {
            startTime: Math.floor(startOfDay.getTime() / 1000),
            endTime: Math.floor(endOfDay.getTime() / 1000),
            emails: [data?.User?.grantEmail as string]
        }
    });

    return {
        data,
        nylasCalendar
    };
}

export const getMeetings = async(id:string) => {
    const userData = await prisma.user.findUnique({
        where:{
            id,
        },
        select:{
            grantId:true,
            grantEmail:true,
        },
    });

    if(!userData){
        throw new Error("User not found");
    }

    const data = await nylas.events.list({
        identifier:userData.grantId as string,
        queryParams:{
            calendarId:userData.grantEmail as string,
        },
    });

    return data;
}
import prisma from '@/app/lib/db'
import { notFound, redirect } from 'next/navigation'

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
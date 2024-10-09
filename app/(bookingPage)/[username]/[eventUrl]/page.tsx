import React from 'react'
import { Card, Separator } from '@/app/components/ui'
import { CardContent } from '@/app/components/ui/card'
import { getUserBookingData } from '@/app/lib/function'
import { requireUser } from '@/app/lib/hooks'
import { CalendarX2, Clock, VideoIcon } from 'lucide-react'
import { RenderCalendar } from '@/app/components/dashboard-components/bookingform-components'
import TimeTable from '@/app/components/dashboard-components/TimeTable'

const BookingForm = async ({ params, searchParams }: {
    params: { username: string; eventUrl: string };
    searchParams: { date?: string, time?: string }
}) => {

    const data = await getUserBookingData(params.eventUrl, params.username);
    const selectedDate = searchParams.date ? new Date(searchParams.date) : new Date();
    const formatedDate = new Intl.DateTimeFormat("en-Us", {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
    }).format(selectedDate);

    const showForm = !!searchParams.date && !!searchParams.time

    return (
        <section className="min-h-screen w-screen flex items-center justify-center">
            {
                showForm ? (
                    <Card className='max-w-[600px] w-full mx-auto'>
                        <CardContent className='p-5 md:grid md:grid-cols-[1fr,auto,1fr] md:gap-4'>
                            <div className="">
                                <img
                                    src={data.User?.image as string}
                                    alt="user-image"
                                    className='size-10 rounded-full'
                                />
                                <p className="text-sm font-medium mt-1 text-muted-foreground">
                                    {data.User?.name}
                                </p>
                                <h1 className='text-xl font-semibold mt-2'>{data.title}</h1>
                                <p className="text-sm font-medium text-muted-foreground">{data.description}</p>
                                <div className="mt-5 flex flex-col gap-y-3">
                                    <p className="flex items-center">
                                        <CalendarX2 className='size-4 mr-3 text-primary' />
                                        <span className='text-sm font-medium text-muted-foreground'>{formatedDate}</span>
                                    </p>
                                    <p className="flex items-center">
                                        <Clock className='size-4 mr-3 text-primary' />
                                        <span className='text-sm font-medium text-muted-foreground'>{data.duration} Minutes</span>
                                    </p>
                                    <p className="flex items-center">
                                        <VideoIcon className='size-4 mr-3 text-primary' />
                                        <span className='text-sm font-medium text-muted-foreground'>{data.videoCallsSoftware}</span>
                                    </p>
                                </div>
                            </div>
                            <Separator
                                orientation='vertical'
                                className='h-full w-[1px]'
                            />
                            
                        </CardContent>
                    </Card>
                ) : (
                    <Card className='max-w-[1000px] w-full mx-auto'>
                        <CardContent className='p-5 md:grid md:grid-cols-[1fr,auto,1fr,auto,1fr] md:gap-4'>
                            <div className="">
                                <img
                                    src={data.User?.image as string}
                                    alt="user-image"
                                    className='size-10 rounded-full'
                                />
                                <p className="text-sm font-medium mt-1 text-muted-foreground">
                                    {data.User?.name}
                                </p>
                                <h1 className='text-xl font-semibold mt-2'>{data.title}</h1>
                                <p className="text-sm font-medium text-muted-foreground">{data.description}</p>
                                <div className="mt-5 flex flex-col gap-y-3">
                                    <p className="flex items-center">
                                        <CalendarX2 className='size-4 mr-3 text-primary' />
                                        <span className='text-sm font-medium text-muted-foreground'>{formatedDate}</span>
                                    </p>
                                    <p className="flex items-center">
                                        <Clock className='size-4 mr-3 text-primary' />
                                        <span className='text-sm font-medium text-muted-foreground'>{data.duration} Minutes</span>
                                    </p>
                                    <p className="flex items-center">
                                        <VideoIcon className='size-4 mr-3 text-primary' />
                                        <span className='text-sm font-medium text-muted-foreground'>{data.videoCallsSoftware}</span>
                                    </p>
                                </div>
                            </div>
                            <Separator
                                orientation='vertical'
                                className='h-full w-[1px]'
                            />
                            <RenderCalendar
                                availability={data.User?.availability as any}
                            />
                            <Separator
                                className='h-full w-[1px]'
                                orientation='vertical'
                            />
                            <TimeTable
                                selectedDate={selectedDate}
                                userName={params.username}
                                duration={data.duration}
                            />
                        </CardContent >
                    </Card >
                )
            }

        </section >
    )
}

export default BookingForm
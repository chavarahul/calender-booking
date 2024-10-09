import React from 'react'
import { Card, Input, Label, Separator } from '@/app/components/ui'
import { CardContent } from '@/app/components/ui/card'
import { getUserBookingData } from '@/app/lib/function'
import { CalendarX2, Clock, VideoIcon } from 'lucide-react'
import { RenderCalendar } from '@/app/components/dashboard-components/bookingform-components'
import TimeTable from '@/app/components/dashboard-components/TimeTable'
import SubmitButton from '@/app/components/auth/SubmitButton'
import { createMeeting } from '@/app/actions'

const BookingForm = async ({ params, searchParams }: {
    params: { username: string; eventUrl: string };
    searchParams: { date?: string, time?: string }
}) => {

    const data = await getUserBookingData(params.eventUrl, params.username);
    const selectedDate = searchParams.date
        ? new Date(searchParams.date)
        : new Date();
    const formatedDate = new Intl.DateTimeFormat("en-Us", {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
    }).format(selectedDate);

    const showForm = !!searchParams.date && !!searchParams.time;

    return (
        <section className="min-h-screen w-screen flex items-center justify-center">
            {
                showForm ? (
                    <Card className='max-w-[600px]'>
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
                            <form
                                action={createMeeting}
                                className='flex flex-col gap-y-4'
                                noValidate
                            >
                                <input
                                    type="hidden"
                                    name="fromTime"
                                    value={searchParams.time}
                                />
                                <input
                                    type="hidden"
                                    name="eventDate"
                                    value={searchParams.date}
                                />
                                <input
                                    type="hidden"
                                    name="meetingLength"
                                    value={data.duration}
                                />
                                <input
                                    type="hidden"
                                    name="provider"
                                    value={data.videoCallsSoftware}
                                />
                                <input
                                    type="hidden"
                                    name="username"
                                    value={params.username}
                                />
                                <input
                                    type="hidden"
                                    name="eventTypeId"
                                    value={data.id}
                                />
                                <div className="flex flex-col gap-y-2">
                                    <Label>Your Name</Label>
                                    <Input
                                        placeholder='Your Name'
                                        name='name'
                                    />
                                </div>
                                <div className="flex flex-col gap-y-2">
                                    <Label>Your Email</Label>
                                    <Input
                                        name='email'
                                        placeholder='example@gmail.com'
                                    />
                                </div>
                                <div className="mt-5">
                                <SubmitButton  text='Book Meeting' variant={"default"} />
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                ) : (
                    <Card className='max-w-[1000px] w-full mx-auto'>
                        <CardContent className='p-5 md:grid md:grid-cols-[1fr,auto,1fr,auto,1fr] md:gap-4'>
                            <div>
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
                                availability={data.User?.availability as { day: string; isActive: boolean; }[]}
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
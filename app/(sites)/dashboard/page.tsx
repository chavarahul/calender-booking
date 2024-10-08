import CopyLink from '@/app/components/dashboard-components/CopyLink';
import EmptyState from '@/app/components/dashboard-components/EmptyState';
import { Button, DropdownMenu, Switch } from '@/app/components/ui';
import { DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/app/components/ui/dropdown-menu';
import { getEventData } from '@/app/lib/function';
import { requireUser } from '@/app/lib/hooks'
import { ExternalLink, Pen, Settings, Trash, Users2 } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

const Dashboard = async () => {
    const session = await requireUser();
    const data = await getEventData(session.user?.id as string);
    return (
        <>
            {
                data.eventType.length === 0 ? (
                    <EmptyState
                        title='You have no Event Types'
                        description='You can create your first event type by clicking the button below'
                        buttontext='Add event type'
                        href='/dashboard/new'
                    />
                ) : (
                    <>
                        <section className="flex items-center justify-between px-2">
                            <div className="">
                                <h1 className="text-3xl font-semibold">Event Types</h1>
                                <p className='text-muted-foreground mt-1'>Create and manage your event types right here</p>
                            </div>
                            <Button asChild>
                                <Link href={"/dashboard/new"}>
                                    Create New Event
                                </Link>
                            </Button>
                        </section>
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                            {
                                data.eventType.map((item) => (
                                    <div className="overflow-hidden shadow rounded-lg border relative" key={item.id}>
                                        <div className="absolute top-2 right-2">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant={"secondary"} size={"icon"}>
                                                        <Settings className='size-5' />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align='end'>
                                                    <DropdownMenuLabel>Event</DropdownMenuLabel>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuGroup>
                                                        <DropdownMenuItem asChild>
                                                            <Link href={`/${data.userName}/${item.url}`}>
                                                                <ExternalLink className='mr-2 size-4' />
                                                                Preview
                                                            </Link>
                                                        </DropdownMenuItem>
                                                        <CopyLink meetingUrl={`${process.env.NEXT_PUBLIC_URL}/${data.userName}/${item.url}`} />
                                                        <DropdownMenuItem asChild>
                                                            <Link href={`/dashboard/event/${item.id}`}>
                                                                <Pen className='mr-2 size-4' />
                                                                Edit
                                                            </Link>
                                                        </DropdownMenuItem>
                                                    </DropdownMenuGroup>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem>
                                                        <Link href={`/dashboard/event/${item.id}/delete`} className='flex'>
                                                            <Trash className='mr-2 size-4' />
                                                            Delete
                                                        </Link>
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                        <Link href={`/dashboard/event/${item.id}`} className='flex items-center p-5'>
                                            <div className="flex-shrink-0">
                                                <Users2 className='size-5' />
                                            </div>
                                            <div className="ml-5 w-0 flex-1">
                                                <dl>
                                                    <dt className='text-sm font-medium text-muted-foreground'>
                                                        {item.duration} Minutes Meeting
                                                    </dt>
                                                    <dd className='text-lg font-medium'>
                                                        {item.title}
                                                    </dd>
                                                </dl>
                                            </div>
                                        </Link>
                                        <div className="bg-muted px-5 py-3 flex justify-between items-center">
                                            <Switch />
                                            <Link href={`/dashboard/event/${item.id}`}>
                                                <Button>
                                                    Edit Event
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </>
                )}
        </>
    )
}

export default Dashboard
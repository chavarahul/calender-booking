import EmptyState from '@/app/components/dashboard-components/EmptyState';
import { Button, DropdownMenu, Switch } from '@/app/components/ui';
import { DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/app/components/ui/dropdown-menu';
import { getEventData } from '@/app/lib/function';
import { requireUser } from '@/app/lib/hooks'
import { ExternalLink, Link2, Pen, Settings, Trash, Users2 } from 'lucide-react';
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
                        href='/Dashboard/new'
                    />
                ) : (
                    <>
                        <section className="flex items-center justify-between px-2">
                            <div className="">
                                <h1 className="text-3xl font-semibold">Event Types</h1>
                                <p className='text-muted-foreground mt-1'>Create and manage your event types right here</p>
                            </div>
                            <Button asChild>
                                <Link href={"/Dashboard/new"}>
                                    Create New Event
                                </Link>
                            </Button>
                        </section>
                        <div className="grid gap-5 sm:grid-cols-3 lg:grid-cols-3">
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
                                                        <DropdownMenuItem>
                                                            <Link2 className='mr-2 size-4' />
                                                            Copy
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem>
                                                            <Pen className='mr-2 size-4' />
                                                            Edit
                                                        </DropdownMenuItem>
                                                    </DropdownMenuGroup>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem>
                                                        <Trash className='mr-2 size-4' />
                                                        Delete
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                        <Link href={"/"} className='flex items-center p-5'>
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
                                            <Button>
                                                Edit Event
                                            </Button>
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
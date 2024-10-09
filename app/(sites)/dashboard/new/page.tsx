'use client'
import { createEvent } from '@/app/actions';
import SubmitButton from '@/app/components/auth/SubmitButton';
import { Button, ButtonGroup, Card, Input, Label, Select, Textarea } from '@/app/components/ui'
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/app/components/ui/card'
import { SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/app/components/ui/select'
import { eventTypeSchema } from '@/lib/zodSchema';
import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import Link from 'next/link';
import React, { useState } from 'react';
import { useFormState } from 'react-dom';

type VideoCallProvider = "Zoom Meeting" | "Google Meet" | "Microsoft Teams";

const NewEvent = () => {
    const [activePlatform, setActivePlatform] = useState<VideoCallProvider>("Google Meet");
    const [lastResult, action] = useFormState(createEvent, undefined);
    const [form, fields] = useForm({
        lastResult,
        onValidate({ formData }) {
            return parseWithZod(formData, {
                schema: eventTypeSchema
            })
        },
        shouldRevalidate: 'onInput',
        shouldValidate: 'onBlur'
    })
    return (
        <section
            className="flex w-full h-full flex-1 items-center justify-center"
        >
            <Card>
                <CardHeader>
                    <CardTitle>Add new appointment type</CardTitle>
                    <CardDescription>Create new appoinment type that allows people to book you!</CardDescription>
                </CardHeader>
                <form id={form.id} onSubmit={form.onSubmit} action={action} noValidate>
                    <CardContent>
                        <div className="flex flex-col gap-y-2">
                            <Label>Title</Label>
                            <Input
                                placeholder='30 Minute meeting'
                                name={fields.title.name}
                                defaultValue={fields.title.initialValue}
                                key={fields.title.key}
                            />
                            <p className='text-red-500 text-sm'>{fields.title.errors}</p>
                        </div>
                        <div className="flex flex-col mt-4 gap-y-2">
                            <Label>URL Slug</Label>
                            <div className="flex rounded-md">
                                <span className='inline-flex mt-1 items-center px-3 rounded-l-md border border-r-0 border-muted bg-muted text-sm text-muted-foreground'>
                                    CalenNexus.com/
                                </span>
                                <Input
                                    placeholder='example-user-1'
                                    className='rounded-l-none mt-1 focus:border-none'
                                    name={fields.url.name}
                                    defaultValue={fields.url.initialValue}
                                    key={fields.url.key}
                                />
                            </div>
                            <p className='text-red-500 text-sm'>{fields.url.errors}</p>
                        </div>
                        <div className="flex mt-4 flex-col gap-y-2">
                            <Label>Description</Label>
                            <Textarea
                                placeholder='Meet me in this meeting to meet me!'
                                name={fields.description.name}
                                defaultValue={fields.description.initialValue}
                                key={fields.description.key}
                            />
                            <p className='text-red-500 text-sm'>{fields.description.errors}</p>
                        </div>
                        <div className="flex mt-4 flex-col gap-y-2">
                            <Label>Duration</Label>
                            <Select
                                name={fields.duration.name}
                                defaultValue={fields.duration.initialValue}
                                key={fields.duration.key}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select duration" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Duration</SelectLabel>
                                        <SelectItem value={"15"}>15 Mins</SelectItem>
                                        <SelectItem value={"30"}>30 Mins</SelectItem>
                                        <SelectItem value={"45"}>45 Mins</SelectItem>
                                        <SelectItem value={"60"}>1 Hour</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            <p className='text-red-500 text-sm'>{fields.duration.errors}</p>
                        </div>
                        <div className="flex mt-4 flex-col gap-y-2">
                            <Label>Video Call Provider</Label>
                            <input
                                type="hidden"
                                name={fields.videoCallSoftware.name}
                                value={activePlatform}
                            />
                            <ButtonGroup>
                                <Button
                                    type='button'
                                    onClick={() => setActivePlatform("Zoom Meeting")}
                                    className='w-full mr-3 mt-2 ml-0'
                                    variant={activePlatform === "Zoom Meeting" ? "secondary" : "outline"}
                                >Zoom
                                </Button>
                                <Button
                                    type='button'
                                    onClick={() => setActivePlatform("Google Meet")}
                                    className='w-full mr-3 mt-2 ml-0'
                                    variant={activePlatform === "Google Meet" ? "secondary" : "outline"}
                                >
                                    Google Meet
                                </Button>
                                <Button
                                    type='button'
                                    onClick={() => setActivePlatform("Microsoft Teams")}
                                    className='w-full mr-3 mt-2 ml-0'
                                    variant={activePlatform === "Microsoft Teams" ? "secondary" : "outline"}
                                >
                                    Microsoft Teams
                                </Button>
                            </ButtonGroup>
                        </div>
                    </CardContent>
                    <CardFooter className='w-full flex justify-between'>
                        <Button variant={"secondary"} asChild>
                            <Link href={"/Dashboard"}>
                                Cancel
                            </Link>
                        </Button>
                        <div className="w-fit">
                            <SubmitButton text='Create Event Type' variant={"default"} />
                        </div>
                    </CardFooter>
                </form>
            </Card>
        </section>
    )
}

export default NewEvent
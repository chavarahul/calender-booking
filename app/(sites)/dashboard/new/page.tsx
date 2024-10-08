import { Card, Input, Label } from '@/app/components/ui'
import { CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card'
import React from 'react'

const NewEvent = () => {
    return (
        <section
            className="flex w-full h-full flex-1 items-center justify-center"
        >
            <Card>
                <CardHeader>
                    <CardTitle>Add new appointment type</CardTitle>
                    <CardDescription>Create new appoinment type that allows people to book you!</CardDescription>
                </CardHeader>
                <form action="">
                    <CardContent>
                        <div className="flex flex-col gap-y-2">
                            <Label>Title</Label>
                            <Input
                                placeholder='30 Minute meeting'
                                className=''
                            />
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
                                />
                            </div>
                        </div>
                        <div className="flex mt-4 flex-col gap-y-2">
                            <Label>Description</Label>
                            <Input
                                placeholder='30 Minute meeting'
                                className=''
                            />
                        </div>
                    </CardContent>
                </form>
            </Card>
        </section>
    )
}

export default NewEvent
import { Button, Card, Input, Label } from '@/app/components/ui'
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/app/components/ui/card'
import React from 'react'

const onBoarding = () => {
    return (
        <section className='min-h-screen w-screen relative flex items-center justify-center'>
            <Card>
                <CardHeader>
                    <CardTitle>Welcome to Calen <span className="text-primary">Nexus</span></CardTitle>
                    <CardDescription>We need the following information to set up your profile!</CardDescription>
                </CardHeader>
                <form action="">
                    <CardContent className='flex flex-col gap-y-5'>
                        <div className="grid gap-y-2">
                            <Label>Full Name</Label>
                            <Input placeholder='Rahul' className='mt-2' />
                        </div>
                        <div className="grid gap-y-2">
                            <Label>Username</Label>
                            <div className="flex rounded-md">
                                <span className='inline-flex mt-2 items-center px-3 rounded-l-md border border-r-0 border-muted bg-muted text-sm text-muted-foreground'>
                                    CalenNexus.com
                                </span>
                                <Input placeholder='example-user-1' className='rounded-l-none mt-2 focus:border-none' />
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button className='w-full'>Submit</Button>
                    </CardFooter>
                </form>
            </Card>
        </section>
    )
}

export default onBoarding
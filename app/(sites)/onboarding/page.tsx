'use client';
import { onBoardingAction } from '@/app/actions'
import { Card, Input, Label } from '@/app/components/ui'
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/app/components/ui/card'
import React from 'react'
import { useForm } from '@conform-to/react'
import { useFormState } from 'react-dom'
import { parseWithZod } from '@conform-to/zod'
import { onBoardingSchema } from '@/lib/zodSchema'
import SubmitButton from '@/app/components/auth/SubmitButton';

const OnBoarding = () => {
    const [lastResult, action] = useFormState(onBoardingAction, undefined);
    const [form, fields] = useForm({
        lastResult,
        onValidate({ formData }) {
            return parseWithZod(formData, { schema: onBoardingSchema })
        },
        shouldValidate: 'onBlur',
        shouldRevalidate: 'onInput'
    });
    return (
        <section className='min-h-screen w-screen relative flex items-center justify-center'>
            <Card>
                <CardHeader>
                    <CardTitle>Welcome to Calen <span className="text-primary">Nexus</span></CardTitle>
                    <CardDescription>We need the following information to set up your profile!</CardDescription>
                </CardHeader>
                <form id={form.id} onSubmit={form.onSubmit} action={action} noValidate>
                    <CardContent className='flex flex-col gap-y-5'>
                        <div className="grid gap-y-2">
                            <Label>Full Name</Label>
                            <Input
                                placeholder='Rahul'
                                name={fields.fullName.name}
                                className='mt-2'
                                defaultValue={fields.fullName.initialValue}
                                key={fields.fullName.key}
                            />
                            <p className='text-red-500 text-sm'>{fields.fullName.errors}</p>
                        </div>
                        <div className="grid gap-y-2">
                            <Label>Username</Label>
                            <div className="flex rounded-md">
                                <span className='inline-flex mt-2 items-center px-3 rounded-l-md border border-r-0 border-muted bg-muted text-sm text-muted-foreground'>
                                    CalenNexus.com/
                                </span>
                                <Input
                                    placeholder='example-user-1'
                                    className='rounded-l-none mt-2 focus:border-none'
                                    name={fields.userName.name}
                                    defaultValue={fields.userName.initialValue}
                                    key={fields.userName.key}
                                />
                            </div>
                            <p className='text-red-500 text-sm'>{fields.userName.errors}</p>
                        </div>
                    </CardContent>
                    <CardFooter>
                    <SubmitButton variant={"default"} text='Submit' />
                    </CardFooter>
                </form>
            </Card>
        </section>
    )
}

export default OnBoarding
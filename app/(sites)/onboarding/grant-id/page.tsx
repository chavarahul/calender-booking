import { Button, Card } from '@/app/components/ui'
import { CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card'
import React from 'react'
import videoGif from '@/public/work-is-almost-over-happy.gif'
import Image from 'next/image'
import Link from 'next/link'
import { CalendarCheck2 } from 'lucide-react'

const onboardingAuth = () => {
    return (
        <section className='min-h-screen w-full relative flex items-center justify-center'>
            <Card>
                <CardHeader>
                    <CardTitle>You are almost Done!</CardTitle>
                    <CardDescription>We have to now connect your calender to your account</CardDescription>
                    <Image
                        src={videoGif}
                        alt='almost-finised-gif'
                        className='w-full rounded-lg my-3'
                    />
                </CardHeader>
                <CardContent>
                    <Button asChild className='w-full'>
                        <Link href={"/api/auth"}>
                            <CalendarCheck2  className='size-4 mr-2'/>
                            Connect Calender to your Account
                        </Link>
                    </Button>
                </CardContent>
            </Card>
        </section>
    )
}

export default onboardingAuth
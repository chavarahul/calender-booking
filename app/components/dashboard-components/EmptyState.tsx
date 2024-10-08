import { Ban, PlusCircle } from 'lucide-react'
import React from 'react'
import { Button } from '../ui';
import Link from 'next/link';

interface iAppProps {
    title: string;
    description: string;
    buttontext: string;
    href: string;
}

const EmptyState: React.FC<iAppProps> = ({
    title,
    description,
    buttontext,
    href
}) => {
    return (
        <section
            className='flex flex-col flex-1 h-full items-center justify-center rounded-md border border-dotted p-8 text-center animate-in fade-in-50'
        >
            <div className="flex items-center justify-center size-20 rounded-full bg-primary/10">
                <Ban className='size-10 text-primary' />
            </div>
            <h2 className="mt-6 text-xl font-semibold">{title}</h2>
            <p className='mb-8 mt-2 text-sm max-w-sm mx-auto text-muted-foreground'>{description}</p>
            <Button asChild>
                <Link href={href}>
                    <PlusCircle className='mr-2 size-4' />
                    {buttontext}
                </Link>
            </Button>
        </section>
    )
}

export default EmptyState
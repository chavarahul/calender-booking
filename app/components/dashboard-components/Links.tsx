'use client'
import React from 'react'
import { CalendarCheck, HomeIcon, LucideProps, Settings, Users2 } from "lucide-react";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

interface LinksProps {
    id: number;
    name: string;
    href: string;
    icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
}

export const dashboardLinks: LinksProps[] = [
    {
        id: 0,
        name: "Event Types",
        href: "/Dashboard",
        icon: HomeIcon,
    },
    {
        id: 1,
        name: "Meetings",
        href: "/Dashboard/meetings",
        icon: Users2,
    },
    {
        id: 2,
        name: "Availablity",
        href: "/Dashboard/availability",
        icon: CalendarCheck,
    },
    {
        id: 3,
        name: "Settings",
        href: "/Dashboard/settings",
        icon: Settings,
    },
];

const Links = () => {
    const path = usePathname();

    return (
        <>
            {
                dashboardLinks?.map((link) => (
                    <Link
                        className={cn(path === link.href ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:text-foreground',"flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary")}
                        href={link.href}
                        key={link.id}
                    >
                        <link.icon className='size-4' />
                        {link.name}
                    </Link>
                ))
            }
        </>
    )
}

export default Links
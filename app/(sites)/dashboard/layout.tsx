import Image from 'next/image'
import Link from 'next/link'
import Logo from '@/public/logo.png'
import React, { ReactNode } from 'react'
import Links from '@/app/components/dashboard-components/Links'

interface ReactChildren {
    children: ReactNode
}

const Layout: React.FC<ReactChildren> = ({ children }) => {
    return (
        <div className='min-h-screen w-full relative grid md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]'>
            <div className="hidden md:block border-r bg-muted/40">
                <div className="flex h-full max-h-screen flex-col gap-2">
                    <div className="flex h-14 w-full items-center border-b px-4 lg:h-[60px] lg:px-6">
                        <Link href="/" className='flex items-center gap-2'>
                        <Image src={Logo} alt='Logo' className='size-7' />
                        <p className='text-xl font-bold'>Calen<span className='text-primary'>Nexus</span></p>
                        </Link>
                    </div>
                    <div className="flex-1">
                        <nav className="grid items-start px-2 lg:px-4">
                            <Links/>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Layout
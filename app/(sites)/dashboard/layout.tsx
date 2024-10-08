import Image from 'next/image'
import Link from 'next/link'
import Logo from '@/public/logo.png'
import React, { ReactNode } from 'react'
import Links from '@/app/components/dashboard-components/Links'
import { SheetContent, SheetTrigger } from '@/app/components/ui/sheet'
import { Button, DropdownMenu, Sheet, ThemeToggle } from '@/app/components/ui'
import { Menu } from 'lucide-react'
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/app/components/ui/dropdown-menu'
import { signOut } from '@/app/lib/auth'
import { requireUser } from '@/app/lib/hooks'
import prisma from '@/app/lib/db'
import { redirect } from 'next/navigation'

interface ReactChildren {
    children: ReactNode
}

const getData = async (userId: string) => {
    const data = await prisma.user.findUnique({
        where: {
            id: userId
        },
        select:{
            userName:true,
            grantId:true
        },
    });
    if(!data?.userName){
        return redirect('/onboarding')
    }
    if(!data?.grantId){
        return redirect("/onboarding/grant-id")
    }
}

const Layout: React.FC<ReactChildren> = async ({ children }) => {
    const session = await requireUser();
    const data = await getData(session.user?.id as string);
    console.log(data)
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
                        <nav className="grid items-start gap-3 px-2 mt-5 lg:px-4">
                            <Links />
                        </nav>
                    </div>
                </div>
            </div>
            <div className=" flex flex-col">
                <header className='flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6'>
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button className='md:hidden shrink-0' size={"icon"} variant={"outline"}>
                                <Menu className='size-5' />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side={"left"} className='flex flex-col'>
                            <div className="flex h-14 -ml-2 w-full items-center border-b px-4 lg:h-[60px] lg:px-6">
                                <Link href="/" className='flex items-center gap-2'>
                                    <Image src={Logo} alt='Logo' className='size-7' />
                                    <p className='text-xl font-bold'>Calen<span className='text-primary'>Nexus</span></p>
                                </Link>
                            </div>
                            <nav className="grid gap-3">
                                <Links />
                            </nav>
                        </SheetContent>
                    </Sheet>
                    <div className="ml-auto flex items-center gap-x-4">
                        <ThemeToggle />
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant={"secondary"} size={"icon"} className='rounded-full size-[2.2rem]'>
                                    <img src={session?.user?.image as string} alt='profile-image' width={15} height={15} className='w-full h-full rounded-full' />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align='end'>
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild><Link href={"/Dashboard/settings"}>Settings</Link></DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <form action={async () => {
                                        "use server";
                                        await signOut();
                                    }} className='w-full'>
                                        <button className='w-full text-left'>Log out</button>
                                    </form>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </header>
                <main className='flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6'>
                    {children}
                </main>
            </div>
        </div>
    )
}

export default Layout
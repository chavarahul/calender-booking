import Image from 'next/image'
import Link from 'next/link'
import Logo from '@/public/logo.png'
import AuthModal from '../auth/AuthModal'
import { ThemeToggle } from '../ui'

const Navbar = () => {
    return (
        <header className=' flex py-5 items-center justify-between'>
            <Link href={"/"} className='flex items-center gap-2'>
                <Image src={Logo} alt='Logo' className='size-8' />
                <h4 className='text-2xl font-semibold'>Calen<span className='text-blue-500'>Nexus</span></h4>
            </Link>
            <div className="md:hidden">
                <ThemeToggle />
            </div>
            <nav className="hidden md:flex md:justify-end md:space-x-4">
                <ThemeToggle />
                <AuthModal />
            </nav>
        </header>
    )
}

export default Navbar
import React from 'react'
import { Button, Dialog } from '../ui'
import { DialogContent ,DialogHeader,DialogTrigger } from '../ui/dialog'
import Image from 'next/image'
import Logo from '@/public/logo.png'

const AuthModal = () => {
  return (
    <Dialog>
        <DialogTrigger asChild>
            <Button>Try for Free</Button>
        </DialogTrigger>
        <DialogContent className='sm:max-w-[360px]'>
            <DialogHeader className='flex flex-row gap-2 justify-center items-center'>
                 <Image src={Logo} alt='Logo' className='size-8' />
                 <h4 className='text-2xl font-semibold'>
                    Calen<span className='text-blue-500'>Nexus</span>
                 </h4>
            </DialogHeader>
        </DialogContent>
    </Dialog>
  )
}

export default AuthModal
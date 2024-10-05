import { auth } from '@/app/lib/auth'
import { redirect } from 'next/navigation';
import React from 'react'

const Dashboard = async () => {
    const session = await auth();
    if(!session?.user){
        return redirect("/")
    }
    return (
        <div>Dashboard</div>
    )
}

export default Dashboard
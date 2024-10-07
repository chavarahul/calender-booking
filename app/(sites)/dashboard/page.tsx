
import Btn from '@/app/components/auth/Btn';
import { requireUser } from '@/app/lib/hooks'
import React from 'react'

const Dashboard = async () => {
    const session = await requireUser();
    console.log(session)
    return (
        <div>Dashboard
            <Btn/>
        </div>
    )
}

export default Dashboard
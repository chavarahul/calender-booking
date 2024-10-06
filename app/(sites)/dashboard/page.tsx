
import { requireUser } from '@/app/lib/hooks'
import React from 'react'

const Dashboard = async () => {
    const session = await requireUser();
    console.log(session)
    return (
        <div>Dashboard</div>
    )
}

export default Dashboard
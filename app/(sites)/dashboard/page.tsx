import EmptyState from '@/app/components/dashboard-components/EmptyState';
import { getEventData } from '@/app/lib/function';
import { requireUser } from '@/app/lib/hooks'
import React from 'react'

const Dashboard = async () => {
    const session = await requireUser();
    const data = await getEventData(session.user?.id as string);
    return (
        <>
            {
                data.eventType.length === 0 ? (
                    <EmptyState
                        title='You have no Event Types'
                        description='You can create your first event type by clicking the button below'
                        buttontext='Add event type'
                        href='/Dashboard/new'
                    />
                ) : (
                    <div className=""></div >
                )}
        </>
    )
}

export default Dashboard
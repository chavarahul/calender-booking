import SettingsForm from '@/app/components/dashboard-components/Settings-Form'
import { getProfileData } from '@/app/lib/function'
import { requireUser } from '@/app/lib/hooks'
import React from 'react'

const Settings = async () => {
    const session = await requireUser();
    const data = await getProfileData(session.user?.id as string)
    return (
        <div>
            <SettingsForm
                email={data.email}
                fullName={data.name as string}
                profileImage={data.image as string}
            />
        </div>
    )
}

export default Settings
import EditEventTypeForm from '@/app/components/dashboard-components/EditEventTypeForm';
import { getEditEventData } from '@/app/lib/function'
import React from 'react'

const Event = async ({ params }: {
  params: { eventTypeId: string }
}) => {
  const data = await getEditEventData(params.eventTypeId);
  return (
    <EditEventTypeForm
      description={data.description as string}
      duration={data.duration}
      title={data.title}
      url={data.url}
      key={data.id}
      id={data.id}
      callProvider={data.videoCallsSoftware}
    />
  )
}

export default Event
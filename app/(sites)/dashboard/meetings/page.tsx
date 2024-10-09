import { cancelMeeting } from '@/app/actions';
import SubmitButton from '@/app/components/auth/SubmitButton';
import EmptyState from '@/app/components/dashboard-components/EmptyState';
import { Card, Separator } from '@/app/components/ui';
import { CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { getMeetings } from '@/app/lib/function'
import { requireUser } from '@/app/lib/hooks';
import { format, fromUnixTime } from 'date-fns';
import { Video } from 'lucide-react';
import React from 'react'

interface When {
  startTime: number; // assuming it's a Unix timestamp
  endTime: number;   // assuming it's a Unix timestamp
}

interface Conferencing {
  details: {
    url: string;
  };
}

interface Meeting {
  id: string;
  title: string;
  when: When;
  participants: { name: string }[];
  conferencing: Conferencing;
}

const Meetings = async () => {
  const session = await requireUser();
  const data = await getMeetings(session?.user?.id as string) as { data: Meeting[] };

  return (
    <div>
      {data.data.length < 1 ? (
        <EmptyState
          title="No meetings found"
          description="You don't have any meetings yet"
          buttontext="Create a new event type"
          href="/dashboard/new"
        />
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Bookings</CardTitle>
            <CardDescription>
              See upcoming events which were booked with you and see the event type link
            </CardDescription>
          </CardHeader>
          <CardContent>
            {data.data.map((item) => (
              <form action={cancelMeeting} key={item.id}>
                <input type="hidden" name="eventId" value={item.id} />
                <div className="grid grid-cols-3 justify-between items-center">
                  <div>
                    <p className="text-muted-foreground text-sm">
                      {format(fromUnixTime(item.when.startTime), "EEE, dd MMM")}
                    </p>
                    <p className="text-muted-foreground text-xs pt-1">
                      {format(fromUnixTime(item.when.startTime), "hh:mm a")} -{" "}
                      {format(fromUnixTime(item.when.endTime), "hh:mm a")}
                    </p>
                    <div className="flex items-center mt-1">
                      <Video className="size-4 mr-2 text-primary" />
                      <a
                        href={item.conferencing.details.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-primary underline underline-offset-4"
                      >
                        Join Meeting
                      </a>
                    </div>
                  </div>
                  <div className="flex flex-col items-start">
                    <h2 className="text-sm font-medium">{item.title}</h2>
                    <p className="text-sm text-muted-foreground">
                      You and {item.participants[0]?.name}
                    </p>
                  </div>
                  <div className="w-fit flex ml-auto">
                    <SubmitButton text="Cancel Event" variant={"destructive"} />
                  </div>
                </div>
                <Separator className="my-3" />
              </form>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Meetings;

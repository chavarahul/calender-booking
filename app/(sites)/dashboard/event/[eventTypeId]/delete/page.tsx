import { DeleteEventTypeAction } from "@/app/actions";
import { Button } from "@/app/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import Link from "next/link";
import React from "react";

const DeleteEventType = ({ params }: { params: { eventTypeId: string } }) => {
  return (
    <div className="flex-1 flex items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>Delete Event Type</CardTitle>
          <CardDescription>
            Are you sure you want to delete this event type?
          </CardDescription>
        </CardHeader>
        <CardFooter className="w-full flex justify-between">
          <Button asChild variant="secondary">
            <Link href="/Dashboard">Cancel</Link>
          </Button>
          <form action={DeleteEventTypeAction}>
            <input type="hidden" name="id" value={params.eventTypeId} />
            <Button variant="destructive">Delete</Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
};

export default DeleteEventType;

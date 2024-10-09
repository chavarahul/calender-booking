"use client";

import { Button } from "@/app/components/ui/button";
import { ButtonGroup } from "../ui";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Textarea } from "@/app/components/ui/textarea";
import Link from "next/link";
import  SubmitButton  from "../../components/auth/SubmitButton";
import { useFormState } from "react-dom";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { eventTypeSchema } from "../../../lib/zodSchema";
import { EditEventTypeAction } from "@/app/actions";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";

import { useState } from "react";

interface iAppProps {
  id: string;
  title: string;
  url: string;
  description: string;
  duration: number;
  callProvider: string;
}

type Platform = "Zoom Meeting" | "Google Meet" | "Microsoft Teams";

const EditEventTypeForm:React.FC<iAppProps> = ({
    description,
    duration,
    title,
    url,
    callProvider,
    id,
}) => {
    const [lastResult, action] = useFormState(EditEventTypeAction, undefined);
    const [form, fields] = useForm({
      lastResult,
  
      onValidate({ formData }) {
        return parseWithZod(formData, { schema: eventTypeSchema });
      },
        shouldValidate: "onBlur",
      shouldRevalidate: "onInput",
    });
    const [activePlatform, setActivePlatform] = useState<Platform>(
      callProvider as Platform
    );
  
    const togglePlatform = (platform: Platform) => {
      setActivePlatform(platform);
    }

  return (
    <div className="h-full w-full flex-1 flex flex-col items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>Edit appointment type</CardTitle>
          <CardDescription>
          Modify the appointment type to enable people to book time slots.          </CardDescription>
        </CardHeader>
        <form noValidate id={form.id} onSubmit={form.onSubmit} action={action}>
          <input type="hidden" name="id" value={id} />
          <CardContent className="grid gap-y-5">
            <div className="flex flex-col gap-y-2">
              <Label>Title</Label>
              <Input
                name={fields.title.name}
                key={fields.title.key}
                defaultValue={title}
                placeholder="30 min meeting"
              />
              <p className="text-red-500 text-sm">{fields.title.errors}</p>
            </div>

            <div className="grid gap-y-2 ">
              <Label>Url</Label>
              <div className="flex rounded-md">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-muted bg-muted text-muted-foreground text-sm">
                  CalenNexus.com/
                </span>
                <Input
                  type="text"
                  key={fields.url.key}
                  defaultValue={url}
                  name={fields.url.name}
                  placeholder="example-user-1"
                  className="rounded-l-none"
                />
              </div>

              <p className="text-red-500 text-sm">{fields.url.errors}</p>
            </div>

            <div className="grid gap-y-2">
              <Label>Description</Label>
              <Textarea
                name={fields.description.name}
                key={fields.description.key}
                defaultValue={description}
                placeholder="30 min meeting"
              />
              <p className="text-red-500 text-sm">
                {fields.description.errors}
              </p>
            </div>

            <div className="grid gap-y-2">
              <Label>Duration</Label>
              <Select
                name={fields.duration.name}
                key={fields.duration.key}
                defaultValue={String(duration)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select the duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Duration</SelectLabel>
                    <SelectItem value="15">15 Mins</SelectItem>
                    <SelectItem value="30">30 Min</SelectItem>
                    <SelectItem value="45">45 Mins</SelectItem>
                    <SelectItem value="60">1 Hour</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>

              <p className="text-red-500 text-sm">{fields.duration.errors}</p>
            </div>

            <div className="grid gap-y-2">
              <input
                type="hidden"
                name={fields.videoCallSoftware.name}
                value={activePlatform}
              />
              <Label>Video Call Provider</Label>
              <ButtonGroup className="w-full">
                <Button
                  onClick={() => togglePlatform("Zoom Meeting")}
                  type="button"
                  className="w-full"
                  variant={
                    activePlatform === "Zoom Meeting" ? "secondary" : "outline"
                  }
                >
                  Zoom
                </Button>
                <Button
                  onClick={() => togglePlatform("Google Meet")}
                  type="button"
                  className="w-full"
                  variant={
                    activePlatform === "Google Meet" ? "secondary" : "outline"
                  }
                >
                  Google Meet
                </Button>
                <Button
                  variant={
                    activePlatform === "Microsoft Teams"
                      ? "secondary"
                      : "outline"
                  }
                  type="button"
                  className="w-full"
                  onClick={() => togglePlatform("Microsoft Teams")}
                >
                  Microsoft Teams
                </Button>
              </ButtonGroup>
            </div>
          </CardContent>
          <CardFooter className="w-full flex justify-between">
            <Button asChild variant="secondary">
              <Link href="/dashboard">Cancel</Link>
            </Button>
            <div className="w-fit">
            <SubmitButton text="Edit Event Type" variant={"default"} />
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

export default EditEventTypeForm
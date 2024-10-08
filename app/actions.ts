"use server";

import { onboardingSchemaValidation, settingsSchema } from "@/lib/zodSchema";
import prisma from "./lib/db";
import { requireUser } from "./lib/hooks";
import { parseWithZod } from '@conform-to/zod'
import { redirect } from "next/navigation";
export const onBoardingAction = async (prevState, formData: FormData) => {
    const session = await requireUser();

    const submission = await parseWithZod(formData, {
        schema: onboardingSchemaValidation({
            async isUsernameUnique() {
                const existingUsername = await prisma.user.findUnique({
                    where: {
                        userName: formData.get('userName') as string
                    }
                })
                return !existingUsername
            }
        }),
        async: true,
    });

    if (submission.status !== 'success') {
        return submission.reply();
    }

    const data = await prisma.user.update({
        where: {
            id: session?.user?.id,
        },
        data: {
            userName: submission.value.userName as string,
            name: submission.value.fullName,
            availability: {
                createMany: {
                    data: [
                        {
                            day: "Monday",
                            fromTime: "08:00",
                            tillTime: "18:00",
                        },
                        {
                            day: "Tuesday",
                            fromTime: "08:00",
                            tillTime: "18:00",
                        },
                        {
                            day: "Wednesday",
                            fromTime: "08:00",
                            tillTime: "18:00",
                        },
                        {
                            day: "Thursday",
                            fromTime: "08:00",
                            tillTime: "18:00",
                        },
                        {
                            day: "Friday",
                            fromTime: "08:00",
                            tillTime: "18:00",
                        },
                        {
                            day: "Saturday",
                            fromTime: "08:00",
                            tillTime: "18:00",
                        },
                        {
                            day: "Sunday",
                            fromTime: "08:00",
                            tillTime: "18:00",
                        },
                    ],
                }
            }
        }
    });

    console.log(data)
    return redirect('/onboarding/grant-id')
}

export const settingsAction = async (prevState, formData: FormData) => {
    const session = await requireUser();
    const submission = parseWithZod(formData, {
        schema: settingsSchema,
    });
    if (submission.status !== 'success') {
        return submission.reply();
    }
    const user = await prisma.user.update({
        where: {
            id: session.user?.id
        },
        data: {
            name: submission.value.fullName,
            image: submission.value.profileImage,
        }
    });

    console.log(user)
    return redirect("/Dashboard");

}
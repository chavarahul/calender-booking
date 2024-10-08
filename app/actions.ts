"use server";

import { onboardingSchemaValidation } from "@/lib/zodSchema";
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
            name: submission.value.fullName
        }
    });

    console.log(data)
    return redirect('/onboarding/grant-id')
}
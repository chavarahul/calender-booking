"use server";

import { onBoardingSchema } from "@/lib/zodSchema";
import prisma from "./lib/db";
import { requireUser } from "./lib/hooks";
import { parseWithZod } from '@conform-to/zod'
export const onBoardingAction = async (prevState,formData: FormData) => {
    const session = await requireUser();

    const submission = parseWithZod(formData, {
        schema: onBoardingSchema,
    });
 
    if(submission.status !== 'success'){
        return submission.reply();
    }

    const data = await prisma.user.update({
        where: {
            id: session?.user?.id,
        },
        data: {
            userName: submission.value.userName,
            name: submission.value.fullName
        }
    });
    // return data
}
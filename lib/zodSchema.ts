import { z } from 'zod';

export const onBoardingSchema = z.object({
    fullName: z.string().min(3).max(100),
    userName: z.string().min(3).max(100).regex(/^[a-zA-Z0-9-]+$/, {
        message: "Username can only contain letters,numbers and -"
    }),
});



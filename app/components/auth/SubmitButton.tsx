"use client";

import React from 'react';
import { useFormStatus } from 'react-dom';
import { Button } from '../ui';
import Image from 'next/image';
import { Loader2 } from 'lucide-react';

interface SubmitButtonProps {
    logo?: string | undefined | null;
    text: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ logo, text }) => {
    const { pending } = useFormStatus();
    return (
        <>
            {pending ? (
                <Button disabled variant={"outline"} className="w-full">
                    <Loader2 className="size-4 mr-2 animate-spin" /> Please wait
                </Button>
            ) : (
                <Button variant={"outline"} className="w-full">
                    {logo && <Image src={logo} alt={`logo`} className="size-4 mr-2" />}
                    {text}
                </Button>
            )}
        </>
    );
};

export default SubmitButton;

"use client";

import React from 'react';
import { useFormStatus } from 'react-dom';
import { Button } from '../ui';
import Image from 'next/image';
import { signIn } from 'next-auth/react';
import { Loader2 } from 'lucide-react';

interface SubmitButtonProps {
  provider: string;
  logo: string;
  text: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ provider, logo, text }) => {
  const { pending } = useFormStatus();

  const handleSignIn = async () => {
    await signIn(provider);
  };

  return (
    <>
      {pending ? (
        <Button disabled variant={"outline"} className="w-full">
          <Loader2 className="size-4 mr-2 animate-spin" /> Please wait
        </Button>
      ) : (
        <Button variant={"outline"} className="w-full" onClick={handleSignIn}>
          <Image src={logo} alt={`${provider} logo`} className="size-4 mr-2" />
          {text}
        </Button>
      )}
    </>
  );
};

export default SubmitButton;

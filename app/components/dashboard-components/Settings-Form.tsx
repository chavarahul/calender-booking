'use client'
import React, { useState } from 'react'
import { Button, Card, Input, Label } from '../ui'
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import SubmitButton from '../auth/SubmitButton'
import { useFormState } from 'react-dom'
import { settingsAction } from '@/app/actions'
import { useForm } from '@conform-to/react'
import { parseWithZod } from '@conform-to/zod'
import { settingsSchema } from '@/lib/zodSchema'
import { X } from 'lucide-react'
import { UploadDropzone } from '@/app/lib/uploadthing'
import { toast } from 'sonner'

interface UserProps {
    fullName: string;
    email: string;
    profileImage: string
}

const SettingsForm: React.FC<UserProps> = ({
    email,
    fullName,
    profileImage
}: UserProps) => {
    const [lastResult, action] = useFormState(settingsAction, undefined);
    const [form, fields] = useForm({
        onValidate({ formData }) {
            return parseWithZod(formData, { schema: settingsSchema });
        },
        shouldValidate: "onBlur",
        shouldRevalidate: "onInput",
        lastResult
    });
    // console.log(lastResult)
    const [currentProfileImage, setCurrentImageProfile] = useState(profileImage);

    const handleDeleteImage = () => {
        setCurrentImageProfile("");
    }
    return (
        <Card>
            <CardHeader>
                <CardTitle>Settings</CardTitle>
                <CardDescription>Manage your account settings!</CardDescription>
            </CardHeader>
            <form id={form.id} onSubmit={form.onSubmit} action={action} noValidate>
                <CardContent className='flex flex-col gap-y-4'>
                    <div className="flex flex-col gap-y-2">
                        <Label>Full Name</Label>
                        <Input
                            placeholder='Rahul'
                            defaultValue={fullName}
                            name={fields.fullName.name}
                            key={fields.fullName.key}
                        />
                        <p className='text-red-500 text-sm'>{fields.fullName.errors}</p>
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <Label>Email</Label>
                        <Input placeholder='example@gmail.com' defaultValue={email} disabled />
                    </div>
                    <div className="grid gap-y-5">
                        <Label>Profile Image</Label>
                        <input
                            type="hidden"
                            name={fields.profileImage.name}
                            key={fields.profileImage.key}
                            value={currentProfileImage}
                        />
                        {
                            currentProfileImage ? (
                                <div className="relative size-16">
                                    <img
                                        src={currentProfileImage}
                                        alt='profile-image'
                                        className='size-16 rounded-lg'
                                    />
                                    <Button
                                        variant={"destructive"}
                                        size={"icon"}
                                        onClick={handleDeleteImage}
                                        type='button'
                                        className='absolute size-7 rounded-full -top-3 -right-3'
                                    >
                                        <X className='size-4' />
                                    </Button>
                                </div>
                            ) : (
                                <UploadDropzone
                                    onClientUploadComplete={(res) => {
                                        setCurrentImageProfile(res[0].url);
                                        toast.success("Profile image has been uploaded")
                                    }}
                                    onUploadError={(error) => {
                                        console.log('error', error);
                                        toast.error(error.message);
                                    }}
                                    endpoint="imageUploader"
                                />
                            )
                        }
                        <p className='text-red-500 text-sm'>{fields.profileImage.errors}</p>
                    </div>
                </CardContent>
                <CardFooter>
                    <SubmitButton text='Save Changes' variant={"default"} />
                </CardFooter>
            </form>
        </Card>
    )
}

export default SettingsForm
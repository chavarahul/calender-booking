'use client';

import { Link2 } from "lucide-react";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { toast } from "sonner";

const CopyLink = ({ meetingUrl }: { meetingUrl: string }) => {

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(meetingUrl);
            toast.success("url has been copied");
        } catch (error) {
            console.log(error);
            toast.error("Could not copy the url");
        }
    }

    return (
        <DropdownMenuItem onSelect={handleCopy}>
            <Link2 className='mr-2 size-4' />
            Copy
        </DropdownMenuItem>
    )
}

export default CopyLink
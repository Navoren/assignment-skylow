import React, { useEffect, useState } from 'react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from './ui/button'
import {
    Menu,
    NotebookPenIcon,
    Upload,
    ThumbsDown,
    ThumbsUp,
    Flag
} from 'lucide-react';
import Image from 'next/image'
import { useSession } from 'next-auth/react';
import { Separator } from "@/components/ui/separator"



export default function NavMenu() {
    const [userImage, setUserImage] = useState<string | null>(null);

const session = useSession();
const user = session?.data?.user;
    useEffect(() => {
        if (user?.image) {
        setUserImage(user.image);
        }
    }, [user?.image]);
return (
    <Sheet>
        <SheetTrigger>
            <Button variant="ghost" className='rounded-lg'><Menu /></Button>
        </SheetTrigger>
<SheetContent>
    <SheetHeader>
                <SheetTitle>
                    <Image src={userImage || ""}
                    width={75} height={100}
                    className='rounded-full '
                        alt={user?.name || "Avatar"} />
                <div className='text-content'>
                <p className=''>{user?.name}</p>
                <p className='text-slate-500 text-sm'>{user?.email}</p>
                    </div>
                    <div className='bttn-content my-3 flex justify-between'>
                        <div className='flex justify-between'>
                        <Button className='rounded-full mx-2' variant="outline"><Upload /></Button>
                        <div className='flex-1 mx-3'>
                            <Button className='rounded-none rounded-l-full' variant="outline"><ThumbsUp/> 3.04 K</Button>
                            <Button className='rounded-none rounded-r-full' variant="outline"><ThumbsDown/></Button>
                            </div>
                            <Button className='rounded-full ' variant="outline"><Flag/></Button>
                        </div>
                    </div>
                </SheetTitle>
    <Separator />
                <SheetDescription className='flex justify-start'>
                    <Button className='rounded-full px-8 py-6' variant="secondary"> <NotebookPenIcon /> New Chat</Button>
                    
    </SheetDescription>
    </SheetHeader>
</SheetContent>
</Sheet>

)
}

'use client'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import NavMenu from './NavMenu'
import { Button } from './ui/button'
import Image from 'next/image'
import DialogBox from './DialogBox'
import { Skeleton } from "@/components/ui/skeleton"

function Navbar() {
    const [userImage, setUserImage] = useState<string | null>(null);
    const { data: session, status } = useSession();
    const user = session?.user;
    const isLoading = status === 'loading';

    useEffect(() => {
        if (user?.image) {
            setUserImage(user.image);
        }
    }, [user?.image]);

    return (
        <div>
            <nav className="flex justify-between font-mono shadow p-3">
                <div className="flex justify-between items-center mx-4">
                    <NavMenu />
                    {isLoading ? (
                        <div className="flex items-center space-x-4">
                            <Skeleton className="h-12 w-12 rounded-full" />
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-[250px]" />
                                <Skeleton className="h-4 w-[200px]" />
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center space-x-4">
                            <Image
                                src={userImage || ""}
                                width={50}
                                height={50}
                                className="rounded-full"
                                alt={user?.name || "Avatar"}
                            />
                            <div>
                                <p className=''>Hello, {user?.name}</p>
                                <p className='text-slate-500 text-sm'>{user?.email}</p>
                            </div>
                        </div>
                    )}
                </div>
                <Button className='mt-2' variant="outline">
                    <DialogBox />
                </Button>
            </nav>
        </div>
    )
}

export default Navbar

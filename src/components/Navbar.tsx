'use client'
import { useSession } from 'next-auth/react'
import React from 'react'
import NavMenu from './NavMenu'
import { Button } from './ui/button'
import Image from 'next/image'
import DialogBox from './DialogBox'
import { useEffect, useState } from 'react';


function Navbar() {
const [userImage, setUserImage] = useState<string | null>(null);

const session = useSession();
const user = session?.data?.user;
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
            <Image src={userImage || ""}
                    width={50} height={50}
                    className='rounded-xl mx-3'
                    alt={user?.name || "Avatar"} />
                <div>
                <p className=''>Hello, {user?.name}</p>
                <p className='text-slate-500 text-sm'>{user?.email}</p>
                </div>
        </div>
                <Button className='mt-2' variant="outline"><DialogBox/> </Button>
    </nav>
    </div>
)
}

export default Navbar
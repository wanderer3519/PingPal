"use client";

import Link from "next/link"
import { usePathname } from "next/navigation";
import React from "react"
import { Logout } from "@mui/icons-material";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

const TopBar = () => {
    const pathName = usePathname();
    const handleLogout = async () => {
        signOut({callbackUrl: '/'});
    }

    const {data: session} = useSession();
    const user = session?.user;


    return (
    <div className="topbar">
        <Link href="/chats">
            <img src="/assets/pingpal.png" alt="logo" className="logo"/>
        </Link>

        <div className="menu">
            <Link href="/chats" className={`${pathName === '/chats'? 'text-red-1': ''} text-heading4-bold`} >Chats</Link>

            <Link href="/contacts" className={`${pathName === '/contacts'? 'text-red-1': ''} text-heading4-bold`}>Contacts</Link>

            <Logout sx={{color: '#737373', cursor: "pointer"}}
            onClick={handleLogout}
            />

            <Link href='/profile'>
                <img src={user?.profileImage || "/assets/person.jpg"} alt="profile" className="profilePhoto"/>
            </Link>
        </div>
    </div>
  )
}

export default TopBar
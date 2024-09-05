/**
 * The top bar component, most important one for the whole application
 */

"use client";

import Link from "next/link"
import { usePathname } from "next/navigation";
import React from "react";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

const TopBar = () => {
    // Facilitate the logout
    const pathName = usePathname();
    const handleLogout = async () => {
        signOut({callbackUrl: '/'});
    }

    // Get the current user session
    const {data: session} = useSession();
    const user = session?.user;


    return (
    <div className="topbar">
        {/* Logo */}
        <Link href="/chats">
            <img src="/assets/pingpal.png" alt="logo" className="logo"/>
        </Link>

        <div className="menu">
            {/* Icons for chat and logout */}
            <Link href="/chats" className={`${pathName === '/chats'? 'text-red-1': ''} text-heading4-bold`} >
                <i className="fa-regular fa-comments btn btn-lg"></i>
            </Link>

            <i className="fa-solid fa-right-from-bracket btn btn-lg" onClick={handleLogout} style={{cursor: "pointer"}} />

            {/* Profile photo of current user */}
            <Link href='/profile'>
                <img src={user?.profileImage || "/assets/person.jpg"} alt="profile" className="profilePhoto"/>
            </Link>
        </div>
    </div>
  )
}

export default TopBar
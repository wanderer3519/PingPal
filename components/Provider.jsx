/**
 * File to provide the session to the app
 */
"use client";
import { SessionProvider } from "next-auth/react"

const Provider = ({ children, session }) => {
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  )
}

export default Provider
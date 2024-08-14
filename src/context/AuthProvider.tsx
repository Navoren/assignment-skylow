'use client'
import { Session } from "next-auth"
import { SessionProvider } from "next-auth/react"
import React from "react"

type AuthProviderProps = {
  children: React.ReactNode,
  session : Session | null
}

export default function AuthProvider({ children, session }: AuthProviderProps) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  )
}
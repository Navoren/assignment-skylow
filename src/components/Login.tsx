'use client'
import { signIn } from 'next-auth/react'
import React from 'react'
import { Button } from "@/components/ui/button"
import { LogIn } from 'lucide-react';

function Login() {
  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-slate-600 to-slate-900 font-mono">
        <div className="w-full max-w-md space-y-8 rounded-lg shadow-md">
          <div className='h-full w-full bg-gray-100 rounded-lg bg-clip-padding p-8 backdrop-filter backdrop-blur-sm bg-opacity-30 border border-gray-400'>
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight lg:text-5xl mb-3 text-white">
            Sign In
          </h1>
            <p className="mb-8 text-white italic">Sign in to continue your Chatting Experience</p>
            <Button onClick={() => signIn('google')}><LogIn /> Sign In with Google</Button>
          </div>
          <div className='text-center text-slate-100 mt-4'>
            <p> ©️ Terms & Conditions</p>
            </div>
          </div>
      </div>
    </div>
      
    </>
  )
}

export default Login
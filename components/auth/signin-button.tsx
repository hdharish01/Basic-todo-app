"use client"
import { signIn } from "next-auth/react"
 
export function SignIn() {
  return <button onClick={() => signIn()} className="bg-gradient-to-br from-emerald-800 to-emerald-500 p-2 mx-2 rounded-lg text-white hover:bg-gradient-to-tl">Sign In</button>
}
"use client"
import { signOut } from "next-auth/react"
 
export function SignOut() {
  return <button onClick={() => signOut()} className="bg-gradient-to-br from-slate-800 to-slate-400 p-2 mx-2 rounded-lg text-white hover:bg-gradient-to-tl cursor-pointer">Sign Out</button>
}
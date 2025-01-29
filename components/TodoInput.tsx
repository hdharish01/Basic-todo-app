"use client"

import { createTodo } from "@/actions/createTodo"
import { signIn } from "next-auth/react"
import { useState } from "react"

export function TodoInput(){
    const [currentTodo, setCurrentTodo] = useState("")
    return (
        <div>
            <div className="mt-5 ml-4">
                <input type="text" placeholder="Enter todo" className="mt-1 w-80 p-2 border rounded-lg" onChange={(e) => setCurrentTodo(e.target.value)}></input>
                <button className="mx-4 p-2 text-white bg-gradient-to-br from-teal-800 to-teal-400 rounded-xl px-6 hover:bg-gradient-to-r cursor-pointer" onClick={async ()=>{
                    const res = await createTodo(currentTodo)
                    if(res === null){
                        signIn()
                    } 
                }}>Add</button>
            </div>
        </div>
    )
}
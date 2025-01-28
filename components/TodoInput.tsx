"use client"

import { useState } from "react"

export function TodoInput(){
    const [currentTodo, setCurrentTodo] = useState("")
    return (
        <div>
            <div className="mt-5 ml-4">
                <input type="text" placeholder="Enter todo" className="mt-1 w-80 p-2 border rounded-lg" onChange={(e) => setCurrentTodo(e.target.value)}></input>
                <button className="mx-4 p-2 bg-radial-[at_50%_75%] from-sky-200 via-teal-400 to-slate-700 to-98% rounded-xl px-6">Add</button>
            </div>
        </div>
    )
}
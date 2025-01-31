"use client"

import { createTodo } from "@/actions/createTodo"
import { signIn } from "next-auth/react"
import { useState } from "react"
import { TodoList } from "@/components/TodoList";
import { useRouter } from "next/navigation";
import { CompletedTodoList } from "@/components/CompletedTodoList";



export default function Home() {
  const [currentTodo, setCurrentTodo] = useState("")
  const router = useRouter()
  return (
    <div className="bg-gradient-to-r from-teal-200 to-slate-300 w-screen h-screen">
      <div>
        <div className="pt-5 ml-4 flex justify-center">
            <input type="text" placeholder="Enter todo" className="mt-1 w-80 p-2 border rounded-lg" onChange={(e) => setCurrentTodo(e.target.value)}></input>
            <button className="mx-4 p-2 text-white bg-gradient-to-br from-teal-800 to-teal-400 rounded-xl px-6 hover:bg-gradient-to-r cursor-pointer" onClick={async ()=>{
                const res = await createTodo(currentTodo)
                if(res === null){
                    signIn()
                }else{
                    setCurrentTodo("")
                    router.refresh()
                }
            }}>Add</button>
        </div>
      </div>
      <TodoList currentTodo={currentTodo}/>
      <CompletedTodoList />
    </div>
  );
}


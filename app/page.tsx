"use client"

import { createTodo } from "@/actions/createTodo"
import { signIn } from "next-auth/react"
import { useState } from "react"
import { TodoList } from "@/components/TodoList";

export default function Home() {
  const [currentTodo, setCurrentTodo] = useState("")
  const [todoToBeAdded, setTodoToBeAdded] = useState("")
  const [loading, setLoading] = useState(false)

  const createTodoButtonHandler = async () => {
    if(!currentTodo.trim() || loading) return;
    setLoading(true)
      try{
        const response = await createTodo(currentTodo);
        if(response === "done"){
          setTodoToBeAdded(currentTodo)
          setCurrentTodo("")
        }else{
          signIn()
        }
      }catch(error){
        console.error("error while creating a todo:",error)
      }finally{
        setLoading(false)
      }
  }

  return (
    <div className="bg-gradient-to-r from-teal-200 to-slate-300 w-screen h-screen">
      <div>
        <div className="pt-5 ml-4 flex justify-center">
            <input type="text" placeholder="Enter todo" className="mt-1 w-80 p-2 border rounded-lg" value={currentTodo} onChange={(e) => setCurrentTodo(e.target.value)} onKeyDown={(e)=>{if (e.key === "Enter"){createTodoButtonHandler()}}}></input>
            <button className="mx-4 p-2 text-white bg-gradient-to-br from-teal-800 to-teal-400 rounded-xl px-6 hover:bg-gradient-to-r cursor-pointer" disabled={loading} onClick={async ()=>{
                createTodoButtonHandler()
            }}>
              {loading ? (<div className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5"></div>) : ("Add")}
            </button>
        </div>
      </div>
      <TodoList todoToBeAdded={todoToBeAdded}/>
    </div>
  );
}


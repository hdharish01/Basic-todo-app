"use client"

import { returnCompletedTodos } from "@/actions/returnCompletedTodos"
import { useEffect, useState } from "react"
import { Todo } from "./TodoList"
import { signIn } from "next-auth/react"


export function CompletedTodoList(){
    const [completedTodos,setCompletedTodos] = useState<Todo[]>([])
    useEffect(()=>{
        async function getCompletedTodos(){
            try{
                const res = await returnCompletedTodos();
                if(res === null){
                    throw new Error("user not authenticated")
                }
                setCompletedTodos(res)
            }catch(error){
                console.log(error)
            }
        }
        getCompletedTodos()
    },[])
    return <div>
        {completedTodos.map((todo) => {
            return <div key={todo.id} className="flex justify-center">
                <div className="my-2 bg-gray-500 text-black line-through rounded-full px-4 p-2 ml-4 max-w-100">{todo.title}</div>
            </div>
        })}
    </div>
}
"use client"

import { returnUserTodos } from "@/actions/returnUserTodos"
import { useEffect, useState } from "react"
import { SkeletonLoader } from "./SkeletonLoader";
import { TickButton } from "./TickButton";
import { taskDone } from "@/actions/taskDone";

export interface Todo {
    id: number;
    title:string;
    completed:boolean;
    userId:string;
}

export function TodoList({ currentTodo }:{ currentTodo:string }){
    const [todos, setTodos] = useState<Todo[]>([])
    const [loading, setLoading] = useState(true)
    const [flag, setFlag] = useState(0)

    useEffect(()=>{
        async function getTodos() {
            try{
                const res = await returnUserTodos()
                setTodos(res)
            }
            catch(error){
                console.error("error in fetching todos",error)
            }
            finally{
                setLoading(false)
            }
        }
        getTodos()
    },[flag, currentTodo])

    if(loading){
        return <div className="space-y-4 mt-10 justify-self-center">
            <SkeletonLoader />
            <SkeletonLoader />
        </div>
    }

    return(
        <div className="mt-10">
            {todos.map((todo)=>{
                return <div key={todo.id} className="flex justify-center">
                    <div className="my-2 border-2 rounded-full px-4 p-2 ml-4 max-w-100 text-slate-800 border-gray-400">{todo.title}</div>
                    <TickButton onClick={async ()=>{
                        //task done action
                        await taskDone(todo.id)
                        setFlag(s => s+1)
                    }}></TickButton>
                </div>
            })}
        </div>
    )
}
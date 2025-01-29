"use client"

import { returnUserTodos } from "@/actions/returnUserTodos"
import { useEffect, useState } from "react"

interface Todo {
    id: number;
    title:string;
    completed:boolean;
    userId:string;
}

export function TodoList(){
    const [todos, setTodos] = useState<Todo[]>([])
    const [loading, setLoading] = useState(true)

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
    },[])

    if(loading){
        return <div className="">
            loading...
        </div>
    }

    return(
        <div>
            {todos.map((todo)=>{
                return <div key={todo.id}>
                    <div>{todo.title}</div>
                </div>
            })}
        </div>
    )
}
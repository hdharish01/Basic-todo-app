"use client"

import { returnCompletedTodos } from "@/actions/returnCompletedTodos"
import { useEffect, useState } from "react"
import { Todo } from "./TodoList"
import { DeleteButton } from "./DeleteButton"
import { deleteTodo } from "@/actions/deleteTodo"


export function CompletedTodoList(){
    const [completedTodos,setCompletedTodos] = useState<Todo[]>([])
    const [open, setOpen] = useState(false)

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

    const deleteButtonHandler = async (todoId:number) => {
        try{
            const response = await deleteTodo(todoId);
            if(response === "done"){setCompletedTodos((prevTodos) => prevTodos.filter(todo => todo.id !== todoId))}
        }catch(error){
            console.error("error while deleting",error)
        }
    }

    return <div>
        <div className="flex justify-center my-2 ml-2">
            {open && <button onClick={()=>{ setOpen( open => !open ) }} className="bg-teal-800 p-2 rounded-lg text-white hover:bg-teal-900 cursor-pointer">Completed todos ⮟</button>}
            {(!open) && <button onClick={()=>{ setOpen( open => !open ) }} className="bg-teal-600 p-2 rounded-lg text-white hover:bg-teal-900 cursor-pointer">Completed todos ⮟</button>}
        </div>
        <div>
            {open && completedTodos.map((todo) => {
                return <div key={todo.id} className="flex justify-center items-center group">
                    <div className="my-2 bg-gray-500 text-black line-through rounded-full px-4 p-2 ml-4 max-w-100">{todo.title}</div>
                    <DeleteButton onClick={()=>{
                        deleteButtonHandler(todo.id)
                    }}></DeleteButton>
                </div>
            })}
        </div>
    </div>
}
"use client"

import { returnCompletedTodos } from "@/actions/returnCompletedTodos"
import { useEffect, useState } from "react"
import { Todo } from "./TodoList"
import { DeleteButton } from "./DeleteButton"
import { deleteTodo } from "@/actions/deleteTodo"
import { motion, AnimatePresence } from "framer-motion";


export function CompletedTodoList({completedTodoId}:{completedTodoId:number}){
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
    },[completedTodoId])




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
            <AnimatePresence>
                {open && completedTodos.map((todo) => {
                    return (
                        <motion.div
                            key={todo.id}
                            className="flex justify-center items-center group"
                            initial={{ opacity: 0, y: -20, scale: 0.8 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{
                                opacity: 0,
                                scale: 0.5,
                                filter: "blur(10px)", // Adds a disappearing effect
                                transition: { duration: 0.5 }
                            }}
                            transition={{
                                duration: 0.5,
                                ease: "easeOut"
                            }}
                        >
                            <div className="flex justify-center items-center group">
                                <div className="my-2 bg-gray-500 text-black line-through rounded-full px-4 p-2 ml-4 max-w-100">{todo.title}</div>
                                <DeleteButton onClick={()=>{
                                    deleteButtonHandler(todo.id)
                                }}></DeleteButton>
                            </div>
                        </motion.div>
                    )
                })}
            </AnimatePresence>
        </div>
    </div>
}
"use client"

import { returnUserTodos } from "@/actions/returnUserTodos"
import { useEffect, useState } from "react"
import { SkeletonLoader } from "./SkeletonLoader";
import { TickButton } from "./TickButton";
import { taskDone } from "@/actions/taskDone";
import { CompletedTodoList } from "./CompletedTodoList";
import { motion, AnimatePresence } from "framer-motion";

export interface Todo {
    id: number;
    title:string;
    completed:boolean;
    userId:string;
}

export function TodoList({ todoToBeAdded }:{ todoToBeAdded:string }){
    const [todos, setTodos] = useState<Todo[]>([])
    const [loading, setLoading] = useState(true)
    const [completedTodoId, setCompletedTodoId] = useState(0)

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
    },[todoToBeAdded])

    

    const tickButtonHandler = async (todoId: number) =>{
        try{
            const response = await taskDone(todoId);
            if(response === "done"){
                setTodos((prevTodos) => prevTodos.filter(todo => todo.id != todoId))
                setCompletedTodoId(todoId)
            }

        }catch(error){
            console.error("error while taskDone function",error)
        }
    }

    if(loading){
        return <div className="space-y-4 mt-10 justify-self-center">
            <SkeletonLoader />
            <SkeletonLoader />
        </div>
    }

    return(
        <div>
            <div className="mt-10">
                <AnimatePresence>
                    {todos.map((todo)=>{
                        return (
                            <motion.div 
                                key={todo.id}
                                className="flex justify-center"
                                initial={{ opacity: 0, y: -20, scale: 0.9 }} // Start slightly above and small
                                animate={{ opacity: 1, y: 0, scale: 1 }} // Fade in, move down, and grow
                                exit={{ opacity: 0, scale: 0.8, y: 20 }} // Fade out, shrink, and move down
                                transition={{ duration: 0.4, ease: "easeOut" }}
                            >
                                <div key={todo.id} className="flex justify-center">
                                    <div className="my-2 border-2 rounded-full px-4 p-2 ml-4 max-w-100 text-slate-800 border-gray-400">{todo.title}</div>
                                    <TickButton onClick={async ()=>{
                                        tickButtonHandler(todo.id)
                                    }}></TickButton>
                                </div>
                            </motion.div>
                        )
                    })}
                </AnimatePresence>
            </div>
            <CompletedTodoList completedTodoId={completedTodoId}></CompletedTodoList>
        </div>
    )
}
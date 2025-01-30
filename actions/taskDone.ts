"use server"

import { auth } from "@/auth"
import { prisma } from "@/prisma"

export async function taskDone(todoId:number){
    try{
        const session = await auth()
        const userId = session?.user?.id
        if(!userId){
            throw new Error("User not authenticated")
        }
        const updateTodo = await prisma.todo.updateMany({
            where: {
                id: todoId,
                userId: userId,
            },
            data: {
                completed: true,
            }
        })
        if(updateTodo.count === 0){
            throw new Error("Todo not found or unauthorized")
        }
        return("done")
    }catch(error){
        console.error("Error in accessing database:",error)
    }
}
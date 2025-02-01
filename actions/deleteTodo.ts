"use server"
import { auth } from "@/auth";
import { prisma } from "@/prisma";

export async function deleteTodo(todoId:number){
    try{
        const session = await auth()
        const userId = session?.user?.id
        
        if(!userId){
            throw new Error("User not authenticated")
        }

        const deletedTodos = await prisma.todo.delete({
            where:{
                id: todoId
            }
        })

        return "done"

    }catch(error){
        console.error("Error while deleting:",error)
    }
}            
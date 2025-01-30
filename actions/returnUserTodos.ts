"use server"

import { auth } from "@/auth"
import { prisma } from "@/prisma"

export async function returnUserTodos(){
    try{
        const session =  await auth()
        const userId = session?.user?.id

        if(!userId){
            throw new Error("user not authenticated")
        }

        const userTodos = await prisma.todo.findMany({
            where:{
                userId: userId,
                completed: false
            }
        })
        return userTodos    
    }catch(error){
        console.error("error fetching todos",error);
        return [];
    }
}
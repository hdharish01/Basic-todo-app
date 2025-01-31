"use server"

import { auth } from "@/auth"
import { prisma } from "@/prisma";
import { signIn } from "next-auth/react";

export async function returnCompletedTodos(){
    try{
        const session = await auth();
        const userId = session?.user?.id;

        if(!userId){
            throw new Error("User not authenticated")
        }

        const completedTodos = await prisma.todo.findMany({
            where:{
                userId: userId,
                completed: true
            }
        })

        if(completedTodos.length === 0){
            return []
        }

        return completedTodos
    }catch(error){
        console.error("error while fetching:",error)
        return null;
    }
}
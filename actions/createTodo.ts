"use server"
import { auth } from "@/auth"
import { prisma } from "@/prisma"


export async function createTodo(title:string) {
    
    //add zod validation here
    
    const session = await auth()

    if(!session?.user){
        return null
    }
    
    if(!session?.user?.id){
        return null
    }

    await prisma.todo.create({
        data:{
            title:title,
            userId:session.user.id
        }
    })

    return "done"
}
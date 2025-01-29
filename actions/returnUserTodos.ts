"use server"

import { auth } from "@/auth"
import { prisma } from "@/prisma"
import { NextResponse } from "next/server"

export async function returnUserTodos(){
    const session =  await auth()
    const userTodos = await prisma.todo.findMany({
        where:{
            userId: session?.user?.id
        }
    })
    return userTodos

}
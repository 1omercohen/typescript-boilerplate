import { getDbClient } from '../config/db'
import { Prisma, PrismaPromise, users } from '@prisma/client'
import { User } from '../types'
export const AddUser = (data: Prisma.usersCreateInput) => {
    const prisma = getDbClient()
    return prisma.users.create({ data })
}

export const getUserByEmail = (email: string) => {
    const prisma = getDbClient()
    return prisma.users.findFirst({ where: { email } })
}

export const getUserById = (id: string) => {
    const prisma = getDbClient()
    return prisma.users.findUnique({
        where: { id },
        select: {
            email: true,
            first_name: true,
            last_name: true,
            id: true,
            created: true,
        },
    })
}

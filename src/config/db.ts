import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const dbConnect = () => {
    return prisma.$connect()
}

export const getDbClient = () => prisma
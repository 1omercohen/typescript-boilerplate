import { getDbClient } from '../config/db'
import { Prisma } from '@prisma/client'

export const addTask = (data: Prisma.tasksCreateInput) => {
    const prisma = getDbClient()
    return prisma.tasks.create({ data })
}

export const addMission = (data: Prisma.missionsUncheckedCreateInput) => {
    const prisma = getDbClient()
    return prisma.missions.create({ data })
}

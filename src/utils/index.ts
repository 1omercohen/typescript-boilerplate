import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
export const createHashPassword = async (password: string) => {
    return await bcrypt.hash(password, 12)
}
export const comparePassword = async (password: string, hash: string) => {
    return await bcrypt.compare(password, hash)
}

export const setToken = (userId: string) => {
    return jwt.sign({ id: userId }, 'SECRET_KEY', {
        expiresIn: '2 days',
    })
}

import jwt from 'jsonwebtoken'


export const verifyToken = async (token = '') => {
    try {
        const decodeToken = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_ACCESS_TOKEN_SECRET)
        return decodeToken
    } catch (error) {
        console.log(error)
        if (error) {
            throw error
        }
    }
}
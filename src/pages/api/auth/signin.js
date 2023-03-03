import { post } from "@/hooks/services/fetch"


export default async function handler(req, res) {
    try {
        const body = req.body

        const response = await post('https://equmedia.pixeliner.com/api/auth/signin', body)
        throw "error"
        // return res.status(401).send({ data: response?.data })
    } catch (err) {
        res.status(401).json({ error: 'failed to load data' })
    }
}
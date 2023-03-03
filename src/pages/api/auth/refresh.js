import { get, post } from "@/hooks/services/fetch"
import axios from "axios"

export default async function handler(req, res) {
    try {
        const body = req.body

        // const response = await get('https://equmedia.pixeliner.com/api/auth/refresh', body)
        // console.log(response, 'lll')
        return res.status(200).send({ ok: "ok" })
    } catch (err) {
        res.status(500).json({ error: 'failed to load data' })
    }
}
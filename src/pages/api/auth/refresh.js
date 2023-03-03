import axios from "axios"
import { HeaderResponseInterceptor } from "../header-interceptor"


export default async function handler(nextRequest, nextResponse) {
    try {

        const requestHeaders = new Headers(nextRequest.headers)

        if (!nextRequest.cookies['Authentication'] && !nextRequest.cookies['Refresh']) {
            return nextResponse.status(401).json({ message: "Unauthorized" })
        }

        const authToken = `Authentication=${nextRequest.cookies['Authentication']};`
        const refreshToken = `Refresh=${nextRequest.cookies['Refresh']}`

        const serverResponse = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/refresh`, { withCredentials: true, headers: { ...requestHeaders, "Cookie": `${authToken} ${refreshToken}` }, "content-type": "application/json" })
        await HeaderResponseInterceptor(nextResponse, serverResponse)
        return nextResponse.status(200).json(serverResponse.data)
    } catch (error) {

        if (error.response?.status) {
            nextResponse.status(error.response.status).json({ error: error })
            return;
        }

        nextResponse.status(500).json({ error: error?.response?.data?.message ?? error?.message })
    }
}
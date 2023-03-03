import { HeaderResponseInterceptor } from "../header-interceptor";
import axiosService from "@/hooks/services/fetch";

export default async function handler(req, nextResponse) {
    try {
        const body = req.body;

        const serverResponse = await axiosService.post(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/signin`, body)
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
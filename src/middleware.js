
import { NextResponse } from 'next/server'
export function middleware(request) {
    const allCookies = request.cookies.getAll()
    // console.log(allCookies)
    // const response = NextResponse.next()
    // response.headers.set('x-hello-from-middleware2', 'hello')
    // const accessToken = response.headers['set-cookie'][0];
    // const refreshToken = response.headers['set-cookie'][1];

    // Cookies.serialize('Authentication', JSON.stringify(`${accessToken}`, {
    //     httpOnly: true,
    //     path: '/'
    // }));

    // Cookies.serialize('Refresh', JSON.stringify(`${refreshToken}`, {
    //     httpOnly: true,
    //     path: '/'
    // }));

    // return response

}


export const config = {
    matcher: ['/api/auth/signin']
}
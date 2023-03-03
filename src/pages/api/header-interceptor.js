

export const HeaderResponseInterceptor = async (nextResponse, serverResponse) => {
    nextResponse.setHeader('set-cookie', serverResponse.headers['set-cookie'])
    return;
}
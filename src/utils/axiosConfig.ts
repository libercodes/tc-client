const getConfig = (token: string) => {
    return {
        headers: {
            'Authorization' : token
        }
    }
}

export default getConfig
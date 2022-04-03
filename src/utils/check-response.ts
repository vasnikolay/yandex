export async function checkResponse<T> (response: Response): Promise<T>{
    if (!response.ok) return Promise.reject('Ответ сети был не ok.');
    const data = await response.json()
    if (data.success) return data
    else return Promise.reject('Ответ сети был не ok.');
}

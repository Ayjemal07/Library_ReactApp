import { useState, useEffect } from 'react'
import { server_calls } from '../api/server'

interface BookData{
    id: string;
    isbn: string;
    author_name: string;
    title: string;
    genre: string;
    user_token: string;
}
export const useGetData = () => {
    const [ BookData, setData ] = useState<BookData[]>([])

    async function handleDataFetch(){
        const result = await server_calls.get();
        setData(result)
    }

    useEffect( () => {
        handleDataFetch();
    }, [])

    return { BookData, getData:handleDataFetch,setData}
}
import { useEffect, useRef, useState } from 'react'

export type RequestProps = {
    url: string,
    method?: string,
    payload?: any,
    shouldFetch?: boolean,
    deload?: boolean
}

export function useRequest(props: RequestProps): {data: any, error: string, loading: boolean} {
    const { url, method = 'GET', deload = true, shouldFetch = true, payload = null } = props
    const fetchNumber = useRef(0)
    const [data, setData] = useState<any>(null)
    const [error, setError] = useState<string>('')
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        if (!shouldFetch) {
            if (deload) setData(null)
            return setLoading(false)
        }
        const cur = fetchNumber.current + 1
        fetchNumber.current = cur
        setError('')
        setLoading(true)
        const options: any = { method }
        if (!/get/i.test(method)) {
            if (payload) {
                options.headers = { 'Content-Type': 'application/json' }
                options.body = JSON.stringify(payload)
            }
        }
        fetch(url, options).then(res => {
            if (!res.ok) {
                throw new Error('Error in request ' + url)
            }
            return res.json()
        }).then(result => {
            if (fetchNumber.current === cur) {
                setData(result)
                setLoading(false)
            }
        }).catch((e: Error) => {
            console.error(e)
            if (fetchNumber.current === cur) {
                setError(e.toString())
                if (deload) {
                    setData(null)
                }
                setLoading(false)
            }
        })
    }, [url, method, shouldFetch, payload])
    return { data, error, loading }
}
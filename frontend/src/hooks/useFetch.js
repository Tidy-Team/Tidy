import { useCallback, useState } from 'react'

export const useFetch = (
  url,
  method = 'GET',
  body = null,
  headers = { 'Content-Type': 'application/json' },
  options = {},
  authToken = null
) => {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const fetchData = useCallback(() => {
    if (!url) {
      console.warn('No URL provided to useFetch')
      return
    }

    const abortController = new AbortController()
    setIsLoading(true)
    setError(null)
    setData(null)

    const fetchOptions = {
      method,
      headers: {
        ...headers,
        ...options.headers,
        ...(authToken && { Authorization: `Bearer ${authToken}` }), // Include authToken in headers
      },
      signal: abortController.signal,
      credentials: 'include', // Ensure credentials are included
      ...options,
    }

    if (method !== 'GET' && method !== 'HEAD' && body) {
      fetchOptions.body = JSON.stringify(body)
    }

    fetch(url, fetchOptions)
      .then(async (response) => {
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}))
          throw new Error(
            JSON.stringify({
              status: response.status,
              statusText: response.statusText,
              data: errorData,
            })
          )
        }
        return response.json()
      })
      .then((json) => {
        setData(json)
        setIsLoading(false)
      })
      .catch((error) => {
        if (error.name === 'AbortError') {
          console.log('Fetch aborted')
        } else {
          setError(error)
          setIsLoading(false)
        }
      })

    return () => {
      abortController.abort()
    }
  }, [url, method, body, headers, options, authToken])

  return { fetchData, data, error, isLoading }
}

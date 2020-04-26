import { useState, useEffect } from 'react'

export function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState(value)

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebouncedValue(value)
        }, delay)
        return (): void => clearTimeout(timeout)
    }, [value, delay])
    return debouncedValue
}

import { useEffect, useState } from "react";

export const useDebounce = (value: string, delay: number) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const timer = setInterval(() => {setDebouncedValue(value)}, delay);

        return () => {clearInterval(timer);}
    },[value, delay]);

    return debouncedValue
}
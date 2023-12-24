//creating hook for checking if user is admin or not
import { useState, useEffect } from "react";
export function useAdmin()
{
    const [data, setData] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(()=> {
        setLoading(true);
        fetch('/api/profile').then(response => {
            response.json().then(data => {
                setData(data);
                setLoading(false);
            })
        })
    },[]);

    return {loading, data}

}
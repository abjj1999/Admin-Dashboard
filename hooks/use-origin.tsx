// "use client";
import { useState, useEffect } from "react";

export const useOrigin = () => {
    const [mounted, setMounted] = useState(false);
    // we are checking if the window object is available since we dont have access to it in the srver only in the client
    const origin = typeof window !== "undefined" &&window.location.origin ? window.location.origin : ""
    useEffect(() => {
        setMounted(true);
    }, [mounted]);

    if(!mounted) return '';

    return origin;
}
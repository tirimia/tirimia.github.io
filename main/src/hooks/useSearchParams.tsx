import { useEffect, useState } from "react";

export function useSearchParams() {
    const [searchParams, setParams] = useState(new URLSearchParams(window.location.search));
    const setSearchParams = (params: URLSearchParams) => {
        history.pushState({}, "", `${window.location.pathname}?${params.toString()}`);
        setParams(params);
    };
    useEffect(() => document.getElementById("azubinomicon")?.scrollBy({ left: 10000 }), [searchParams]);
    return [searchParams, setSearchParams] as const;
}

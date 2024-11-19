import { useEffect, useState } from "react";

export interface Link {
    id: string,
    target: string,
    source: string,
    value: number
}

export interface Node {
    id: string,
    label: string
}

export interface GraphData {
    nodes: Node[], links: Link[]
}
export function useGraph() {
    const [data, setData] = useState<GraphData>({ nodes: [], links: [] });
    useEffect(() => {
        async function getData() {
            const fetchedData = await fetch("/azubinomicon/graph.json");
            setData(JSON.parse(await fetchedData.text()));
        }
        getData();
    }, []);

    return data
}

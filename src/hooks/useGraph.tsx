import { createContext, useEffect, useState } from "react";

interface Link {
    target: string,
    source: string,
    value: number
}

interface Node {
    id: string,
    name: string
}

interface GraphData {
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

export const GraphContext = createContext<GraphData>({ nodes: [], links: [] })

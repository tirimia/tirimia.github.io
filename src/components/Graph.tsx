import ForceGraph2D from 'react-force-graph-2d';
import { PagesContext } from "@hooks/usePages";
import { useContext, useEffect, useState } from "react";
interface Link {
    target: string,
    source: string,
    value: number
}

interface Node {
    id: string,
    name: string
}
export function Graph() {
    const { pages, openPage } = useContext(PagesContext);
    const [data, setData] = useState<{ nodes: Node[], links: Link[] }>({ nodes: [], links: [] });
    useEffect(() => {
        async function getData() {
            const fetchedData = await fetch("/azubinomicon/graph.json");
            setData(JSON.parse(await fetchedData.text()));
        }
        getData();
    }, []);

    function clickNode({ id }: { id: string }) {
        openPage(0)(id);
        window.location.reload();
    }

    return (
        <ForceGraph2D
            graphData={data}
            onNodeClick={clickNode}
            backgroundColor='#aaaaaa'
            linkWidth={5}
            nodeLabel={"name"}
            maxZoom={5}
            minZoom={1}
            width={window.innerWidth * 0.8}
            height={window.innerHeight * 0.8}
            nodeCanvasObject={(node, ctx) => {
                // Draw the node
                ctx.beginPath();
                ctx.arc(node.x!, node.y!, 5, 0, 2 * Math.PI);
                ctx.fillStyle = pages.includes(node.id) ? "red" : "black";
                ctx.fill();

                // Draw the label
                ctx.textAlign = "center";
                ctx.fillStyle = "black"
                ctx.fillText(node.name, node.x!, node.y! + 10);
            }}
            nodeCanvasObjectMode={() => "replace"}
        />
    );
}

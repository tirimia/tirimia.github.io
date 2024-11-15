import ForceGraph2D from 'react-force-graph-2d';
import { PagesContext } from "@hooks/usePages";
import { useContext, useState } from "react";
import { GraphContext } from '@hooks/useGraph';

export function Graph() {
    const { pages, openPage } = useContext(PagesContext);
    const graphData = useContext(GraphContext);
    const [graphOpen, setGraphOpen] = useState(false);

    function clickNode({ id }: { id: string }) {
        openPage(0)(id);
        window.location.reload();
    }
    const accentColor = getComputedStyle(document.documentElement)
        .getPropertyValue('--accent').trim();
    const primaryColor = getComputedStyle(document.documentElement)
        .getPropertyValue('--primary').trim();

    return (
        <div className={`graph-panel ${graphOpen ? "open" : ''}`}>
            <div id="graph">
                <ForceGraph2D
                    graphData={graphData}
                    onNodeClick={clickNode}
                    backgroundColor='var(--surface-alt)'
                    linkWidth={5}
                    linkColor={`${getComputedStyle(document.documentElement).getPropertyValue('--secondary')}33`}
                    nodeLabel={"name"}
                    maxZoom={5}
                    minZoom={1}
                    width={window.innerWidth}
                    height={window.innerHeight}
                    nodeCanvasObject={(node, ctx) => {
                        const isPage = pages.includes(node.id);
                        const nodeRadius = 6;

                        ctx.beginPath();
                        ctx.arc(node.x!, node.y!, nodeRadius, 0, 2 * Math.PI);
                        ctx.fillStyle = isPage ? accentColor : primaryColor;
                        ctx.fill();

                        ctx.font = '12px system-ui, sans-serif';
                        ctx.textAlign = 'center';
                        ctx.fillStyle = 'var(--primary)';
                        ctx.fillText(node.name, node.x!, node.y! + nodeRadius + 8);
                    }}
                    nodeCanvasObjectMode={() => "replace"}
                />
            </div>
            <button
                className={"graph-toggle"}
                onClick={() => setGraphOpen(!graphOpen)}
                aria-label="Toggle graph view"
            >
                {graphOpen ? '▲' : 'Open graph ▼'}
            </button>
        </div >
    );
}

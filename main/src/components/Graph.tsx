import { ForceGraph2D } from "react-force-graph";
import data from "../../graph.json";
import { usePages } from "../hooks/usePages";

export function Graph() {
    const { openPage } = usePages();

    function clickNode({ note }: { note: string }) {
        openPage()(note);
        window.location.reload();
    }

    function linkWidth({ value }: { value: number }) {
        return value * 5;
    }

    return (
        <ForceGraph2D
            graphData={data}
            backgroundColor="#13151a"
            onNodeClick={clickNode}
            width={600}
            height={600}
            linkWidth={linkWidth}
            nodeLabel={(n) => n.note}
            // TODO: get the link colors working
            //  linkColor={(link) => {
            //     const target = (link.target as unknown as Node).note;
            //     const source = (link.source as unknown as Node).note;
            //     if (pages.includes(target) && pages.includes(source)) {
            //     return "red"
            // }
            // return "black" }}
        />
    );
}

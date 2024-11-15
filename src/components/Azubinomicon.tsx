import { PagesContext, usePages } from "../hooks/usePages.tsx";
import { Graph } from "@components/Graph.tsx";
import { Notes } from "@components/Notes.tsx";
import { QuickFind } from "@components/QuickFind.tsx";
import { useMemo } from "react";
import { GraphContext, useGraph } from "@hooks/useGraph.tsx";

export function Azubinomicon() {
    const pageHook = usePages();
    const graphData = useGraph()

    const quickFindData = useMemo(() => graphData.nodes.map(node => ({ key: node.name, value: node.id })), [graphData])

    return (
        <PagesContext.Provider value={pageHook}>
            <GraphContext.Provider value={graphData}>
                <QuickFind title="Notes" items={quickFindData} onPick={(item) => pageHook.openPage(0)(item)} />
                <Notes />
                <Graph />
            </GraphContext.Provider>
        </PagesContext.Provider>
    )
}

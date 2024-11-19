import { PagesContext, usePages } from "../hooks/usePages.tsx";
import { Notes } from "@components/Notes.tsx";
import { QuickFind } from "@components/QuickFind.tsx";
import { useMemo, useState } from "react";
import { useGraph } from "@hooks/useGraph.tsx";
import { GraphCanvas, lightTheme } from 'reagraph';

const graphTheme: typeof lightTheme = {
    ...lightTheme,
    canvas: {
        ...lightTheme.canvas,
        background: "#FFF9F1" // TODO: make this a variable, it's --surface
    },
    node: {
        ...lightTheme.node,
        activeFill: "#3B82F6", // TODO: make this a variable, it's --accent
        fill: "#334155", // TODO: make this a variable, it's --secondary
        label: {
            ...lightTheme.node.label,
            activeColor: "#334155",
            color: "#334155"
        }
    },
};

export function Azubinomicon() {
    const pageHook = usePages();
    const { nodes, links: edges } = useGraph()
    const [graphOpen, setGraphOpen] = useState(false);

    const quickFindData = useMemo(() => nodes.map(node => ({ key: node.label, value: node.id })), [nodes])


    const graph = <div style={{
        display: graphOpen ? 'block' : 'none', position: 'relative', height: "80%", width: "100%",
        borderRadius: '16px',
        boxShadow: 'rgba(15, 23, 42, 0.08) 0px 4px 12px, rgba(15, 23, 42, 0.12) 0px 2px 6px',
    }}>
        <GraphCanvas nodes={nodes} edges={edges}
            onNodeClick={(n) => { pageHook.openPage(0)(n.id); setGraphOpen(false); }}
            theme={graphTheme}
            actives={pageHook.pages}
            layoutType="forceDirected2d"
            maxDistance={10000}
            cameraMode="pan"
        />
    </div>

    return (
        <PagesContext.Provider value={pageHook}>
            <div className="button-container" style={{ display: 'flex', justifyContent: 'center' }}>
                <button className="toggle-button" onClick={(_) => { setGraphOpen(!graphOpen); }}>{graphOpen ? "Note view" : "Graph view"}</button>
            </div>
            <QuickFind title="Notes" items={quickFindData} onPick={(item) => { pageHook.openPage(0)(item); setGraphOpen(false); }} />
            {graph}
            <div className="note-container" style={{ display: graphOpen ? 'none' : 'block' }}>
                <Notes />
            </div>
        </PagesContext.Provider>
    )
}

import { PagesContext, usePages } from "../hooks/usePages.tsx";
import { Graph } from "@components/Graph.tsx";
import { Notes } from "@components/Notes.tsx";
import { useState } from "react";


export function Azubinomicon() {
    const pageHook = usePages();
    const [graphOpen, setGraphOpen] = useState(false);
    // TODO: MAYBE: cmd+k integration 

    return (
        <PagesContext.Provider value={pageHook}>
            <div id="azubinomicon">
                <Notes />
            </div>
            <div className={`graph-panel ${graphOpen ? "open" : ''}`}>
                <div id="graph">
                    <Graph />
                </div>
                <button
                    className={"graph-toggle"}
                    onClick={() => setGraphOpen(!graphOpen)}
                    aria-label="Toggle graph view"
                >
                    {graphOpen ? '▲' : 'Open graph ▼'}
                </button>
            </div>
        </PagesContext.Provider>
    )
}

import { usePages } from "../hooks/usePages.tsx";
import { Note } from "./Note.tsx";

const noteGap = "20px";
export function Azubinomicon() {
    const { pages, openPage } = usePages();

    return (
        <div
            id="azubinomicon"
            style={{
                display: "grid", // Make children align horizontally
                gridAutoFlow: "column",
                gridAutoColumns: `calc((100% - 2 * ${noteGap}) / 3)`,
                scrollBehavior: "smooth",
                scrollSnapType: "x mandatory",
                gap: noteGap, // Space between cards
                padding: "20px", // Some padding around the container
                overflow: "auto", // Enable horizontal scrolling
            }}
        >
            <Note name={"bits"} onClick={openPage(0)} /> {/* use this for the welcome */}
            {pages.map((p, idx) => (
                <Note
                    key={`${idx}-${p}`}
                    name={p}
                    onClick={(url) => {
                        openPage(idx + 1)(url);
                    }}
                />
            ))}
        </div>
    );
}

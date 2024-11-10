import { useContext } from "react";
import { PagesContext } from "@hooks/usePages";
import { Note } from "./Note";

export function Notes() {
    const { pages, openPage } = useContext(PagesContext);

    const notes = pages.map((p, idx) => (
        <Note
            key={`${idx}-${p}`}
            name={p}
            onClick={openPage(idx + 1)}
        />
    ))
    const welcomeNote = <Note name={"welcome"} onClick={openPage(0)} />

    return (
        <>
            {notes.length === 0 ? welcomeNote : notes}
        </>
    );
}

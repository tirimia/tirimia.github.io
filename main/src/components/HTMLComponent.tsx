import { useEffect, useState } from "react";

export function HTMLComponent({ fileKey, onLinkClick }: { fileKey: string; onLinkClick: (ref: string) => void }) {
    const [content, setContent] = useState("");

    useEffect(() => {
        fetch(`/azubinomicon/notes/${fileKey}.html`)
            .then((response) => response.text())
            .then((html) => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, "text/html");
                setContent(doc.body.innerHTML + "<style></style>");
            });
    }, [fileKey]);

    const isAnchorElement = (element: EventTarget): element is HTMLAnchorElement => {
        return element instanceof HTMLAnchorElement;
    };

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (isAnchorElement(e.target)) {
            const page = new URL(e.target.href);
            const notesPath = "/azubinomicon/notes/";
            if (page.pathname.startsWith(notesPath)) {
                e.preventDefault();
                console.log(e.target.href);
                console.log(page.pathname);
                // TODO: figure out the kind of link here, act accordingly
                onLinkClick(page.pathname.replace(".html", "").replace(notesPath, ""));
                return;
            }
        }
    };

    return <div style={{ width: "100%" }} onClick={handleClick} dangerouslySetInnerHTML={{ __html: content }} />;
}

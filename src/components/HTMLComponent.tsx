import { useEffect, useState } from "react";

const notesPath = "/azubinomicon/notes/";
export function HTMLComponent({ fileKey, onLinkClick }: { fileKey: string; onLinkClick: (ref: string) => void }) {
    const [content, setContent] = useState("Loading...");

    useEffect(() => {
        fetch(`${notesPath}${fileKey}`)
            .then((response) => response.text())
            .then((html) => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, "text/html");
                setContent(doc.body.innerHTML);
            });
    }, [fileKey]);

    const isAnchorElement = (element: EventTarget): element is HTMLAnchorElement => {
        return element instanceof HTMLAnchorElement;
    };

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (isAnchorElement(e.target)) {
            const page = new URL(e.target.href);
            if (page.pathname.startsWith(notesPath)) {
                e.preventDefault();
                onLinkClick(page.pathname.replace(".html", "").replace(notesPath, ""));
                return;
            }
        }
    };

    return <div style={{ width: "100%" }} onClick={handleClick} dangerouslySetInnerHTML={{ __html: content }} />;
}

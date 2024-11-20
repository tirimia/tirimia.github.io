import { useEffect, useState } from "react";
import { LoadingSpinner } from "@components/LoadingSpinner";
import { prefetch } from "astro:prefetch";

interface Props {
    name: string;
    onClick: (url: string) => void;
}

const notesPath = "/azubinomicon/notes/";

const isAnchorElement = (element: EventTarget): element is HTMLAnchorElement => {
    return element instanceof HTMLAnchorElement;
};

export function Note({ name, onClick }: Props) {
    const [content, setContent] = useState<string | undefined>(undefined);

    useEffect(() => {
        fetch(`${notesPath}${name}`)
            .then((response) => response.text())
            .then((html) => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, "text/html");
                setContent(doc.body.innerHTML);
            });
    }, [name]);

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (isAnchorElement(e.target)) {
            const page = new URL(e.target.href);
            if (page.pathname.startsWith(notesPath)) {
                e.preventDefault();
                onClick(page.pathname.replace(".html", "").replace(notesPath, ""));
                return;
            }
        }
    };

    const hover = (e: React.MouseEvent<HTMLDivElement>) => {
        if (isAnchorElement(e.target)) {
            const page = new URL(e.target.href);
            if (page.pathname.startsWith(notesPath)) {
                prefetch(e.target.href);
            }
        }
    }

    if (!content) {
        return <LoadingSpinner />
    }

    return <div className="note" onClick={handleClick} onMouseOver={hover} dangerouslySetInnerHTML={{ __html: content }} />;
}

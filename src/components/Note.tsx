import { useEffect, useState } from "react";
import { LoadingSpinner } from "@components/LoadingSpinner";

interface Props {
    name: string;
    onClick: (url: string) => void;
}

const notesPath = "/azubinomicon/notes/";
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

    const isAnchorElement = (element: EventTarget): element is HTMLAnchorElement => {
        return element instanceof HTMLAnchorElement;
    };

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
    if (!content) {
        return <LoadingSpinner />
    }

    return <div className="note" onClick={handleClick} dangerouslySetInnerHTML={{ __html: content }} />;
}

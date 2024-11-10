import { getCollection } from "astro:content";

// TODO: deduplicate this
interface Link {
    target: string,
    source: string,
    value: number
}

interface Node {
    id: string,
    name: string
}

export async function GET({ }) {
    const notes = await getCollection("notes");
    const regex = /\[[^\]]*\](?:\(\.\/|\()([a-zA-Z0-9_-]+)\.md\)/g;
    const links: Link[] = []
    const nodes: Node[] = []
    notes.forEach(note => {
        nodes.push({ id: note.slug, name: note.data.title });
        const matches = [...note.body.matchAll(regex)];
        const slugs = matches.map((match) => match[1]!);
        links.push(
            ...slugs.map((target: string) => ({
                target, source: note.slug, value: 1
            })))
    })
    return new Response(
        JSON.stringify({ nodes, links })
    )
}
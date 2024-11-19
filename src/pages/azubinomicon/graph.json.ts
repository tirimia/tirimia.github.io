import { getCollection } from "astro:content";
import { type Link, type Node } from "@hooks/useGraph";

export async function GET({ }) {
    const notes = await getCollection("notes");
    const regex = /\[[^\]]*\](?:\(\.\/|\()([a-zA-Z0-9_-]+)\.md\)/g;
    const links: Link[] = []
    const nodes: Node[] = []
    notes.forEach(note => {
        nodes.push({ id: note.slug, label: note.data.title });
        const matches = [...note.body.matchAll(regex)];
        const slugs = matches.map((match) => match[1]!);
        links.push(
            ...slugs.map((target: string) => ({
                id: `${note.slug}-${target}`, target, source: note.slug, value: 1
            })))
    })
    return new Response(
        JSON.stringify({ nodes, links })
    )
}

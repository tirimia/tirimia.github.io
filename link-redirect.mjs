import { visit } from 'unist-util-visit'

export const remarkRewriteLinks = (options = {}) => {
    return (tree) => {
        visit(tree, 'link', (node) => {
            if (node.url && node.url.endsWith('.md')) {
                node.url = "azubinomicon/notes/" + node.url.replace(".md", '')
            }
        })
    }
}
interface Page {
    description: string;
    title: string;
}
export const PageIDs = ['azubinomicon', 'blog', 'user_manual'] as const;
export type PageID = typeof PageIDs[number];
export const Pages: Record<PageID, Page> = {
    azubinomicon: { description: "From zero to hero", title: "Azubinomicon" },
    blog: { description: "Living collection of my thoughts", title: "Blog" },
    user_manual: { description: "Instructions on how to deal with me", title: "User Manual" },
}


import { createContext } from "react";
import { useSearchParams } from "./useSearchParams";

export const PagesContext = createContext(
    {pages: [] as string[], openPage: (_idx: number) => (_name :string) => {}}
)

export function usePages() {
    const [searchParams, setSearchParams] = useSearchParams();

    const pages = searchParams.getAll("page");

    const openPage =
        (index = 0) =>
        (pageName: string) => {
            const newSearchParams = new URLSearchParams(searchParams);
            const newPages = pages.slice(0, index).concat([pageName]);

            newSearchParams.delete("page");
            newPages.forEach((page) => newSearchParams.append("page", page));

            setSearchParams(newSearchParams);
        };

    return { pages, openPage };
}

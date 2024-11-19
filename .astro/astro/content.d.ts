declare module 'astro:content' {
	interface Render {
		'.mdx': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
			components: import('astro').MDXInstance<{}>['components'];
		}>;
	}
}

declare module 'astro:content' {
	interface RenderResult {
		Content: import('astro/runtime/server/index.js').AstroComponentFactory;
		headings: import('astro').MarkdownHeading[];
		remarkPluginFrontmatter: Record<string, any>;
	}
	interface Render {
		'.md': Promise<RenderResult>;
	}

	export interface RenderedContent {
		html: string;
		metadata?: {
			imagePaths: Array<string>;
			[key: string]: unknown;
		};
	}
}

declare module 'astro:content' {
	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	/** @deprecated Use `getEntry` instead. */
	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	/** @deprecated Use `getEntry` instead. */
	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E,
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E,
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown,
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E,
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[],
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[],
	): Promise<CollectionEntry<C>[]>;

	export function render<C extends keyof AnyEntryMap>(
		entry: AnyEntryMap[C][string],
	): Promise<RenderResult>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C,
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
				}
			: {
					collection: C;
					id: keyof DataEntryMap[C];
				}
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C,
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"articles": {
"code_is_dialogue.md": {
	id: "code_is_dialogue.md";
  slug: "code_is_dialogue";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"difficult_people_are_canaries.md": {
	id: "difficult_people_are_canaries.md";
  slug: "difficult_people_are_canaries";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"go_is_a_bad_friend.mdx": {
	id: "go_is_a_bad_friend.mdx";
  slug: "go_is_a_bad_friend";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
};
"notes": {
"azubinomicon.mdx": {
	id: "azubinomicon.mdx";
  slug: "azubinomicon";
  body: string;
  collection: "notes";
  data: InferEntrySchema<"notes">
} & { render(): Render[".mdx"] };
"binary.md": {
	id: "binary.md";
  slug: "binary";
  body: string;
  collection: "notes";
  data: InferEntrySchema<"notes">
} & { render(): Render[".md"] };
"bit.md": {
	id: "bit.md";
  slug: "bit";
  body: string;
  collection: "notes";
  data: InferEntrySchema<"notes">
} & { render(): Render[".md"] };
"byte.md": {
	id: "byte.md";
  slug: "byte";
  body: string;
  collection: "notes";
  data: InferEntrySchema<"notes">
} & { render(): Render[".md"] };
"html_encoding.md": {
	id: "html_encoding.md";
  slug: "html_encoding";
  body: string;
  collection: "notes";
  data: InferEntrySchema<"notes">
} & { render(): Render[".md"] };
"number_base.md": {
	id: "number_base.md";
  slug: "number_base";
  body: string;
  collection: "notes";
  data: InferEntrySchema<"notes">
} & { render(): Render[".md"] };
"programming.md": {
	id: "programming.md";
  slug: "programming";
  body: string;
  collection: "notes";
  data: InferEntrySchema<"notes">
} & { render(): Render[".md"] };
"set_theory.md": {
	id: "set_theory.md";
  slug: "set_theory";
  body: string;
  collection: "notes";
  data: InferEntrySchema<"notes">
} & { render(): Render[".md"] };
"uri.md": {
	id: "uri.md";
  slug: "uri";
  body: string;
  collection: "notes";
  data: InferEntrySchema<"notes">
} & { render(): Render[".md"] };
"url.md": {
	id: "url.md";
  slug: "url";
  body: string;
  collection: "notes";
  data: InferEntrySchema<"notes">
} & { render(): Render[".md"] };
"welcome.md": {
	id: "welcome.md";
  slug: "welcome";
  body: string;
  collection: "notes";
  data: InferEntrySchema<"notes">
} & { render(): Render[".md"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = typeof import("../../src/content/config.js");
}

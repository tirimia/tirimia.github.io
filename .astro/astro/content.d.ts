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
  data: any
} & { render(): Render[".md"] };
"difficult_people_are_canaries.md": {
	id: "difficult_people_are_canaries.md";
  slug: "difficult_people_are_canaries";
  body: string;
  collection: "articles";
  data: any
} & { render(): Render[".md"] };
"go_is_a_bad_friend.mdx": {
	id: "go_is_a_bad_friend.mdx";
  slug: "go_is_a_bad_friend";
  body: string;
  collection: "articles";
  data: any
} & { render(): Render[".mdx"] };
};
"notes": {
"12_factor_apps.md": {
	id: "12_factor_apps.md";
  slug: "12_factor_apps";
  body: string;
  collection: "notes";
  data: any
} & { render(): Render[".md"] };
"ascii.md": {
	id: "ascii.md";
  slug: "ascii";
  body: string;
  collection: "notes";
  data: any
} & { render(): Render[".md"] };
"astrojs.md": {
	id: "astrojs.md";
  slug: "astrojs";
  body: string;
  collection: "notes";
  data: any
} & { render(): Render[".md"] };
"azubinomicon.mdx": {
	id: "azubinomicon.mdx";
  slug: "azubinomicon";
  body: string;
  collection: "notes";
  data: any
} & { render(): Render[".mdx"] };
"binary.md": {
	id: "binary.md";
  slug: "binary";
  body: string;
  collection: "notes";
  data: any
} & { render(): Render[".md"] };
"bit.md": {
	id: "bit.md";
  slug: "bit";
  body: string;
  collection: "notes";
  data: any
} & { render(): Render[".md"] };
"browser.md": {
	id: "browser.md";
  slug: "browser";
  body: string;
  collection: "notes";
  data: any
} & { render(): Render[".md"] };
"byte.md": {
	id: "byte.md";
  slug: "byte";
  body: string;
  collection: "notes";
  data: any
} & { render(): Render[".md"] };
"c.md": {
	id: "c.md";
  slug: "c";
  body: string;
  collection: "notes";
  data: any
} & { render(): Render[".md"] };
"chmod.md": {
	id: "chmod.md";
  slug: "chmod";
  body: string;
  collection: "notes";
  data: any
} & { render(): Render[".md"] };
"classes.md": {
	id: "classes.md";
  slug: "classes";
  body: string;
  collection: "notes";
  data: any
} & { render(): Render[".md"] };
"client_side.md": {
	id: "client_side.md";
  slug: "client_side";
  body: string;
  collection: "notes";
  data: any
} & { render(): Render[".md"] };
"constructors.md": {
	id: "constructors.md";
  slug: "constructors";
  body: string;
  collection: "notes";
  data: any
} & { render(): Render[".md"] };
"cryptography.md": {
	id: "cryptography.md";
  slug: "cryptography";
  body: string;
  collection: "notes";
  data: any
} & { render(): Render[".md"] };
"csharp.md": {
	id: "csharp.md";
  slug: "csharp";
  body: string;
  collection: "notes";
  data: any
} & { render(): Render[".md"] };
"debian.md": {
	id: "debian.md";
  slug: "debian";
  body: string;
  collection: "notes";
  data: any
} & { render(): Render[".md"] };
"dependency.md": {
	id: "dependency.md";
  slug: "dependency";
  body: string;
  collection: "notes";
  data: any
} & { render(): Render[".md"] };
"dependency_injection.md": {
	id: "dependency_injection.md";
  slug: "dependency_injection";
  body: string;
  collection: "notes";
  data: any
} & { render(): Render[".md"] };
"design_patterns.md": {
	id: "design_patterns.md";
  slug: "design_patterns";
  body: string;
  collection: "notes";
  data: any
} & { render(): Render[".md"] };
"determinism.md": {
	id: "determinism.md";
  slug: "determinism";
  body: string;
  collection: "notes";
  data: any
} & { render(): Render[".md"] };
"dictionary.md": {
	id: "dictionary.md";
  slug: "dictionary";
  body: string;
  collection: "notes";
  data: any
} & { render(): Render[".md"] };
"distribution.md": {
	id: "distribution.md";
  slug: "distribution";
  body: string;
  collection: "notes";
  data: any
} & { render(): Render[".md"] };
"dotnet.md": {
	id: "dotnet.md";
  slug: "dotnet";
  body: string;
  collection: "notes";
  data: any
} & { render(): Render[".md"] };
"dynamic_programming.md": {
	id: "dynamic_programming.md";
  slug: "dynamic_programming";
  body: string;
  collection: "notes";
  data: any
} & { render(): Render[".md"] };
"emacs.md": {
	id: "emacs.md";
  slug: "emacs";
  body: string;
  collection: "notes";
  data: any
} & { render(): Render[".md"] };
"environment_variables.md": {
	id: "environment_variables.md";
  slug: "environment_variables";
  body: string;
  collection: "notes";
  data: any
} & { render(): Render[".md"] };
"escape_character.md": {
	id: "escape_character.md";
  slug: "escape_character";
  body: string;
  collection: "notes";
  data: any
} & { render(): Render[".md"] };
"file_permissions.md": {
	id: "file_permissions.md";
  slug: "file_permissions";
  body: string;
  collection: "notes";
  data: any
} & { render(): Render[".md"] };
"framework.md": {
	id: "framework.md";
  slug: "framework";
  body: string;
  collection: "notes";
  data: any
} & { render(): Render[".md"] };
"frontend_framework.md": {
	id: "frontend_framework.md";
  slug: "frontend_framework";
  body: string;
  collection: "notes";
  data: any
} & { render(): Render[".md"] };
"functional_programming.md": {
	id: "functional_programming.md";
  slug: "functional_programming";
  body: string;
  collection: "notes";
  data: any
} & { render(): Render[".md"] };
"git.md": {
	id: "git.md";
  slug: "git";
  body: string;
  collection: "notes";
  data: any
} & { render(): Render[".md"] };
"git_forge.md": {
	id: "git_forge.md";
  slug: "git_forge";
  body: string;
  collection: "notes";
  data: any
} & { render(): Render[".md"] };
"github.md": {
	id: "github.md";
  slug: "github";
  body: string;
  collection: "notes";
  data: any
} & { render(): Render[".md"] };
"glob.md": {
	id: "glob.md";
  slug: "glob";
  body: string;
  collection: "notes";
  data: any
} & { render(): Render[".md"] };
"grep.md": {
	id: "grep.md";
  slug: "grep";
  body: string;
  collection: "notes";
  data: any
} & { render(): Render[".md"] };
"hashing.md": {
	id: "hashing.md";
  slug: "hashing";
  body: string;
  collection: "notes";
  data: any
} & { render(): Render[".md"] };
"haskell.md": {
	id: "haskell.md";
  slug: "haskell";
  body: string;
  collection: "notes";
  data: any
} & { render(): Render[".md"] };
"html.md": {
	id: "html.md";
  slug: "html";
  body: string;
  collection: "notes";
  data: any
} & { render(): Render[".md"] };
"html_encoding.md": {
	id: "html_encoding.md";
  slug: "html_encoding";
  body: string;
  collection: "notes";
  data: any
} & { render(): Render[".md"] };
"http.md": {
	id: "http.md";
  slug: "http";
  body: string;
  collection: "notes";
  data: any
} & { render(): Render[".md"] };
"ide.md": {
	id: "ide.md";
  slug: "ide";
  body: string;
  collection: "notes";
  data: any
} & { render(): Render[".md"] };
"intepreted_language.md": {
	id: "intepreted_language.md";
  slug: "intepreted_language";
  body: string;
  collection: "notes";
  data: any
} & { render(): Render[".md"] };
"javascript.md": {
	id: "javascript.md";
  slug: "javascript";
  body: string;
  collection: "notes";
  data: any
} & { render(): Render[".md"] };
"libraries.md": {
	id: "libraries.md";
  slug: "libraries";
  body: string;
  collection: "notes";
  data: any
} & { render(): Render[".md"] };
"licensing.md": {
	id: "licensing.md";
  slug: "licensing";
  body: string;
  collection: "notes";
  data: any
} & { render(): Render[".md"] };
"linux.md": {
	id: "linux.md";
  slug: "linux";
  body: string;
  collection: "notes";
  data: any
} & { render(): Render[".md"] };
"macos.md": {
	id: "macos.md";
  slug: "macos";
  body: string;
  collection: "notes";
  data: any
} & { render(): Render[".md"] };
"markdown.md": {
	id: "markdown.md";
  slug: "markdown";
  body: string;
  collection: "notes";
  data: any
} & { render(): Render[".md"] };
"markup_language.md": {
	id: "markup_language.md";
  slug: "markup_language";
  body: string;
  collection: "notes";
  data: any
} & { render(): Render[".md"] };
"nix.md": {
	id: "nix.md";
  slug: "nix";
  body: string;
  collection: "notes";
  data: any
} & { render(): Render[".md"] };
"nixos.md": {
	id: "nixos.md";
  slug: "nixos";
  body: string;
  collection: "notes";
  data: any
} & { render(): Render[".md"] };
"number_base.md": {
	id: "number_base.md";
  slug: "number_base";
  body: string;
  collection: "notes";
  data: any
} & { render(): Render[".md"] };
"number_base_conversion_trick.md": {
	id: "number_base_conversion_trick.md";
  slug: "number_base_conversion_trick";
  body: string;
  collection: "notes";
  data: any
} & { render(): Render[".md"] };
"open_source.md": {
	id: "open_source.md";
  slug: "open_source";
  body: string;
  collection: "notes";
  data: any
} & { render(): Render[".md"] };
"operating_system.md": {
	id: "operating_system.md";
  slug: "operating_system";
  body: string;
  collection: "notes";
  data: any
} & { render(): Render[".md"] };
"package_manager.md": {
	id: "package_manager.md";
  slug: "package_manager";
  body: string;
  collection: "notes";
  data: any
} & { render(): Render[".md"] };
"programming.md": {
	id: "programming.md";
  slug: "programming";
  body: string;
  collection: "notes";
  data: any
} & { render(): Render[".md"] };
"prototype_based_programming.md": {
	id: "prototype_based_programming.md";
  slug: "prototype_based_programming";
  body: string;
  collection: "notes";
  data: any
} & { render(): Render[".md"] };
"pure_function.md": {
	id: "pure_function.md";
  slug: "pure_function";
  body: string;
  collection: "notes";
  data: any
} & { render(): Render[".md"] };
"python.md": {
	id: "python.md";
  slug: "python";
  body: string;
  collection: "notes";
  data: any
} & { render(): Render[".md"] };
"readline.md": {
	id: "readline.md";
  slug: "readline";
  body: string;
  collection: "notes";
  data: any
} & { render(): Render[".md"] };
"regex.md": {
	id: "regex.md";
  slug: "regex";
  body: string;
  collection: "notes";
  data: any
} & { render(): Render[".md"] };
"repl.md": {
	id: "repl.md";
  slug: "repl";
  body: string;
  collection: "notes";
  data: any
} & { render(): Render[".md"] };
"rfc.md": {
	id: "rfc.md";
  slug: "rfc";
  body: string;
  collection: "notes";
  data: any
} & { render(): Render[".md"] };
"rust.md": {
	id: "rust.md";
  slug: "rust";
  body: string;
  collection: "notes";
  data: any
} & { render(): Render[".md"] };
"salting.md": {
	id: "salting.md";
  slug: "salting";
  body: string;
  collection: "notes";
  data: any
} & { render(): Render[".md"] };
"scripting.md": {
	id: "scripting.md";
  slug: "scripting";
  body: string;
  collection: "notes";
  data: any
} & { render(): Render[".md"] };
"sed.md": {
	id: "sed.md";
  slug: "sed";
  body: string;
  collection: "notes";
  data: any
} & { render(): Render[".md"] };
"semver.md": {
	id: "semver.md";
  slug: "semver";
  body: string;
  collection: "notes";
  data: any
} & { render(): Render[".md"] };
"server_side.md": {
	id: "server_side.md";
  slug: "server_side";
  body: string;
  collection: "notes";
  data: any
} & { render(): Render[".md"] };
"server_side_rendering.md": {
	id: "server_side_rendering.md";
  slug: "server_side_rendering";
  body: string;
  collection: "notes";
  data: any
} & { render(): Render[".md"] };
"set_theory.md": {
	id: "set_theory.md";
  slug: "set_theory";
  body: string;
  collection: "notes";
  data: any
} & { render(): Render[".md"] };
"shebang.md": {
	id: "shebang.md";
  slug: "shebang";
  body: string;
  collection: "notes";
  data: any
} & { render(): Render[".md"] };
"shell.md": {
	id: "shell.md";
  slug: "shell";
  body: string;
  collection: "notes";
  data: any
} & { render(): Render[".md"] };
"shell_script.md": {
	id: "shell_script.md";
  slug: "shell_script";
  body: string;
  collection: "notes";
  data: any
} & { render(): Render[".md"] };
"systems_programming.md": {
	id: "systems_programming.md";
  slug: "systems_programming";
  body: string;
  collection: "notes";
  data: any
} & { render(): Render[".md"] };
"typescript.md": {
	id: "typescript.md";
  slug: "typescript";
  body: string;
  collection: "notes";
  data: any
} & { render(): Render[".md"] };
"unicode.md": {
	id: "unicode.md";
  slug: "unicode";
  body: string;
  collection: "notes";
  data: any
} & { render(): Render[".md"] };
"unix.md": {
	id: "unix.md";
  slug: "unix";
  body: string;
  collection: "notes";
  data: any
} & { render(): Render[".md"] };
"uri.md": {
	id: "uri.md";
  slug: "uri";
  body: string;
  collection: "notes";
  data: any
} & { render(): Render[".md"] };
"url.md": {
	id: "url.md";
  slug: "url";
  body: string;
  collection: "notes";
  data: any
} & { render(): Render[".md"] };
"version_control.md": {
	id: "version_control.md";
  slug: "version_control";
  body: string;
  collection: "notes";
  data: any
} & { render(): Render[".md"] };
"vi.md": {
	id: "vi.md";
  slug: "vi";
  body: string;
  collection: "notes";
  data: any
} & { render(): Render[".md"] };
"vim.md": {
	id: "vim.md";
  slug: "vim";
  body: string;
  collection: "notes";
  data: any
} & { render(): Render[".md"] };
"web_application.md": {
	id: "web_application.md";
  slug: "web_application";
  body: string;
  collection: "notes";
  data: any
} & { render(): Render[".md"] };
"web_development.md": {
	id: "web_development.md";
  slug: "web_development";
  body: string;
  collection: "notes";
  data: any
} & { render(): Render[".md"] };
"welcome.md": {
	id: "welcome.md";
  slug: "welcome";
  body: string;
  collection: "notes";
  data: any
} & { render(): Render[".md"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = never;
}

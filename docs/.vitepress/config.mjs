import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
	title: "F2",
	description: "F2 documentation",
	themeConfig: {
		// https://vitepress.dev/reference/default-theme-config
		nav: [
			{ text: "Home", link: "/" },
			{ text: "Guide", link: "/guide/getting-started" },
		],

		sidebar: [
			{
				text: "Introduction",
				items: [
					{ text: "What is F2?", link: "/guide/what-is-f2" },
					{ text: "Getting Started", link: "/guide/getting-started" },
					{ text: "Tutorial", link: "/guide/tutorial" },
				],
			},
			{
				text: "Variables",
				items: [
					{ text: "How Variables Work", link: "/guide/how-variables-work" },
					{
						text: "Filename & Path Variables",
						link: "/guide/filename-path-variables",
					},
					{ text: "Date Variables", link: "/guide/date-variables" },
					{ text: "Exif Variables", link: "/guide/exif-variables" },
					{ text: "ID3 Variables", link: "/guide/id3-variables" },
					{ text: "ExifTool Variables", link: "/guide/exiftool-variables" },
					{ text: "File Hash Variables", link: "/guide/file-hash-variables" },
					{ text: "String Transformations", link: "/guide/string-transforms" },
				],
			},
			{
				text: "Recipes",
				items: [
					{
						text: "Find Expressions",
						link: "/guide/find-expressions",
					},
					{
						text: "Renaming with Indices",
						link: "/guide/indexing",
					},
					{
						text: "Renaming with CSV Files",
						link: "/guide/csv-renaming",
					},
					{
						text: "Pair Renaming",
						link: "/guide/pair-renaming",
					},
					{
						text: "Sorting",
						link: "/guide/sorting",
					},
				],
			},
			{
				text: "Safety",
				items: [
					{
						text: "Resolving Conflicts",
						link: "/guide/conflict-detection",
					},
					{
						text: "Recovering from Failures",
						link: "/guide/recovering-from-failures",
					},
					{
						text: "Undoing Mistakes",
						link: "/guide/undoing-mistakes",
					},
				],
			},
			{
				text: "Real-World Examples",
				items: [
					{
						text: "Organizing an Image Library",
						link: "/guide/organizing-image-library",
					},
				],
			},
			{
				text: "Reference",
				items: [
					{
						text: "Command-Line Options",
						link: "/reference/cli-options",
					},
					{
						text: "Operating System Differences",
						link: "/reference/os-differences",
					},
					{
						text: "Environmental Variables",
						link: "/reference/env-variables",
					},
					{
						text: "Regular Expressions",
						link: "/reference/regex",
					},
					{
						text: "Changelog",
						link: "/reference/changelog",
					},
				],
			},
		],

		socialLinks: [{ icon: "github", link: "https://github.com/ayoisaiah/f2" }],
		head: [["link", { rel: "icon", href: "/favicon.ico" }]],
	},
	markdown: {
		config(md) {
			const defaultCodeInline = md.renderer.rules.code_inline;
			md.renderer.rules.code_inline = (tokens, idx, options, env, self) => {
				tokens[idx].attrSet("v-pre", "");
				return defaultCodeInline(tokens, idx, options, env, self);
			};
		},
	},
});

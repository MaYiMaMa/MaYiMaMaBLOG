import type { BlogPost } from './categories';
import { getPublishedPosts } from './categories';
import { withBase } from './paths';

export type SearchEntry = {
	id: string;
	url: string;
	title: string;
	description: string;
	category: string;
	tags: string[];
	/** 用于匹配的纯文本（含正文） */
	haystack: string;
	pubDate: string;
};

function stripMarkdown(source: string): string {
	return source
		.replace(/```[\s\S]*?```/g, ' ')
		.replace(/`[^`]*`/g, ' ')
		.replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
		.replace(/\[[^\]]*\]\([^)]*\)/g, ' ')
		.replace(/^#{1,6}\s+/gm, '')
		.replace(/[*_~>|-]+/g, ' ')
		.replace(/\s+/g, ' ')
		.trim();
}

export function buildSearchIndex(posts: BlogPost[]): SearchEntry[] {
	return getPublishedPosts(posts).map((post) => {
		const title = post.data.title;
		const description = post.data.description;
		const category = post.data.category;
		const tags = post.data.tags;
		const body = stripMarkdown(post.body ?? '');

		return {
			id: post.id,
			url: withBase(`blog/${post.id}/`),
			title,
			description,
			category,
			tags,
			haystack: [title, description, category, tags.join(' '), body]
				.join('\n')
				.toLowerCase(),
			pubDate: post.data.pubDate.toISOString(),
		};
	});
}

export function matchSearchEntries(entries: SearchEntry[], query: string): SearchEntry[] {
	const terms = query
		.trim()
		.toLowerCase()
		.split(/\s+/)
		.filter(Boolean);

	if (terms.length === 0) return [];

	return entries.filter((entry) => terms.every((term) => entry.haystack.includes(term)));
}

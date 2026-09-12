import type { CollectionEntry } from 'astro:content';
import { CATEGORY_META, getCategoryOrder } from '../data/categories';

export type BlogPost = CollectionEntry<'blog'>;

/** 分类路径段：保留中文，空格转连字符。 */
export function toCategorySlug(category: string): string {
	return category.trim().replace(/\s+/g, '-');
}

export function fromCategorySlug(slug: string): string {
	try {
		return decodeURIComponent(slug);
	} catch {
		return slug;
	}
}

export function getPublishedPosts(posts: BlogPost[]): BlogPost[] {
	return posts
		.filter((post) => !post.data.draft)
		.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

export type CategorySummary = {
	name: string;
	slug: string;
	count: number;
};

/**
 * 合并「预设分类」与「文章里出现的分类」。
 * 预设里即使 0 篇也会展示，方便一眼看到完整技术目录。
 */
export function buildCategorySummaries(posts: BlogPost[]): CategorySummary[] {
	const counts = new Map<string, number>();

	for (const name of Object.keys(CATEGORY_META)) {
		counts.set(name, 0);
	}

	for (const post of getPublishedPosts(posts)) {
		const name = post.data.category.trim();
		counts.set(name, (counts.get(name) ?? 0) + 1);
	}

	return [...counts.entries()]
		.map(([name, count]) => ({
			name,
			slug: toCategorySlug(name),
			count,
		}))
		.sort((a, b) => {
			const orderDiff = getCategoryOrder(a.name) - getCategoryOrder(b.name);
			if (orderDiff !== 0) return orderDiff;
			return a.name.localeCompare(b.name, 'zh-CN');
		});
}

export function filterPostsByCategory(posts: BlogPost[], categoryName: string): BlogPost[] {
	return getPublishedPosts(posts).filter(
		(post) => toCategorySlug(post.data.category) === toCategorySlug(categoryName),
	);
}

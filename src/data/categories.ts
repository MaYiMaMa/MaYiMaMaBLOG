/**
 * 分类展示名与可选说明。
 * 文章 frontmatter 写 `category: 前端` 即可；
 * 这里补充描述与排序，未登记的分类仍会自动出现。
 */
export const CATEGORY_META: Record<
	string,
	{
		description?: string;
		order?: number;
	}
> = {
	前端: {
		description: '浏览器、框架、样式与交互相关笔记。',
		order: 10,
	},
	后端: {
		description: '服务端、API、数据库与业务逻辑。',
		order: 20,
	},
	工程实践: {
		description: '架构、工具链、协作流程与工程质量。',
		order: 30,
	},
	运维部署: {
		description: '构建、发布、监控与运行环境。',
		order: 40,
	},
	算法: {
		description: '数据结构、算法题解与复杂度分析。',
		order: 50,
	},
	Python: {
		description: 'Python 语言、工具链与数据科学相关笔记。',
		order: 15,
	},
	随笔: {
		description: '非硬核技术记录，仍与开发日常相关。',
		order: 90,
	},
	模板: {
		description: '写作范文与可复制的文章骨架，不计入正式技术笔记。',
		order: 99,
	},
};

export function getCategoryDescription(name: string): string {
	return CATEGORY_META[name]?.description ?? `${name}相关的技术记录。`;
}

export function getCategoryOrder(name: string): number {
	return CATEGORY_META[name]?.order ?? 1000;
}

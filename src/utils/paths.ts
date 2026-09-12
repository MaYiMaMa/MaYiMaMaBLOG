/** Join a site path with Astro `base` (always ends with `/`). */
export function withBase(path = ''): string {
	const base = import.meta.env.BASE_URL;
	const clean = path.replace(/^\/+/, '');
	return clean ? `${base}${clean}` : base;
}

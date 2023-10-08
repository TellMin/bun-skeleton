import type { PageServerLoad } from './$types';

interface Item {
	id: number;
	item: string;
}

export const load = (async (event) => {
	const response = await event.fetch('/api/d1/item', {
		method: 'GET'
	});
	return { items: await response.json<Item[]>() };
}) satisfies PageServerLoad;

import { json } from '@sveltejs/kit';
import { createD1Client } from '$lib/server/d1client';
import { items } from '../../../../schema';

type ItemRequest = {
	item: string;
};

export async function GET({ platform }) {
	const d1Client = createD1Client(platform?.env?.DB);
	const result = await d1Client.select().from(items).all();
	return json(result);
}

export async function POST({ request, platform }) {
	const d1Client = createD1Client(platform?.env?.DB);
	const { item } = await request.json<ItemRequest>();
	await d1Client.insert(items).values({ item }).execute();
	return json({ item, states: 'success' });
}

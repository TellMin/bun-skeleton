import { HOTPEPPER_API_URL } from '$env/static/private';
import { json } from '@sveltejs/kit';

type HotpepperRequest = {
	keyword: string;
};

export async function POST({ request }) {
	const { keyword } = await request.json<HotpepperRequest>();
	const response = await fetch(`${HOTPEPPER_API_URL}&keyword=${keyword}`);
	const jsonString = await response.json();
	return json(jsonString);
}

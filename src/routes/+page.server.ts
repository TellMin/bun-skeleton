import { supabase } from '$lib/supabaseClient';

export async function load() {
	const { data } = await supabase.from('countries').select('name');
	return {
		countries: data ?? []
	};
}

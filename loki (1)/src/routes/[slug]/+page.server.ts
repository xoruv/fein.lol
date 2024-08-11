import { createClient } from '@supabase/auth-helpers-sveltekit';
import { PUBLIC_SUPABASE_URL } from '$env/static/public';
import { SECRET_SERVICE_ROLE_KEY } from '$env/static/private';

export const load = async ({ params }: { params: Record<string, string> }) => {
	const slug = params.slug;

	const supabaseClient = createClient(PUBLIC_SUPABASE_URL, SECRET_SERVICE_ROLE_KEY);

	const { data } = await supabaseClient
		.from('users')
		.select(
			'email, title, description, avatar, background, music, socials, badges, effects, discord_presence, banned'
		)
		.eq('slug', slug);

	if (data && data.length > 0) {
		if (data[0].banned) {
			return {
				status: 403,
				body: 'User is banned'
			};
		}

		const components = {
			title: data[0].title,
			description: data[0].description,
			avatar: data[0].avatar,
			background: data[0].background,
			music: data[0].music,
			socials: data[0].socials,
			badges: data[0].badges,
			effects: data[0].effects,
			discord_presence: data[0].discord_presence,
		};

		return {
			status: 200,
			body: components
		};
	} else {
		return {
			status: 404,
			body: null
		};
	}
};
import type { Actions } from './$types';
import { getServerSession } from '@supabase/auth-helpers-sveltekit';
import { createClient } from '@supabase/auth-helpers-sveltekit';
import { PUBLIC_SUPABASE_URL } from '$env/static/public';
import { SECRET_SERVICE_ROLE_KEY } from '$env/static/private';
import { fail } from '@sveltejs/kit';
import axios from 'axios';

export const load = async (event: any) => {
	const session = await getServerSession(event);
	const email = session?.user?.email;

	const supabaseClient = createClient(PUBLIC_SUPABASE_URL, SECRET_SERVICE_ROLE_KEY);

	const { data } = await supabaseClient
		.from('users')
		.select(
			'slug, title, description, avatar, background, music, discord_presence, socials, effects, created_at, banned'
		)
		.eq('email', email);

	if (data && data.length > 0) {
		if (data[0].banned) {
			return {
				status: 403,
				body: 'User is banned'
			};
		}

		return {
			status: 200,
			body: data[0]
		};
	} else {
		return {
			status: 404,
			body: null
		};
	}
};

export const actions: Actions = {
	edit: async ({ request, locals }) => {
		const body = Object.fromEntries(await request.formData());
		const session = locals.session;
		const email = session?.user?.email;

		const convertSocials = async (data: any) => {
			const socials = [];
			for (const [key, value] of Object.entries(data)) {
				if (key.startsWith('social_') && value !== '') {
					socials.push({ key: key.replace('social_', ''), value });
				}
			}
			return socials;
		};

		const convertEffects = async (data: any) => {
			const effects = [];
			for (const [key, value] of Object.entries(data)) {
				if (key.startsWith('effect_') && value !== '') {
					effects.push(key.replace('effect_', ''));
				}
			}
			return effects;
		};

		const validateImage = (image: string) => {
			const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
			const extension = image.split('.').pop();
			return allowedExtensions.includes(extension as string) || image === '';
		};

		const validateMusic = (music: string) => {
			const allowedExtensions = ['mp3', 'wav', 'ogg'];
			const extension = music.split('.').pop();
			return allowedExtensions.includes(extension as string) || music === '';
		};

		const newSlug = body.slug.toString().toLowerCase();
		const newTitle = body.title;
		const newDescription = body.description;
		const newAvatar = body.avatar;
		const newBackground = body.background;
		const newMusic = body.music;
		const newDiscordPresence = body.presence;
		const newSocials = await convertSocials(body);
		const newEffects = await convertEffects(body);

		if (!validateImage(newAvatar as string) || !validateImage(newBackground as string)) {
			return fail(415, {
				error: 'Unsupported media type for avatar or background'
			});
		}

		if (!validateMusic(newMusic as string)) {
			return fail(415, {
				error: 'Unsupported media type for music'
			});
		}

		const supabaseClient = createClient(PUBLIC_SUPABASE_URL, SECRET_SERVICE_ROLE_KEY);

		const { data } = await supabaseClient
			.from('users')
			.update({
				title: newTitle,
				description: newDescription,
				avatar: newAvatar,
				background: newBackground,
				music: newMusic,
				discord_presence: newDiscordPresence,
				socials: newSocials,
				effects: newEffects
			})
			.eq('email', email);

		const { data: slugData } = await supabaseClient
			.from('users')
			.select('slug, email')
			.eq('slug', newSlug);

		if (slugData && slugData.length === 0) {
			const allowedChars = 'abcdefghijklmnopqrstuvwxyz0123456789';
			if (
				!newSlug
					.toString()
					.split('')
					.some((char: string) => !allowedChars.includes(char))
			) {
				await supabaseClient.from('users').update({ slug: newSlug }).eq('email', email);
			} else {
				return fail(400, {
					error: 'Invalid characters in link'
				});
			}
		} else if (slugData && slugData.length > 0 && slugData[0]?.email !== email) {
			return fail(400, {
				error: 'Link is already taken'
			});
		}

		if (data && data.length > 0) {
			return {
				status: 200,
				body: data[0]
			};
		} else {
			return {
				status: 404,
				body: null
			};
		}
	}
};

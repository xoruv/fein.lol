import { AuthApiError } from '@supabase/supabase-js';
import { createClient } from '@supabase/auth-helpers-sveltekit';
import { PUBLIC_SUPABASE_URL } from '$env/static/public';
import { SECRET_SERVICE_ROLE_KEY, CLOUDFLARE_TURNSTILE_SECRET } from '$env/static/private';
import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';

interface TokenValidateResponse {
	'error-codes': string[];
	success: boolean;
	action: string;
	cdata: string;
}

async function validateToken(token: string, secret: string) {
	const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
		method: 'POST',
		headers: {
			'content-type': 'application/json'
		},
		body: JSON.stringify({
			response: token,
			secret: secret
		})
	});

	const data: TokenValidateResponse = await response.json();

	return {
		success: data.success,
		error: data['error-codes']?.length ? data['error-codes'][0] : null
	};
}

export const actions: Actions = {
	register: async ({ request, locals }) => {
		const body = Object.fromEntries(await request.formData());

		const email = body.email.toString().toLowerCase();
		const password = body.password as string;
		
		const supabaseClient = createClient(PUBLIC_SUPABASE_URL, SECRET_SERVICE_ROLE_KEY);

		const { data, error: err } = await locals.sb.auth.signUp({
			email,
			password
		});
		console.log(data, err);
		
		if (err) {
			if (err instanceof AuthApiError) {
				if (err.status === 422) {
					return fail(400, {
						error: err.message
					});
				} else if (err.status === 429) {
					return fail(429, {
						error: 'Too many requests'
					});
				}
			}

			return fail(500, {
				error: 'Server error. Please try again later.'
			});
		}

		const { data: users } = await supabaseClient
			.from('users')
			.select('email')
			.eq('email', email);

		if (users && users.length === 0) {
			await supabaseClient.from('users').insert([
				{
					email: email
				}
			]);
		}

		await supabaseClient.from('views').insert([
			{
				email: email
			}
		]);

		return { success: true };
	}
};
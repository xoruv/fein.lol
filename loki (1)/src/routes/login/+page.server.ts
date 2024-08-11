import { AuthApiError } from '@supabase/supabase-js';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { CLOUDFLARE_TURNSTILE_SECRET } from '$env/static/private';

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
	login: async ({ request, locals }) => {
		const body = Object.fromEntries(await request.formData());

		const email = body.email.toString().toLowerCase();
		const password = body.password as string;

		const { data, error: err } = await locals.sb.auth.signInWithPassword({
			email: email,
			password: password
		});

		if (err) {
			if (err instanceof AuthApiError && err.status === 400) {
				return fail(400, {
					error: 'Invalid credentials'
				});
			}
			return fail(500, {
				message: 'Server error. Try again later.'
			});
		}

		throw redirect(303, '/dashboard');
	}
};

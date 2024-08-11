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
	forgot: async ({ request, locals }) => {
		const body = Object.fromEntries(await request.formData());

		const email = body.email.toString().toLowerCase();
		const token = body['cf-turnstile-response'] as string;

		const { success } = await validateToken(token, CLOUDFLARE_TURNSTILE_SECRET);

		if (!success) {
			return fail(400, {
				error: `Invalid captcha response`
			});
		}

		const { data, error } = await locals.sb.auth.resetPasswordForEmail(email, {
			redirectTo: 'https://betrayal.lol/recover'
		});

		console.log(data, error);

		return { success: true };
	},

	password: async ({ request, locals }) => {
		const body = Object.fromEntries(await request.formData());

		const newPassword = body.new_password as string;

		const { data, error } = await locals.sb.auth.updateUser({
			password: newPassword
		});

		if (error) {
			return fail(400, {
				error: error.message
			});
		}

		throw redirect(303, '/login');
	}
};

<script lang="ts">
	import { goto } from '$app/navigation';
	import { enhance, type SubmitFunction } from '$app/forms';
	import { supabaseClient } from '$lib/supabase';
	import { getSocial, socialMap } from '$lib/iconmap';
	import axios from 'axios';
	import { onMount } from 'svelte';

	export let data: any;
	export let form: any;

	const presenceData = async (userID: string) => {
		const { data } = await axios.get(`https://presence.wanted.lol/user/${userID}`);
		return data;
	};

	const submitLogout: SubmitFunction = async ({ cancel }) => {
		await supabaseClient.auth.signOut();
		cancel();
		goto('/login');
	};

	const effectsMap = ['snow', 'monochrome_icons'];

	let presence: any = null;

	onMount(async () => {
		presence = await presenceData(data.body.discord_presence);
	});
</script>

<main>
	{#if data.session}
		<!-- if 403 error is returned -->
		{#if data.status === 403}
			<div class="banned">
				<h4 class="banned-message">
					Your account <span class="banned-username">{data.session.user.email}</span> has
					been disabled. due to violation of our Terms of Service. For support or
					assistance, please contact us at out
					<a href="https://discord.gg/2Z8qZ9Z" class="banned-link">support Discord</a>.
				</h4>
			</div>
		{:else}
			{#if form?.error}<p>{form.error}</p>{/if}
			<form id="edit-form" class="edit-form" action="?/edit" method="POST">
				<div class="form-group">
					<label for="title" class="label title">Link</label>
					<input name="slug" id="title" class="input" value={data.body.slug} />
				</div>
				<div class="form-group">
					<label for="title" class="label title">Title</label>
					<input name="title" id="title" class="input" value={data.body.title} />
				</div>
				<div class="form-group">
					<label for="description" class="label title">Description</label>
					<textarea
						name="description"
						id="description"
						class="input"
						value={data.body.description}
					/>
				</div>
				<div class="form-group">
					<div class="column-viewer">
						<div class="left-column">
							<label for="avatar" class="label title">Avatar URL</label>
							<input
								name="avatar"
								id="avatar"
								class="input"
								type="url"
								value={data.body.avatar}
							/>
						</div>
						<div class="right-column">
							<div class="image-preview-wrapper">
								{#if data.body.avatar}
									<img
										src={data.body.avatar}
										class="image-preview"
										alt="avatar"
									/>
								{/if}
							</div>
						</div>
					</div>
				</div>
				<div class="form-group">
					<div class="column-viewer">
						<div class="left-column">
							<label for="background" class="label title">Background URL</label>
							<input
								name="background"
								id="background"
								class="input"
								type="url"
								value={data.body.background}
							/>
						</div>
						<div class="right-column">
							<div class="image-preview-wrapper">
								{#if data.body.background}
									<img
										src={data.body.background}
										class="image-preview"
										alt="background"
									/>
								{/if}
							</div>
						</div>
					</div>
				</div>
				<div class="form-group">
					<div class="column-viewer">
						<div class="left-column">
							<label for="music" class="label title">Music URL</label>
							<input
								name="music"
								id="music"
								class="input"
								type="url"
								value={data.body.music}
							/>
						</div>
						<div class="right-column">
							<div class="image-preview-wrapper">
								<audio src={data.body.music} controls class="music-preview" />
							</div>
						</div>
					</div>
				</div>
				<div class="form-group">
					<div class="column-viewer">
						<div class="left-column">
							<label for="presence" class="label title">Discord Presence</label>
							<input
								name="presence"
								id="presence"
								class="input"
								value={data.body.discord_presence}
							/>
						</div>
						<div class="right-column">
							<div class="image-preview-wrapper">
								{#if presence?.data.discord_user.avatar}
									<img
										src="{presence.data.discord_user
											.avatar}"
										class="image-preview"
										alt="avatar"
									/>
								{:else}
									<img
										src="https://cdn.discordapp.com/embed/avatars/1.png"
										class="image-preview"
										alt="avatar"
									/>
								{/if}
							</div>
						</div>
					</div>
				</div>
				<div class="form-group">
					<label for="socials" class="label title">Socials</label>
					{#each Object.keys(socialMap) as social}
						<div class="social-input-container">
							<!-- svelte-ignore a11y-missing-attribute -->
							<a title={getSocial(social).url.replace('https://', '')}>
								<svelte:component
									this={getSocial(social).icon}
									fill={getSocial(social).color}
									height="24"
									width="24"
									style="filter: drop-shadow(0 0 0.2rem {getSocial(social)
										.color});"
								/>
							</a>
							<div class="input-link-preview">
								<span>{getSocial(social).url.replace('https://', '')}</span>
								<input
									name="social_{social}"
									class="input"
									placeholder={social}
									value={data.body.socials.find((s) => s.key === social)?.value ||
										''}
								/>
							</div>
						</div>
					{/each}
				</div>
				<div class="form-group">
					<label for="effects" class="label title">Effects</label>
					{#each effectsMap as effect}
						<div class="effect-input-container">
							<input
								name="effect_{effect}"
								class="input-checkbox"
								type="checkbox"
								checked={data.body.effects.includes(effect)}
							/>
							<label for="effect_{effect}" class="label"
								>{effect.replace('_', ' ')}</label
							>
						</div>
					{/each}
				</div>
				<div class="btn-wrapper">
					<button type="submit" class="btn-submit">Save Changes</button>
					<form action="/logout" method="POST" use:enhance={submitLogout}>
						<button type="submit" class="btn-submit">Logout</button>
					</form>
				</div>
				<div class="user-data">
					<p>Email: {data.session.user.email}</p>
					<p>UserID: {data.session.user.id}</p>
					<p>Created at: {data.body.created_at}</p>
				</div>
			</form>
		{/if}
	{:else}
		<div class="not-logged-in">
			<p>You're not logged in...</p>
			<a href="/login">Login here</a>
		</div>
	{/if}
</main>

<style lang="scss">
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		min-height: 100vh;

		.edit-form {
			display: flex;
			flex-direction: column;
			align-items: center;
			width: 100%;
			max-width: 700px;
			max-height: 90dvh;
			overflow-y: auto;
			overflow-x: hidden;
			border-radius: 0.5rem;
			padding: 1rem;
			box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.2);

			// scrollbar
			&::-webkit-scrollbar {
				width: 0.5rem;
			}

			&::-webkit-scrollbar-thumb {
				background-color: #ccc;
				border-radius: 1rem;
			}

			&::-webkit-scrollbar-track {
				background-color: #fff;
				border-radius: 1rem;
			}

			.form-group {
				display: flex;
				flex-direction: column;
				width: 100%;
				margin-bottom: 1rem;

				.column-viewer {
					display: flex;
					flex-direction: row;
					width: 100%;
					margin-bottom: 1rem;

					.left-column {
						display: flex;
						flex-direction: column;
						width: 100%;
						margin-bottom: 1rem;
					}

					.right-column {
						display: flex;
						flex-direction: column;
						width: fit-content;
						margin-left: 1rem;

						.image-preview-wrapper {
							display: flex;
							justify-content: center;
							align-items: center;
							width: 100px;
							aspect-ratio: 1/1;
							border-radius: 0.5rem;
							background-color: var(--color-background-soft);
							overflow: hidden;

							.image-preview {
								width: 100%;
								height: 100%;
								object-fit: cover;
							}

							.music-preview {
								width: 100%;
								height: 100%;
								object-fit: cover;
							}
						}
					}
				}

				.label {
					font-size: 1.2rem;
					font-weight: bold;
					margin-bottom: 0.5rem;
				}

				.input {
					background-color: transparent;
					border: none;
					border-bottom: 1px solid var(--color-text);
					color: var(--color-text);
					font-family: var(--font-family);
					font-size: 1rem;
					width: calc(100% - 2rem);
					margin: 0.5rem 1rem;
					padding: 0.5rem;

					transition: all 0.2s ease-in-out;

					&:focus {
						outline: none;
						background-color: var(--color-background-soft);
						filter: invert(1) brightness(0.85);
					}
				}

				.social-input-container {
					display: flex;
					align-items: center;
					margin-bottom: 0.5rem;

					a {
						margin-right: 0.5rem;
						display: inline-flex;
						align-items: center;
						justify-content: center;
						width: 24px;
						height: 24px;
						border-radius: 50%;
					}

					.input-link-preview {
						display: flex;
						flex-direction: column;
						width: 100%;
						margin-left: 0.5rem;

						span {
							font-size: 0.8rem;
							color: #ccc;
						}
					}
				}

				.effect-input-container {
					display: flex;
					flex-direction: row;
					align-items: center;
					width: 100%;
					margin-bottom: 0.5rem;

					.input-checkbox {
						-webkit-appearance: none;
						-moz-appearance: none;
						appearance: none;
						display: inline-block;
						position: relative;
						width: 1.5rem;
						height: 1.5rem;
						margin: 0.125rem 0.5rem;
						border: 1px solid var(--color-text);
						background-color: transparent;
						border-radius: 0.25rem;
						background-color: transparent;
						cursor: pointer;
						transition: all 0.2s ease-in-out;
						&:checked {
							background-color: var(--color-text);
						}
					}
					.label {
						font-weight: 600;
						text-transform: capitalize;
						margin: 0;
					}
				}
			}

			.btn-wrapper {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				width: 100%;
				margin-top: 2rem;

				.btn-submit {
					padding: 7px 70px;
					width: 500px;
					font-family: var(--font-family);
					font-size: 14px;
					font-weight: 700;
					margin-top: 30px;
					border: none;
					border-radius: 36px;
					cursor: pointer;
					transition: 0.2s ease-in-out;
					background-color: var(--color-background-soft);
					color: var(--color-text);
					transition: all 0.3s ease-in-out;
					&:hover {
						filter: invert(1) brightness(0.85);
						transform: scale(1.05);
					}
					&:active {
						transform: scale(0.95);
					}
					&:focus {
						outline: none;
					}
				}
			}
			.user-data {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				width: 100%;
				max-width: 500px;
				max-height: 30vh;
				margin: 3rem;
				user-select: text;
				& > p {
					font-size: 0.8rem;
					font-weight: 300;
					margin: 0;

					& > a {
						text-decoration: none;
						color: inherit;

						&:hover {
							text-decoration: underline;
						}
					}
				}
			}
		}

		.banned {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			width: 100%;
			max-width: 500px;
			max-height: 30vh;

			.banned-message {
				font-size: 1.2rem;
				font-weight: 600;
				margin-bottom: 0.5rem;

				.banned-username {
					font-weight: 400;
				}

				& > a {
					text-decoration: none;
					color: inherit;

					&:hover {
						text-decoration: underline;
					}
				}
			}
		}

		.not-logged-in {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			width: 100%;
			max-width: 500px;
			max-height: 30vh;

			& > p {
				font-size: 1.2rem;
				font-weight: 600;
				margin-bottom: 0.5rem;
			}

			& > a {
				text-decoration: none;
				color: inherit;

				&:hover {
					text-decoration: underline;
				}
			}
		}
	}
</style>

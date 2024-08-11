<script lang="ts">
	import { onMount } from 'svelte';

	import Snow from '$lib/components/effects/Snow.svelte';
	import MoneySnow from '$lib/components/effects/MoneySnow.svelte';
	import Presence from '$lib/components/profile/Presence.svelte';

	import { getSocial, getBadge, getSolid } from '$lib/iconmap';

	export let data: any;

	onMount(() => {
		const entryWrapper = document.querySelector('.entry-wrapper') as HTMLElement;
		const audio = new Audio(data.body.music);
		let playing = false;

		entryWrapper.addEventListener('click', () => {
			if (playing) return;

			audio.volume = 0;
			audio.play();
			playing = true;

			for (let i = 1; i <= 100; i++) {
				setTimeout(() => {
					audio.volume = i / 400;
					entryWrapper.style.opacity = (1 - i / 100).toString();
				}, i * 10);
			}
			setTimeout(() => {
				entryWrapper.style.display = 'none';
			}, 1000);

			audio.addEventListener('ended', () => {
				audio.currentTime = 0;
				audio.play();
			});
		});
	});
</script>

<main>
	{#if data.body}
		{#if data.status === 403}
			<div class="banned">
				<h4 class="banned-message">
					This link has been disabled due to a violation of our Terms of Service. If
					you're the owner, please check your dashboard for more information.
				</h4>
			</div>
		{:else}
			{#if data.body.music}
				<div class="entry-wrapper">
					<button class="entry">Click to enter...</button>
				</div>
			{/if}
			<div class="bg" style="background-image: url({data.body.background});">
				<div class="filter" />
				<div class="effect-wrapper">
					{#if data.body.effects.includes('snow')}
						<Snow />
					{/if}
				</div>
				<div class="card-wrapper">
					<div class="card">
						{#if data.body.avatar}
							<img src={data.body.avatar} alt="avatar" class="avatar" />
						{/if}
						<div class="text-wrapper">
							<div class="badge-wrapper">
								{#each data.body.badges as badge}
									<!-- svelte-ignore a11y-missing-attribute -->
									<a title={getBadge(badge).name}>
										<img src={getBadge(badge).icon} alt="badge" />
									</a>
								{/each}
							</div>
							<h1>{data.body.title}</h1>
							<p>{data.body.description}</p>
						</div>
						<div class="socials">
							{#each data.body.socials as social}
								<a
									href={getSocial(social.key).url + social.value}
									title={social.key}
									target="_blank"
									rel="noopener noreferrer"
								>
									{#if data.body.effects.includes('monochrome_icons')}
										<svelte:component
											this={getSocial(social.key).icon}
											fill="var(--color-text)"
											height="36"
											width="36"
											style="filter: drop-shadow(0 0 0.2rem var(--color-text));"
										/>
									{:else}
										<svelte:component
											this={getSocial(social.key).icon}
											fill={getSocial(social.key).color}
											height="36"
											width="36"
											style="filter: drop-shadow(0 0 0.2rem {getSocial(
												social.key
											).color});"
										/>
									{/if}
								</a>
							{/each}
						</div>
						<div class="presence-wrapper">
							{#if data.body.discord_presence}
								<Presence userId={data.body.discord_presence} />
							{/if}
						</div>
					</div>
				</div>
			</div>
		{/if}
	{:else}
		<div class="user_doesnt_exist">
			<h1>This link isn't in use yet!</h1>
			<p>claim it<a href="/">here!</a></p>
		</div>
	{/if}
</main>

<style lang="scss">
	main {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100dvh;
		width: 100dvw;

		.entry-wrapper {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			backdrop-filter: blur(50px);
			background-color: rgba(0, 0, 0, 0.5);
			z-index: 999;

			.entry {
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				background-color: transparent;
				border: 0;
				color: var(--color-text);
				font-family: var(--font-family);
				font-size: 1.8rem;
				font-weight: 700;
				padding: 1rem 2rem;
				text-transform: uppercase;
			}
		}

		.bg {
			position: absolute;
			height: 100%;
			width: 100%;
			background-size: cover;
			background-position: center;

			.filter {
				position: absolute;
				height: 100%;
				width: 100%;
				background-color: rgba(0, 0, 0, 0.5);
			}

			.effect-wrapper {
				position: absolute;
				height: 100%;
				width: 100%;
			}

			.card-wrapper {
				display: flex;
				justify-content: center;
				align-items: center;
				height: 100%;
				width: 100%;

				.card {
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					height: fit-content;
					width: 800px;
					background: rgba(0, 0, 0, 0.5);
					box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
					backdrop-filter: blur(8.8px);
					-webkit-backdrop-filter: blur(8.8px);
					border-radius: 20px;
					padding: 1rem;
					.avatar {
						object-fit: cover;
						height: 150px;
						width: 150px;
						border-radius: 50%;
						box-shadow: 0 0 10px 0 rgba(0, 0, 0);
					}

					.text-wrapper {
						display: flex;
						flex-direction: column;
						align-items: center;
						text-align: center;

						h1 {
							font-size: 1.5rem;
							margin: 0;
							font-weight: 500;
						}

						p {
							margin: 0;
						}

						.badge-wrapper {
							display: flex;
							justify-content: center;
							align-items: center;
							margin-top: 1rem;
							gap: 0.2rem;
							a {
								transition: all 0.2s ease-in-out;

								&:hover {
									transform: scale(1.1);
								}

								&::before {
									content: attr(title);
									position: absolute;
									bottom: 100%;
									left: 50%;
									transform: translateX(-50%);
									white-space: nowrap;
									background-color: rgba(0, 0, 0, 0.9);
									color: #fff;
									font-size: 12px;
									padding: 4px 8px;
									border-radius: 4px;
									opacity: 0;
									transition: all 200ms ease-in-out;
									visibility: hidden;
								}

								&:hover::before {
									opacity: 1;
									visibility: visible;
								}
							}
							img {
								width: 20px;
							}
						}
					}

					.socials {
						display: flex;
						justify-content: center;
						align-items: center;
						margin-top: 1rem;
						flex-wrap: wrap;

						.monochrome-filter {
							position: absolute;
							top: 0;
							left: 0;
							width: 100%;
							height: 100%;
							filter: grayscale(100%);
							background-color: black;
						}

						a {
							margin: 0 0.5rem;
							color: white;
							font-size: 2rem;
							transition: all 0.2s ease-in-out;

							&:hover {
								transform: scale(1.1);
							}

							&::before {
								content: attr(title);
								position: absolute;
								bottom: 100%;
								left: 50%;
								transform: translateX(-50%);
								white-space: nowrap;
								background-color: rgba(0, 0, 0, 0.9);
								color: #fff;
								font-size: 12px;
								padding: 4px 8px;
								border-radius: 4px;
								opacity: 0;
								transition: all 200ms ease-in-out;
								visibility: hidden;
							}

							&:hover::before {
								opacity: 1;
								visibility: visible;
							}
						}
					}

					.presence-wrapper {
						display: flex;
						justify-content: center;
						align-items: center;
						margin: 1rem 0;
						flex-wrap: wrap;
					}

					.view-counter-wrapper-anchor {
						position: absolute;
						bottom: 0;
						left: 0;
						padding: 0 1rem 1rem 1rem;
						transition: all 0.2s ease-in-out;

						&::before {
							content: attr(title);
							position: absolute;
							bottom: 100%;
							left: 50%;
							transform: translateX(-50%);
							white-space: nowrap;
							background-color: rgba(0, 0, 0, 0.9);
							color: #fff;
							font-size: 12px;
							padding: 4px 8px;
							border-radius: 4px;
							opacity: 0;
							transition: all 200ms ease-in-out;
							visibility: hidden;
						}

						&:hover::before {
							opacity: 1;
							visibility: visible;
						}

						.view-counter-wrapper {
							display: flex;
							flex-direction: row;
							justify-content: flex-start;
							align-items: flex-end;

							.view-icon {
								height: 1.3rem;
								margin: 0 0.5rem 0 0;
								color: white;
							}

							.view-counter {
								font-size: 0.9rem;
								margin: 0;
								color: white;
							}
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

				& > a {
					text-decoration: none;
					color: inherit;

					&:hover {
						text-decoration: underline;
					}
				}
			}
		}

		.user_doesnt_exist {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			height: 100%;
			width: 100%;

			h1 {
				font-size: 3rem;
				margin: 0;
			}

			p {
				font-size: 1.5rem;
				margin: 0;
			}

			a {
				text-decoration: none;
				color: inherit;
				margin: 0.5rem;
				transition: all 0.15s ease-in-out;

				&:hover {
					text-decoration: underline;
					text-shadow: 0 0 0.5rem #fff;
				}
			}
		}
	}
</style>

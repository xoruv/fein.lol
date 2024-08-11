<script lang="ts">
	import dashboardImage from '$lib/media/promotional/dashboard_image.png';
	import slugImage from '$lib/media/promotional/slug_image.png';

	import { onMount } from 'svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const scrollPage = () => {
		window.scrollBy({
			top: window.innerHeight,
			left: 0,
			behavior: 'smooth'
		});
	};
</script>

<main>
	<div class="header-wrapper">
		<div class="left-column" />
		<div class="right-column">
			<a href="https://discord.gg/HPkVBpAYMw" class="btn-discord">Discord</a>
			{#if data.session}
				<a href="/dashboard" class="btn-secondary">Dashboard</a>
			{:else}
				<a href="/login" class="btn-secondary">Login</a>
			{/if}
		</div>
	</div>
	<div class="hero-wrapper">
		<h1 class="hero-title animate-enter" style="--stagger: 1">betrayal.lol</h1>
		<h2 class="hero-subtitle animate-enter" style="--stagger: 4">
			A streamlined biolink experience
		</h2>
		<a href="/register" class="btn-primary animate-enter" style="--stagger: 5">Get Started</a>
	</div>

	<div class="features-wrapper">
		<div class="feature-wrapper">
			<div class="feature-textarea">
				<h3 class="feature-title">Customizable 🎨</h3>
				<p class="feature-description">
					Customize your biolink to your liking with effects and images to create a
					beautiful and sleek design.
				</p>
			</div>
			<div class="feature-image">
				<img src={slugImage} alt="" />
			</div>
		</div>
		<div class="feature-wrapper">
			<div class="feature-image">
				<img src={dashboardImage} alt="" />
			</div>
			<div class="feature-textarea">
				<h3 class="feature-title">Free 💰</h3>
				<p class="feature-description">
					Features that competing services charge extra for are free here. No extra charge
					to make your page stand out from the crowd.
				</p>
			</div>
		</div>
	</div>
</main>

<style lang="scss">
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		min-height: 100dvh;
		text-align: center;

		.header-wrapper {
			display: grid;
			grid-template-columns: 1fr 1fr;
			grid-template-rows: 1fr;
			grid-template-areas: 'left right';
			width: 100%;
			max-width: 1000px;
			padding: 0 1rem;
			margin: 0 auto;
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			z-index: 1;

			.left-column {
				grid-area: left;
			}

			.right-column {
				grid-area: right;
				display: flex;
				flex-direction: row;
				align-items: flex-end;
				justify-content: right;
				text-align: right;
				margin: 1rem 0;

				.btn-secondary {
					appearance: none;
					background-color: transparent;
					border: 1px solid var(--color-background-soft);
					border-radius: 6px;
					color: var(--color-heading);
					display: inline-block;
					font-family: inherit;
					font-size: 18px;
					font-weight: 600;
					line-height: 32px;
					padding: 8px 35px;
					margin: 0 0 0 1rem;
					min-width: 100px;
					text-align: center;
					text-decoration: none;
					transition: all 0.2s ease-in-out;
					&:hover {
						background-color: var(--color-background-mute);
						border-color: var(--color-background-mute);
						color: var(--color-heading);
					}
				}

				.btn-discord {
					appearance: none;
					background-color: #7289da;
					border: 1px solid #7289da;
					border-radius: 6px;
					color: #fff;
					display: inline-block;
					font-family: inherit;
					font-size: 18px;
					font-weight: 600;
					line-height: 32px;
					padding: 8px 35px;
					margin: 0 0 0 1rem;
					min-width: 100px;
					text-align: center;
					text-decoration: none;
					transition: all 0.2s ease-in-out;
					&:hover {
						background-color: #5f73bc;
						border-color: #5f73bc;
						color: #fff;
					}
				}
			}
		}

		.hero-wrapper {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			text-align: center;
			margin: 0 auto;
			height: 90vh;
			width: 100%;
			max-width: 1000px;
			padding: 0 1rem;

			@media screen and (max-width: 600px) {
				height: 100dvh;
			}

			.hero-title {
				font-size: 3rem;
				font-weight: 700;
				margin: 0;
				color: #fff;
			}

			.hero-subtitle {
				font-size: 1.5rem;
				font-weight: 400;
				margin: 0;
				color: #fff;
			}

			.btn-primary {
				appearance: none;
				background-color: var(--color-background-soft);
				border: 1px solid var(--color-background-soft);
				border-radius: 6px;
				color: var(--color-heading);
				display: inline-block;
				font-family: inherit;
				font-size: 18px;
				font-weight: 600;
				line-height: 32px;
				padding: 8px 35px;
				margin: 1rem 0 0 0;
				min-width: 200px;
				text-align: center;
				text-decoration: none;
				transition: all 0.2s ease-in-out;
				&:hover {
					background-color: var(--color-background-mute);
					border-color: var(--color-background-mute);
					color: var(--color-heading);
				}
			}

			.page-scroll {
				position: absolute;
				bottom: 5rem;
				left: 0;
				right: 0;
				margin: 0 auto;
				width: 50px;
				height: 50px;
				background-color: var(--color-background-soft);
				color: var(--color-heading);
				border: none;
				border-radius: 1rem;
				display: flex;
				align-items: center;
				justify-content: center;
				cursor: pointer;
				transition: all 0.2s ease-in-out;
				animation: click-me 2s ease-in-out infinite;

				&:hover {
					background-color: var(--color-background-mute);
					color: var(--color-heading);
				}
			}

			@keyframes click-me {
				0% {
					transform: translateY(0) scale(1);
				}
				50% {
					transform: translateY(-10px) scale(1.1);
				}
				100% {
					transform: translateY(0) scale(1);
				}
			}
		}

		.leaderboards-wrapper {
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;
			text-align: center;
			margin: 0 auto;
			height: 100%;
			width: 100%;
			max-width: 1000px;
			padding: 0 1rem;

			@media screen and (max-width: 768px) {
				display: none;
			}
	
			.views-leaderboard {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				text-align: center;
				height: 100%;
				width: 100%;
				max-width: 500px;
				background-color: var(--color-background-soft);
				border-radius: 1rem;
				padding: 1rem 3rem;
				margin: 1rem;
				
				.leaderboard-title-text {
					font-size: 1.5rem;
					font-weight: 700;
					margin: 0;
					color: #fff;
				}

				.leaderboard-table {
					display: flex;
					flex-direction: column;
					align-items: space-between;
					justify-content: space-between;
					width: 100%;
					height: 100%;
					margin: 1rem 0;
					padding: 0;
					overflow: auto;

					.leaderboard-item {
						display: flex;
						flex-direction: row;
						align-items: center;
						justify-content: space-between;
						text-align: center;
						width: 100%;
						height: 100%;
						margin: 0;
						padding: 0;
						overflow: hidden;

						.leaderboard-item-link {
							font-size: 1rem;
							font-weight: 600;
							color: var(--color-heading);
							text-decoration: none;
							transition: all 0.2s ease-in-out;
							&:hover {
								color: var(--color-primary);
								text-decoration: underline;
							}
						}
					}
				}
			}
		}
		.features-wrapper {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			text-align: center;
			margin: 0 auto;
			height: 100%;
			width: 100%;
			max-width: 1000px;
			padding: 0 1rem;

			@media screen and (max-width: 768px) {
				display: none;
			}

			.feature-wrapper {
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: center;
				text-align: center;
				margin: 5rem auto;
				overflow: hidden;
				height: 40vh;
				width: 100%;
				max-width: 1000px;
				padding: 0 1rem;

				.feature-textarea {
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					text-align: center;
					margin: 0 auto;
					height: 100%;
					width: 100%;
					max-width: 1000px;
					padding: 0 1rem;

					.feature-title {
						font-size: 2rem;
						font-weight: 700;
						margin: 0;
						color: #fff;
					}

					.feature-description {
						font-size: 1rem;
						font-weight: 400;
						margin: 0;
						color: #fff;
					}
				}

				.feature-image {
					width: 100%;
					max-width: 1000px;
					padding: 0 1rem;
					background-size: cover;
					background-position: center;
					background-repeat: no-repeat;

					img {
						width: 100%;
						object-fit: cover;
						transform: perspective(1000px) rotate3d(1, 0, 0, 0deg) scale3d(1, 1, 1);
						transition: all 0.25s ease-in-out;

						&:hover {
							transform: perspective(1000px) rotate3d(1, 0, 0, 5deg)
								scale3d(1.05, 1.05, 1.05);
						}
					}
				}
			}
		}
	}
</style>

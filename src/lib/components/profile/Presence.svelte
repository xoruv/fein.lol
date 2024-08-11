<script lang="ts">
	import axios from 'axios';
	import { onMount } from 'svelte';

	export let userId: string;

	const presenceData = async (userID: string) => {
		const { data } = await axios.get(`https://presence.wanted.lol/user/${userID}`);
		return data;
	};

	let presence: any;
	let activity: any;

	onMount(async () => {
		presence = await presenceData(userId);
		activity = presence.data.activities
			.slice(-1)
			.find((activity: any) => activity.type !== 'CUSTOM');
	});
</script>

{#if presence}
	<div class="presence-wrapper">
		<div class="presence">
			<div class="presence__avatar">
				<img
					src="{presence.data.discord_user.avatar}"
					alt="Avatar"
				/>
			</div>
			<div class="presence__info">
				<div class="presence__info__name">
					{presence.data.discord_user.username}#{presence.data.discord_user.discriminator}
				</div>
				<div class="presence__info__status">
					{presence.data.discord_status}
				</div>
			</div>
			<div class="activity-info">
				{#if activity}
					{#if activity.assets.large_image}
						<img
							class="activity-image"
							src="https://cdn.discordapp.com/app-assets/{activity.application_id}/{activity
								.assets.large_image}.png"
							alt="Activity"
						/>
					{/if}
					<div class="activity-text">
						<p class="activity-name">{activity.name}</p>
						<p class="activity-state">{activity.state}</p>
					</div>
				{/if}
			</div>
		</div>
	</div>
{/if}

<style lang="scss">
	.presence-wrapper {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;
		max-height: 70px;
		min-width: 200px;

		.presence {
			display: flex;
			align-items: center;
			width: 100%;
			height: 100%;
			padding: 10px;
			border-radius: 10px;
			box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
			backdrop-filter: blur(50px);
			-webkit-backdrop-filter: blur(50px);

			.presence__avatar {
				width: 50px;
				height: 50px;
				border-radius: 50%;
				overflow: hidden;
				margin-right: 10px;

				img {
					width: 100%;
					height: 100%;
					aspect-ratio: 1/1;
					object-fit: cover;
				}
			}

			.presence__info {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: flex-start;
				margin-right: 1rem;
				height: 100%;

				.presence__info__name {
					font-size: 1.25rem;
					margin: 0;
				}

				.presence__info__status {
					font-size: 1rem;
					margin: 0;
				}
			}

			.activity-info {
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: center;
				height: 100%;
				margin-left: 1rem;

				@media screen and (max-width: 768px) {
					display: none;
				}

				.activity-image {
					width: 50px;
					height: 50px;
					border-radius: 1rem;
					overflow: hidden;
					margin-right: 10px;

					img {
						width: 100%;
						height: 100%;
						aspect-ratio: 1/1;
						object-fit: cover;
					}
				}

				.activity-text {
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: flex-start;
					height: 100%;

					.activity-name {
						font-size: 1.25rem;
						margin: 0;
					}

					.activity-state {
						font-size: 1rem;
						margin: 0;
					}
				}
			}
		}
	}
</style>

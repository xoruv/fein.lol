<div class="snow-container">
	{#each Array(200) as _, i}
		<div class="snow">💸</div>
	{/each}
</div>

<style lang="scss">
	@function random_range($min, $max) {
		$rand: random();
		$random_range: $min + floor($rand * (($max - $min) + 1));
		@return $random_range;
	}

	.snow-container {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		overflow: hidden;
		pointer-events: none;
		filter: blur(1px);
		z-index: 0;

		.snow {
			$total: 200;
			position: absolute;
			width: 100px;
			height: 100px;
			border-radius: 50%;

			@for $i from 1 through $total {
				$random-x: random(1000000) * 0.0001vw;
				$random-offset: random_range(-100000, 100000) * 0.0001vw;
				$random-x-end: $random-x + $random-offset;
				$random-x-end-yoyo: calc($random-x + ($random-offset / 2));
				$random-yoyo-time: calc(random_range(30000, 80000) / 100000);
				$random-yoyo-y: $random-yoyo-time * 100vh;
				$random-scale: random(10000) * 0.0001;
				$fall-duration: random_range(10, 30) * 1s;
				$fall-delay: random(30) * -1s;

				&:nth-child(#{$i}) {
					opacity: random(10000) * 0.0001;
					transform: translate($random-x, -10px) scale($random-scale);
					animation: fall-#{$i} $fall-duration $fall-delay linear infinite;
				}

				@keyframes fall-#{$i} {
					#{percentage($random-yoyo-time)} {
						transform: translate($random-x-end, $random-yoyo-y) scale($random-scale);
					}

					to {
						transform: translate($random-x-end-yoyo, 100vh) scale($random-scale);
					}
				}
			}
		}
	}
</style>

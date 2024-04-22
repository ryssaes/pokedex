<template>
	<div class="panel d-flex" :class="{ open: isOpen }">
		<div class="panel--front bg--red-01 d-flex position-absolute">
			<RightPanelContent />
		</div>
		<div class="panel--back bg--red-01 d-flex position-absolute" @click="isOpen = true">
			<div class="back--triangle" />
		</div>
	</div>
</template>

<script>
import RightPanelContent from './RightPanelContent.vue';

export default {
	name: 'RightPanel',
	components: {
		RightPanelContent,
	},
	data() {
		return {
			isOpen: false,
		};
	},
};
</script>

<style lang="scss" scoped>
$triangle-size: 30px;
$triangle-color: color(yellow);

.panel {
	width: 100%;
	background-color: transparent;
	top: 40px;
	z-index: 1;


	@media (min-width: $viewport-medium) {
		width: calc(50% - 20px);
		top: 0;
	}

	&--front,
	&--back {
		top: 0;
		width: 100%;
		height: 100%;
		padding: 85px 20px 20px;
		clip-path: polygon(270px 41px, 100% 41px, 100% 100%, 0 100%, 0 75px, 200px 75px);
		transition: all 1.5s ease-in-out;
		transform: translateY(calc(-100% - 40px)) rotateX(0deg);
		transform-origin: left bottom;


		@media (min-width: $viewport-medium) {
			transform: translateX(calc(-100% - 40px)) rotateY(0deg);
			transform-origin: right top;
		}
	}

	&.open {

		.panel--front,
		.panel--back {
			transform: rotateX(-180deg) translateY(100%);

			@media (min-width: $viewport-medium) {
				transform: translateX(-100%) rotateY(180deg);
			}
		}
	}

	&--back {
		display: flex;
		justify-content: center;
		backface-visibility: hidden;
		cursor: pointer;

		@media (min-width: $viewport-medium) {
			align-items: center;
			justify-content: flex-start;
		}

		.back--triangle {
			border-top: $triangle-size solid $triangle-color;
			border-right: $triangle-size solid transparent;
			border-left: $triangle-size solid transparent;
			width: 0;
			height: 0;

			@media (min-width: $viewport-medium) {
				border-top: $triangle-size solid transparent;
				border-left: $triangle-size solid $triangle-color;
				border-bottom: $triangle-size solid transparent;
			}
		}
	}
}

@media (max-width: 991px) {
    .search__label[data-v-9c55a7cc] {
        height: 42%;
        padding: 12px 24px 24px;
    }
}

@media (max-width: 767px) {
	.panel--front {
		top: 230px;
		right: 0;
		width: 475px;
		height: 200px;
	}

	.panel--back {
		top: 210px;
		right: 0;
		width: 470px;
		height: 210px;
	}
}

@media (max-width: 575px) {
	.panel--front {
		width: 509px;
	}

	.panel--back {
		width: 509px;
	}
}

@media (max-width: 560px) {
	.panel--front{
        width: 496px;
        top: 257px;
        right: 0;
        height: 258px;
    }


	.panel--back[data-v-3d22cd0f] {
        top: 242px;
        right: 0;
        width: 496px;
        height: 214px;
    }
}

@media (max-width: 550px) {
	.panel--front {
		width: 320px;
        height: 252px;
        top: 254px;
	}

	.panel--back {
		top: 245px;
        right: 0;
        width: 320px;
        height: 243px;
	}
}
</style>
